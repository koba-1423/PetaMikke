import Navbar from "@/components/Navbar";
import { TradeIcon, PlusIcon, HeartIcon } from "@/components/Icons";
import { SealPlaceholder } from "@/components/Icons";

const tradeRequests = [
  {
    username: "seal_mama",
    avatarColor: "linear-gradient(135deg, #f59e0b, #ec4899)",
    offering: { name: "ポムポムプリン ボンドロ大", series: "ボンボンドロップシール", rate: 8 },
    wanting: { name: "クロミ ボンドロ大", series: "ボンボンドロップシール", rate: 8 },
    comment: "等価交換希望です！状態は未使用です",
    timeAgo: "5分前",
  },
  {
    username: "pukkuri_love",
    avatarColor: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    offering: { name: "マシュマロシール × 3枚", series: "マシュマロシール", rate: 9 },
    wanting: { name: "うるチュルポップシール", series: "うるチュルポップシール", rate: 4 },
    comment: "マシュマロ3枚でうるチュル1枚と交換お願いします！",
    timeAgo: "20分前",
  },
  {
    username: "chiikawa_fan",
    avatarColor: "linear-gradient(135deg, #22c55e, #0ea5e9)",
    offering: { name: "ちいかわ タイルシール × 5枚", series: "タイルシール", rate: 5 },
    wanting: { name: "ちいかわ マシュマロシール", series: "マシュマロシール", rate: 3 },
    comment: "ちいかわシリーズのみ交換希望です！",
    timeAgo: "1時間前",
  },
  {
    username: "sealqueen",
    avatarColor: "linear-gradient(135deg, #ec4899, #a855f7)",
    offering: { name: "キティ うるチュル", series: "うるチュルポップシール", rate: 4 },
    wanting: { name: "ボンドロ小（何でも）", series: "ボンボンドロップシール", rate: 5 },
    comment: "レートが少し違いますが相談に応じます",
    timeAgo: "2時間前",
  },
];

const filters = ["すべて", "等価交換", "ボンドロ募集", "うるチュル募集", "マシュマロ募集"];

export default function TradePage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">シール交換</h1>
        <p className="text-gray-400 text-sm mb-5">交換相手を探してシールをトレードしよう</p>

        {/* 交換募集バナー */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <TradeIcon className="w-5 h-5" />
            <h2 className="font-bold text-lg">交換を募集する</h2>
          </div>
          <p className="text-purple-100 text-sm mb-4">
            持っているシールと欲しいシールを登録して交換相手を見つけよう
          </p>
          <button className="bg-white text-purple-600 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-purple-50 transition-colors flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />交換リクエストを投稿
          </button>
        </div>

        {/* フィルター */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === "すべて"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 交換リスト */}
        <div className="space-y-4">
          {tradeRequests.map((req, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
              {/* ユーザー */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: req.avatarColor }}
                >
                  {req.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">@{req.username}</p>
                  <p className="text-xs text-gray-400">{req.timeAgo}</p>
                </div>
              </div>

              {/* 交換内容 */}
              <div className="flex items-center gap-3">
                {/* 出す側 */}
                <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                  <p className="text-xs text-green-600 font-semibold mb-2">出せるシール</p>
                  <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden mb-2">
                    <SealPlaceholder series={req.offering.series} className="w-full h-full" />
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-tight">{req.offering.name}</p>
                  <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-0.5 rounded-md mt-1.5 inline-block">
                    R{req.offering.rate}
                  </span>
                </div>

                {/* 矢印 */}
                <div className="flex-shrink-0">
                  <TradeIcon className="w-5 h-5 text-gray-300" />
                </div>

                {/* 欲しい側 */}
                <div className="flex-1 bg-pink-50 border border-pink-100 rounded-xl p-3 text-center">
                  <p className="text-xs text-pink-600 font-semibold mb-2">欲しいシール</p>
                  <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden mb-2">
                    <SealPlaceholder series={req.wanting.series} className="w-full h-full" />
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-tight">{req.wanting.name}</p>
                  <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-md mt-1.5 inline-block">
                    R{req.wanting.rate}
                  </span>
                </div>
              </div>

              {/* コメント */}
              <div className="bg-gray-50 rounded-xl p-3 mt-3">
                <p className="text-sm text-gray-600">{req.comment}</p>
              </div>

              {/* アクション */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-purple-500 text-white text-sm font-bold py-2.5 rounded-full hover:bg-purple-600 transition-colors">
                  交換を申し込む
                </button>
                <button className="px-4 py-2.5 border border-gray-200 text-gray-400 rounded-full hover:border-pink-300 hover:text-pink-400 transition-colors">
                  <HeartIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
