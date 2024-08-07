"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Posts from "@/components/post/Posts";
import { PostData } from "@/types";

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts/for-you");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }
      return res.json();
    },
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
    <>
      {query.data.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
