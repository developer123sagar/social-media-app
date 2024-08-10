"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import Linkify from "@/components/Linkify";
import PostMoreButton from "@/components/post/PostMoreButton";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "../UserTooltip";
import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/helpers";
import { Media } from "@prisma/client";
import { PostData } from "@/types";
import { useSession } from "@/providers/SessionProvider";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

interface PostProps {
  post: PostData;
}

const Posts = ({ post }: PostProps) => {
  const { user } = useSession();

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>

            <Link
              suppressHydrationWarning
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>

      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex-between gap-5">
        <LikeButton
          postId={post.id}
          initialState={{
            likes: post._count.likes,
            isLikedByUser: post.likes.some((like) => like.userId === user.id),
          }}
        />
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (like) => like.userId === user.id,
            ),
          }}
        />
      </div>
    </article>
  );
};

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  const videoRef = useVisibilityObserver(
    () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    },
    () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
  );

  if (media.type === "IMAGE") {
    return (
      <Link href={`/posts/${media.postId}`}>
        <Image
          src={media.url}
          alt="attachment"
          width={500}
          height={500}
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </Link>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          ref={videoRef}
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

function useVisibilityObserver(onVisible: () => void, onHidden: () => void) {
  const elementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        } else {
          onHidden();
        }
      },
      { threshold: 0.5 },
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onVisible, onHidden]);

  return elementRef;
}

export default Posts;
