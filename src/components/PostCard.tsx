import { HeartIcon, CommentIcon, ShareIcon } from "@/components/Icons";
import ReportButton from "@/components/ReportButton";

type PostCardProps = {
  username: string;
  avatarColor: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  tags?: string[];
};

export default function PostCard({ username, avatarColor, content, likes, comments, timeAgo, tags }: PostCardProps) {
  return (
    <div className="bg-white border border-stone-100 rounded-xl p-4">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
          style={{ background: avatarColor }}
        >
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-stone-900">@{username}</p>
          <p className="text-xs text-stone-400">{timeAgo}</p>
        </div>
      </div>

      <p className="text-sm text-stone-700 leading-relaxed">{content}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-stone-400 hover:text-stone-600 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-stone-50">
        <button className="flex items-center gap-1.5 text-stone-400 hover:text-rose-400 transition-colors text-xs">
          <HeartIcon className="w-4 h-4" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-stone-400 hover:text-stone-600 transition-colors text-xs">
          <CommentIcon className="w-4 h-4" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center gap-1.5 text-stone-400 hover:text-stone-600 transition-colors text-xs ml-auto">
          <ShareIcon className="w-4 h-4" />
        </button>
        <ReportButton targetType="投稿" />
      </div>
    </div>
  );
}
