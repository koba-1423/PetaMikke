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

export default function PostCard({
  username,
  avatarColor,
  content,
  likes,
  comments,
  timeAgo,
  tags,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      {/* ユーザー情報 */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: avatarColor }}
        >
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-800">@{username}</p>
          <p className="text-xs text-gray-400">{timeAgo}</p>
        </div>
      </div>

      {/* 本文 */}
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>

      {/* タグ */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="text-pink-500 text-xs font-medium hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* アクション */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors text-sm group">
          <HeartIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors text-sm">
          <CommentIcon className="w-4 h-4" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-green-500 transition-colors text-sm ml-auto">
          <ShareIcon className="w-4 h-4" />
          <span>シェア</span>
        </button>
        <ReportButton targetType="投稿" />
      </div>
    </div>
  );
}
