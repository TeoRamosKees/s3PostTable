import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-slate-700 w-full flex gap-5 justify-center p-4">
      <Link href={"/"} className="text-white font-normal text-4xl">
        Posts
      </Link>
      <Link
        href={"/addPost"}
        className="bg-black text-white p-2 border rounded-lg hover:bg-slate-800"
      >
        New post
      </Link>
    </nav>
  );
}
