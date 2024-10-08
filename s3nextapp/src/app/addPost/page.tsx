"use client";
import { useState } from "react";
import { addPost } from "../actions";

export default function AddPost() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");

  async function submitPost() {
    let post = {
      image_url: "Ejemplo1",
      image_caption: caption,
      image_name: "prueba",
      created: new Date().toISOString(),
    };
    setCaption("");

    await addPost(post);
  }

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
          onChange={(e) => setFile(e.target.value)}
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
