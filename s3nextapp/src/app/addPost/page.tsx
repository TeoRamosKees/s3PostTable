export default function AddPost() {
  return (
    <div className="grid justify-items-center">
      <form className="grid grid-cols-1  p-4 w-fit border border-slate-800 rounded-md m-5 gap-4">
        <input className="cursor-pointer" type="file" />
        <input
          className="border border-black rounded-md pt-1 pl-1"
          type="text"
          placeholder="Add caption..."
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
