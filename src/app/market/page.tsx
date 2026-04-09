import Navbar from "@/components/Navbar";
import SealCard from "@/components/SealCard";
import { SearchIcon } from "@/components/Icons";

const seals = [
  { name: "キティちゃん ボンドロ大", series: "ボンボンドロップシール", rate: 8, price: 800, seller: "sealqueen", type: "sale" as const },
  { name: "クロミ うるチュル", series: "うるチュルポップシール", rate: 4, price: 350, seller: "pukkuri_love", type: "sale" as const },
  { name: "たまごっち ボンドロ小", series: "ボンボンドロップシール", rate: 5, price: 500, seller: "seal_mama", type: "sale" as const },
  { name: "ちいかわ マシュマロ", series: "マシュマロシール", rate: 3, price: 200, seller: "chiikawa_fan", type: "sale" as const },
  { name: "ポムポムプリン ボンドロ大", series: "ボンボンドロップシール", rate: 8, seller: "pudding_seal", type: "trade" as const },
  { name: "マイメロ プチドロップ", series: "プチドロップシール", rate: 4, price: 300, seller: "melo_chan", type: "sale" as const },
  { name: "シナモロール ウォーター", series: "ウォーターシール", rate: 3, price: 250, seller: "cinnamoroll99", type: "sale" as const },
  { name: "ハローキティ うるチュル", series: "うるチュルポップシール", rate: 4, seller: "kitty_collection", type: "trade" as const },
];

const categories = ["すべて", "ボンボンドロップ", "うるチュルポップ", "マシュマロ", "プチドロップ", "ウォーター", "ペラシール"];

export default function MarketPage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">マーケット</h1>
        <p className="text-gray-400 text-sm mb-5">シールを探して購入・交換しよう</p>

        {/* 検索バー */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="シール名・シリーズで検索..."
              className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 bg-white"
            />
          </div>
          <button className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-pink-600 transition-colors">
            検索
          </button>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                cat === "すべて"
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ソート */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">{seals.length}件</p>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-white text-gray-700">
            <option>新着順</option>
            <option>レート高い順</option>
            <option>価格が安い順</option>
            <option>価格が高い順</option>
          </select>
        </div>

        {/* 出品一覧 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {seals.map((seal, i) => (
            <SealCard key={i} {...seal} />
          ))}
        </div>
      </div>
    </div>
  );
}
