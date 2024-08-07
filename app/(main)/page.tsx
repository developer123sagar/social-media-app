import PostEditor from "@/components/post/editor/PostEditor";

export default function Home() {
  return (
    <div className="h-[200vh] w-full bg-red-50">
      <div className="w-full">
        <PostEditor />
      </div>
    </div>
  );
}
