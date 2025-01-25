import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/Button";

interface Inputs {
  title: string;
  url: string;
  youtube: string;
  twitter: string;
}

const AddContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [type, setType] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [requiredErr, setRequiredErr] = useState<boolean>(false);

  const addTags = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setTags((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (type==="") {
        setRequiredErr(true);
        return;
    }

    console.log(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className=" fixed inset-0 bg-black/30 flex justify-center items-center p-4">
      <div className=" bg-white max-w-96 w-full rounded-sm p-4">
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <div className=" w-full text-black flex gap-5">
            <span
              onClick={() => setType("youtube")}
              className={`${
                type == "youtube" ? "bg-neutral-600 text-white shadow-lg" : ""
              } px-2 cursor-pointer rounded-xs shadow`}
            >
              YouTube
            </span>
            <span
              onClick={() => setType("twitter")}
              className={`${
                type == "twitter" ? "bg-neutral-600 text-white shadow-lg" : ""
              } px-2 cursor-pointer rounded-xs shadow`}
            >
              Twitter
            </span>
          </div>
          {requiredErr && (
            <span className=" text-red-500 text-sm">
              Select one type 
            </span>
          )}
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            className=" w-full text-black placeholder:text-neutral-400 outline-0 border border-neutral-300 px-2 py-1 mt-5"
          />
          {errors.title && (
            <span className=" text-red-500 text-sm">
              This field is required
            </span>
          )}
          <input
            {...register("url", { required: true })}
            type="text"
            placeholder="Add url"
            className=" w-full text-black placeholder:text-neutral-400 outline-0 border border-neutral-300 px-2 py-1 mt-5"
          />
          {errors.url && (
            <span className=" text-red-500 text-sm">
              This field is required
            </span>
          )}
          <input
            onKeyDown={addTags}
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
            type="text"
            placeholder="Add tag"
            className=" w-full text-black placeholder:text-neutral-400 outline-0 border border-neutral-300 px-2 py-1 mt-5"
          />

          {tags.length > 0 && (
            <div className=" w-full rounded-sm flex flex-wrap gap-2 my-3">
              {tags.map((tag) => (
                <span className=" bg-neutral-100/30 text-black px-2 rounded-sm shadow">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className=" w-full text-end mt-5 flex justify-end items-center">
            <Button title="Submit" type="secondary" size="md" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
