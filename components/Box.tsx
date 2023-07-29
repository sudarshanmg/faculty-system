import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getJournalFile } from "@/actions/getJournalFile";
import { deleteJournalFile } from "@/actions/deleteJournalFile";
import { ClipLoader } from "react-spinners";

const Box = (props: any) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean | undefined>(
    false
  );
  const [downloadLoading, setDownloadLoading] = useState<boolean | undefined>(
    false
  );
  return (
    <article className="my-8 p-8 w-4/5 border border-solid rounded-lg border-neutral-600 bg-neutral-800">
      {Object.entries(props)?.map((prop, index) => {
        if (prop[0] !== "journal_path" && prop[0] !== "journal_id") {
          return (
            <div key={index}>
              <h1 className="text-lg font-semibold">
                {(prop[0].charAt(0).toUpperCase() + prop[0].slice(1)) as string}
                {": "}
              </h1>
              <span className="text-xl font-thin py-4">
                {prop[1] as string}
              </span>
            </div>
          );
        }
      })}
      <div className="my-4 flex">
        {props.journal_path && (
          <>
            <Button
              onClick={() =>
                getJournalFile(props.journal_path, setDownloadLoading)
              }
              className="mr-4"
            >
              {downloadLoading ? (
                <>
                  <ClipLoader size={15} color="#000" className="mx-2" />{" "}
                  Downloading...
                </>
              ) : (
                "Download"
              )}
            </Button>
          </>
        )}
        <Button
          onClick={async () => {
            setDeleteLoading(true);
            setDeleteLoading(
              await deleteJournalFile(props.journal_path, props.journal_id)
            );
            window.location.reload();
          }}
          variant={"destructive"}
          disabled={deleteLoading}
        >
          {deleteLoading ? (
            <>
              <ClipLoader size={15} color="#fff" className="mx-2" /> Deleting
            </>
          ) : (
            "Delete journal"
          )}
        </Button>
      </div>
    </article>
  );
};

export default Box;
