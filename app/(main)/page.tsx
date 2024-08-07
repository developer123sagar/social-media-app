import ForYouFeed from "@/components/post/ForYouFeed";
import PostEditor from "@/components/post/editor/PostEditor";
import TrendingSidebar from "@/components/TrendingSidebar";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendingSidebar />
    </main>
  );
}
