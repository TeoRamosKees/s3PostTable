"use client";
import { ChangeEvent, useState } from "react";
import { addPost } from "../actions";

export default function AddPost() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File>();

  async function submitPost() {
    //Necesary to sent data as formdata
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("created", new Date().toISOString());

    setCaption("");
    addPost(formData);
  }

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <div className="grid justify-items-center">
      <form
        className="grid grid-cols-1  p-4 w-fit border border-slate-800 rounded-md m-5 gap-4"
        onSubmit={submitPost}
      >
        <input
          name="image"
          className="cursor-pointer"
          type="file"
          onChange={(e) => fileSelected(e)}
          required
        />
        <input
          className="border border-black rounded-md pt-1 pl-1"
          type="text"
          placeholder="Add caption..."
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <div className="grid justify-items-end">
          <input
            type="submit"
            className="w-fit p-2  rounded-lg bg-black hover:bg-slate-700 text-white cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
