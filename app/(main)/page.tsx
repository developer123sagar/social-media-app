import PostEditor from "@/components/post/editor/PostEditor";
import Posts from "@/components/post/Posts";
import prisma from "@/lib/prisma";
import TrendingSidebar from "@/components/TrendingSidebar";
import { postDataInclude } from "@/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
      <TrendingSidebar />
    </main>
  );
}
