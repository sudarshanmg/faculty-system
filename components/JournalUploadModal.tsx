"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const JournalUploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      authors: "",
      title: "",
      url: "",
      year: null,
      journal: null,
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

      const journalFile = values.journal?.[0];

      if (!user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      if (journalFile) {
        // Upload journal
        const { data: journalData, error: journalError } =
          await supabaseClient.storage
            .from("journals")
            .upload(`journal-${values.title}-${uniqueID}`, journalFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (journalError) {
          setIsLoading(false);
          return toast.error("Failed journal upload");
        }

        // Create record
        const { error: supabaseError } = await supabaseClient
          .from("journals")
          .insert({
            user_id: user.id,
            title: values.title,
            authors: values.authors,
            description: values.description,
            journal_path: journalData.path,
            year: values.year,
            url: values.url,
          });

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
      } else {
        const { error: supabaseError } = await supabaseClient
          .from("journals")
          .insert({
            user_id: user.id,
            title: values.title,
            authors: values.authors,
            description: values.description,
            journal_path: null,
            year: values.year,
            url: values.url,
          });

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
      }

      setIsLoading(false);
      toast.success("Journal added!");

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
      title="Add a journal"
      description="Upload a file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Journal title"
        />
        <Input
          id="authors"
          disabled={isLoading}
          {...register("authors", { required: true })}
          placeholder="Authors"
        />
        <Input
          id="year"
          disabled={isLoading}
          {...register("year", { required: true })}
          placeholder="Year"
        />
        <Input
          id="url"
          disabled={isLoading}
          {...register("url")}
          placeholder="url"
        />
        <Input
          id="description"
          disabled={isLoading}
          {...register("description", { required: true })}
          placeholder="description"
        />
        <div>
          <div className="pb-1">Select a file</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            id="journal"
            {...register("journal")}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default JournalUploadModal;
