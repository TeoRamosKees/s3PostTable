"use client";
import { deletePost } from "../actions";

export function Post(params: any) {
  return (
    <div className="w-full">
      <img
        className="rounded"
        width={"430"}
        height={"768"}
        src={params.image_url}
      />
      <button
        className="bg-red-600 p-2 mt-2 rounded-sm"
        onClick={() => deletePost(params.id_post)}
      >
        Delete
      </button>
    </div>
  );
}
