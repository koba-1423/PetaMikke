import Navbar from "@/components/Navbar";
import { TradeIcon, PlusIcon, HeartIcon } from "@/components/Icons";
import { SealPlaceholder } from "@/components/Icons";
import ReportButton from "@/components/ReportButton";

const tradeRequests = [
  {
    username: "seal_mama",
    avatarColor: "#78aa78",
    offering: { name: "ポムポムプリン ボンドロ大", series: "ボンボンドロップシール", rate: 8 },
    wanting:  { name: "クロミ ボンドロ大", series: "ボンボンドロップシール", rate: 8 },
    comment: "等価交換希望です。状態は未使用です",
    timeAgo: "5分前",
  },
  {
    username: "pukkuri_love",
    avatarColor: "#8b7fc8",
    offering: { name: "マシュマロシール × 3枚", series: "マシュマロシール", rate: 9 },
    wanting:  { name: "うるチュルポップシール", series: "うるチュルポップシール", rate: 4 },
    comment: "マシュマロ3枚でうるチュル1枚と交換お願いします",
    timeAgo: "20分前",
  },
  {
    username: "chiikawa_fan",
    avatarColor: "#68a8a0",
    offering: { name: "ちいかわ タイルシール × 5枚", series: "タイルシール", rate: 5 },
    wanting:  { name: "ちいかわ マシュマロシール", series: "マシュマロシール", rate: 3 },
    comment: "ちいかわシリーズのみ交換希望です",
    timeAgo: "1時間前",
  },
];

const filters = ["すべて", "等価交換", "ボンドロ募集", "うるチュル募集", "マシュマロ募集"];

export default function TradePage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 py-8">
        <h1 className="text-xl font-semibold text-stone-900 mb-1">シール交換</h1>
        <p className="text-stone-400 text-sm mb-6">交換相手を探してシールをトレードしよう</p>

        {/* 募集バナー */}
        <div className="border border-stone-100 rounded-xl p-5 mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TradeIcon className="w-4 h-4 text-stone-400" />
              <h2 className="font-semibold text-stone-900 text-sm">交換を募集する</h2>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              持っているシールと欲しいシールを登録して交換相手を見つけよう
            </p>
          </div>
          <button className="flex-shrink-0 flex items-center gap-1.5 bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 transition-colors">
            <PlusIcon className="w-3.5 h-3.5" />投稿する
          </button>
        </div>

        {/* フィルター */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 mb-5">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                i === 0
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* リスト */}
        <div className="space-y-3">
          {tradeRequests.map((req, i) => (
            <div key={i} className="bg-white border border-stone-100 rounded-xl p-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                  style={{ background: req.avatarColor }}
                >
                  {req.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">@{req.username}</p>
                  <p className="text-xs text-stone-400">{req.timeAgo}</p>
                </div>
              </div>

              {/* 交換内容 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border border-stone-100 rounded-lg p-3 text-center bg-stone-50">
                  <p className="text-xs text-stone-400 mb-2">出せるシール</p>
                  <div className="w-14 h-14 mx-auto rounded-lg overflow-hidden mb-2">
                    <SealPlaceholder series={req.offering.series} className="w-full h-full" />
                  </div>
                  <p className="text-xs text-stone-700 font-medium leading-tight">{req.offering.name}</p>
                  <span className="text-xs text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                    R{req.offering.rate}
                  </span>
                </div>

                <TradeIcon className="w-4 h-4 text-stone-300 flex-shrink-0" />

                <div className="flex-1 border border-stone-100 rounded-lg p-3 text-center bg-stone-50">
                  <p className="text-xs text-stone-400 mb-2">欲しいシール</p>
                  <div className="w-14 h-14 mx-auto rounded-lg overflow-hidden mb-2">
                    <SealPlaceholder series={req.wanting.series} className="w-full h-full" />
                  </div>
                  <p className="text-xs text-stone-700 font-medium leading-tight">{req.wanting.name}</p>
                  <span className="text-xs text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                    R{req.wanting.rate}
                  </span>
                </div>
              </div>

              <div className="bg-stone-50 rounded-lg p-3 mt-3">
                <p className="text-xs text-stone-600">{req.comment}</p>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-stone-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-stone-700 transition-colors">
                  交換を申し込む
                </button>
                <button className="px-3.5 py-2.5 border border-stone-200 text-stone-400 rounded-full hover:border-stone-400 transition-colors">
                  <HeartIcon className="w-4 h-4" />
                </button>
                <ReportButton targetType="交換リクエスト" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
