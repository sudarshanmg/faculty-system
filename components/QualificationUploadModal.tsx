"use client";

// Hooks
import React, { useState } from "react";
import useQualificationUploadModal from "@/hooks/useQualificationUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import uniqid from "uniqid";
import { toast } from "react-hot-toast";

// UI
import Modal from "./Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const QualificationUploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useQualificationUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      authors: "",
      title: "",
      url: "",
      year: null,
      qualification: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const qualificationFile = values.qualification?.[0];

      if (!user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      if (qualificationFile) {
        // Upload qualification
        const { data: qualificationData, error: qualificationError } =
          await supabaseClient.storage
            .from("qualifications")
            .upload(
              `qualification-${values.title}-${uniqueID}`,
              qualificationFile,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

        if (qualificationError) {
          setIsLoading(false);
          return toast.error("Failed qualification upload");
        }

        // Create record
        const { error: supabaseError } = await supabaseClient
          .from("qualifications")
          .insert({
            user_id: user.id,
            title: values.title,
            description: values.description,
            subject: values.subject,
            qualification_path: qualificationData.path,
            year: values.year,
          });

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
      } else {
        const { error: supabaseError } = await supabaseClient
          .from("qualifications")
          .insert({
            user_id: user.id,
            title: values.title,
            subject: values.subject,
            qualification_path: null,
            year: values.year,
          });

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
      }

      setIsLoading(false);
      toast.success("qualification added!");

      window.location.reload();
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a qualification"
      description="Upload a file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Qualification title"
        />
        <Input
          id="year"
          disabled={isLoading}
          {...register("year", { required: true })}
          placeholder="Year"
        />
        <Input
          id="subject"
          disabled={isLoading}
          {...register("subject", { required: true })}
          placeholder="Subject"
        />
        <div>
          <div className="pb-1">Select a file</div>
          <Input
            placeholder="Add a file"
            disabled={isLoading}
            type="file"
            id="qualification"
            {...register("qualification")}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default QualificationUploadModal;
