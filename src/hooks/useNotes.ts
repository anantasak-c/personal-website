import { useEffect, useState } from "react";
import { fallbackNotes } from "@/data/notes";
import { sanityClient, ALL_POSTS_QUERY } from "@/lib/sanity";
import type { NoteItem, SanityPost } from "@/types/blog";

function normalizePost(post: SanityPost): NoteItem {
  return {
    ...post,
    contentType: post.contentType ?? "Article",
    language: post.language ?? "TH",
  };
}

export function useNotes() {
  const hasSanityConfig = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);
  const [notes, setNotes] = useState<NoteItem[]>(fallbackNotes);
  const [loading, setLoading] = useState(hasSanityConfig);

  useEffect(() => {
    if (!hasSanityConfig) return;

    let active = true;
    sanityClient
      .fetch<SanityPost[]>(ALL_POSTS_QUERY)
      .then((posts) => {
        if (!active || !posts?.length) return;
        const remote = posts.map(normalizePost);
        const remoteSlugs = new Set(remote.map((post) => post.slug));
        const merged = [...remote, ...fallbackNotes.filter((post) => !remoteSlugs.has(post.slug))]
          .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
        setNotes(merged);
      })
      .catch(() => setNotes(fallbackNotes))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [hasSanityConfig]);

  return { notes, loading };
}
