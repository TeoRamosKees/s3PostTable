import { getPosts } from "./actions";
import { Post } from "./components/post";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-4 m-2">
        {posts.map((p) => (
          <Post
            key={p.image_name}
            image_url={p.image_url}
            id_post={p.id_post}
          />
        ))}
      </div>
    </div>
  );
}
