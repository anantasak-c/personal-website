import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Music2,
  Repeat,
  Share2,
} from "lucide-react";

export interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface SyncSocialPostPreviewProps {
  content: string;
  mediaItems: MediaItem[];
  platform: "facebook" | "twitter" | "instagram" | "tiktok" | "line";
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
}

function MediaDisplay({ item, className = "" }: { item: MediaItem; className?: string }) {
  if (item.type === "video") {
    return <video src={item.url} className={`h-full w-full object-cover ${className}`} controls />;
  }

  return <img src={item.url} alt="preview" className={`h-full w-full object-cover ${className}`} />;
}

function MediaGrid({ mediaItems, rounded = false }: { mediaItems: MediaItem[]; rounded?: boolean }) {
  const count = mediaItems.length;
  const radiusClass = rounded ? "overflow-hidden rounded-2xl" : "";

  if (count === 0) return null;

  if (count === 1) {
    return (
      <div className={`h-full w-full ${radiusClass}`}>
        <MediaDisplay item={mediaItems[0]} />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className={`grid h-full w-full grid-cols-2 gap-0.5 ${radiusClass}`}>
        <MediaDisplay item={mediaItems[0]} />
        <MediaDisplay item={mediaItems[1]} />
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className={`grid h-full w-full grid-cols-2 gap-0.5 ${radiusClass}`}>
        <div className="relative row-span-2">
          <MediaDisplay item={mediaItems[0]} className="absolute inset-0 h-full" />
        </div>
        <div className="relative h-full"><MediaDisplay item={mediaItems[1]} className="absolute inset-0" /></div>
        <div className="relative h-full"><MediaDisplay item={mediaItems[2]} className="absolute inset-0" /></div>
      </div>
    );
  }

  return (
    <div className={`grid h-full w-full grid-cols-2 grid-rows-2 gap-0.5 ${radiusClass}`}>
      <div className="relative h-full"><MediaDisplay item={mediaItems[0]} className="absolute inset-0" /></div>
      <div className="relative h-full"><MediaDisplay item={mediaItems[1]} className="absolute inset-0" /></div>
      <div className="relative h-full"><MediaDisplay item={mediaItems[2]} className="absolute inset-0" /></div>
      <div className="relative h-full">
        <MediaDisplay item={mediaItems[3]} className="absolute inset-0" />
        {count > 4 && <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xl font-bold text-white backdrop-blur-sm">+{count - 4}</div>}
      </div>
    </div>
  );
}

function MediaCarousel({ mediaItems }: { mediaItems: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (mediaItems.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  const prev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);

  return (
    <div className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div className="h-full w-full">
        <MediaDisplay item={mediaItems[currentIndex]} />
      </div>

      {mediaItems.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-1.5 text-black opacity-0 transition hover:bg-white group-hover:opacity-100">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-1.5 text-black opacity-0 transition hover:bg-white group-hover:opacity-100">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {currentIndex + 1}/{mediaItems.length}
          </div>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {mediaItems.map((_, index) => (
              <div key={index} className={`h-1.5 w-1.5 rounded-full transition-all ${index === currentIndex ? "scale-125 bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SyncSocialPostPreview({ content, mediaItems, platform, user }: SyncSocialPostPreviewProps) {
  if (platform === "facebook") {
    return (
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white font-sans shadow-sm">
        <div className="flex items-center gap-2 p-3">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-200" />
          <div>
            <div className="text-sm font-semibold text-slate-900">{user.name}</div>
            <div className="flex items-center gap-1 text-xs text-slate-500">Just now · <div className="h-3 w-3 rounded-full bg-slate-400" /></div>
          </div>
          <MoreHorizontal className="ml-auto h-5 w-5 text-slate-500" />
        </div>
        <div className="whitespace-pre-wrap px-3 pb-3 text-sm text-slate-900">{content || "Your post content..."}</div>
        {mediaItems.length > 0 && <div className={`w-full bg-slate-100 ${mediaItems.length === 1 ? "aspect-auto" : "aspect-square sm:aspect-[4/3]"}`}><MediaGrid mediaItems={mediaItems} /></div>}
        <div className="flex items-center justify-between border-t border-slate-100 p-3 text-sm text-slate-500">
          <div className="flex items-center gap-1"><div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500"><span className="text-[8px] text-white">👍</span></div><span>Like</span></div>
          <div className="flex gap-4"><span>Comment</span><span>Share</span></div>
        </div>
      </div>
    );
  }

  if (platform === "twitter") {
    return (
      <div className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-4 font-sans shadow-sm">
        <div className="flex gap-3">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-200" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-sm"><span className="font-bold text-slate-900">{user.name}</span><span className="text-slate-500">@{user.username} · 1m</span></div>
            <div className="mb-3 mt-1 whitespace-pre-wrap text-sm text-slate-900">{content || "What's happening?"}</div>
            {mediaItems.length > 0 && <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 ${mediaItems.length === 1 ? "" : "aspect-square sm:aspect-video"}`}><MediaGrid mediaItems={mediaItems} rounded /></div>}
            <div className="mt-3 flex max-w-xs justify-between text-slate-500"><MessageCircle className="h-4 w-4" /><Repeat className="h-4 w-4" /><Heart className="h-4 w-4" /><Share2 className="h-4 w-4" /></div>
          </div>
        </div>
      </div>
    );
  }

  if (platform === "instagram") {
    return (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-white font-sans shadow-sm">
        <div className="flex items-center gap-2 p-3"><div className="h-8 w-8 flex-shrink-0 rounded-full bg-slate-200" /><span className="text-sm font-semibold text-slate-900">{user.username}</span><MoreHorizontal className="ml-auto h-5 w-5 text-slate-900" /></div>
        <div className="relative aspect-square w-full bg-slate-100">{mediaItems.length > 0 ? <MediaCarousel mediaItems={mediaItems} /> : <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No media</div>}</div>
        <div className="flex justify-between p-3 pb-1"><div className="flex gap-4"><Heart className="h-6 w-6 text-slate-900" /><MessageCircle className="h-6 w-6 text-slate-900" /><Share2 className="h-6 w-6 text-slate-900" /></div><div className="h-6 w-6 rounded bg-slate-900/10" /></div>
        <div className="px-3 pb-3 text-sm"><div className="mb-1 font-semibold text-slate-900">1,234 likes</div><div><span className="mr-2 font-semibold text-slate-900">{user.username}</span><span className="whitespace-pre-wrap text-slate-900">{content}</span></div><div className="mt-1 text-xs uppercase text-slate-400">Just now</div></div>
      </div>
    );
  }

  if (platform === "tiktok") {
    return (
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-2xl border border-slate-800 bg-black font-sans text-white shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">{mediaItems.length > 0 ? <MediaCarousel mediaItems={mediaItems} /> : <div className="text-slate-500">No media</div>}</div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4">
          <div className="pointer-events-auto mb-4"><div className="text-shadow font-semibold">@{user.username}</div><div className="text-shadow line-clamp-3 whitespace-pre-wrap text-sm opacity-90">{content}</div><div className="mt-2 flex items-center gap-2 text-xs opacity-80"><Music2 className="h-3 w-3" /><span>Original Sound - {user.name}</span></div></div>
        </div>
        <div className="pointer-events-auto absolute bottom-20 right-2 flex flex-col items-center gap-4"><div className="h-10 w-10 rounded-full border border-white bg-slate-200" /><div className="flex flex-col items-center gap-1"><Heart className="h-8 w-8 text-white drop-shadow-md" fill="rgba(255,255,255,0.2)" /><span className="text-xs font-semibold shadow-black">1.2M</span></div><div className="flex flex-col items-center gap-1"><MessageCircle className="h-8 w-8 text-white drop-shadow-md" fill="rgba(255,255,255,0.2)" /><span className="text-xs font-semibold shadow-black">23K</span></div><div className="flex flex-col items-center gap-1"><Share2 className="h-8 w-8 text-white drop-shadow-md" fill="rgba(255,255,255,0.2)" /><span className="text-xs font-semibold shadow-black">45K</span></div></div>
      </div>
    );
  }

  if (platform === "line") {
    return (
      <div className="mx-auto flex h-[600px] w-full max-w-sm flex-col overflow-hidden rounded-lg border border-slate-200 bg-[#8cabd9] font-sans shadow-sm">
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#242d4a]/90 p-3 text-white backdrop-blur-md"><ChevronLeft className="h-6 w-6" /><div className="flex-1 text-lg font-semibold">{user.name}</div><div className="flex gap-4"><span className="text-xl">🔍</span><span className="text-xl">≡</span></div></div>
        <div className="flex-1 space-y-4 overflow-y-auto p-3"><div className="mb-4 flex justify-center"><span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] text-white">Today</span></div><div className="flex gap-2"><div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-slate-100 bg-white"><div className="h-full w-full bg-slate-200" /></div><div className="flex max-w-[80%] flex-col gap-2"><span className="text-xs font-medium text-slate-700">{user.name}</span>{content && <div className="relative rounded-2xl rounded-tl-none bg-white p-3 text-sm text-slate-900 shadow-sm"><div className="whitespace-pre-wrap">{content}</div><div className="absolute bottom-0 right-[-45px] w-10 text-[10px] text-slate-500">Read<br />10:30 AM</div></div>}{mediaItems.map((item, idx) => <div key={idx} className="relative w-48 overflow-hidden rounded-2xl rounded-tl-none bg-white p-1 shadow-sm"><MediaDisplay item={item} className="h-auto w-full rounded-xl" />{idx === mediaItems.length - 1 && !content && <div className="absolute bottom-0 right-[-45px] w-10 text-[10px] text-white drop-shadow-md">Read<br />10:30 AM</div>}</div>)}</div></div></div>
        <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-2"><div className="flex h-8 w-8 items-center justify-center text-2xl text-slate-400">+</div><div className="flex h-6 w-6 items-center justify-center text-xl text-slate-400">📷</div><div className="flex h-6 w-6 items-center justify-center text-xl text-slate-400">🖼️</div><div className="flex h-9 flex-1 items-center rounded-full bg-slate-100 px-3 text-sm text-slate-400">Aa</div><div className="flex h-6 w-6 items-center justify-center text-xl text-slate-400">🎤</div></div>
      </div>
    );
  }

  return null;
}
