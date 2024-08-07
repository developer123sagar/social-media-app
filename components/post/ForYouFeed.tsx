"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import kyInstance from "@/lib/ky";
import Posts from "@/components/post/Posts";
import { PostData } from "@/types";

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: kyInstance.get("/api/posts/for-you").json<PostData[]>,
  });

  if (query.status === "pending") {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (query.status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {query.data.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}
