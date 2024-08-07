import PostEditor from "@/components/post/editor/PostEditor";
import Posts from "@/components/post/Posts";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
