import Navbar from "@/components/Navbar";
import SealCard from "@/components/SealCard";
import PostCard from "@/components/PostCard";
import { TrophyIcon, MapPinIcon, TradeIcon, SearchIcon } from "@/components/Icons";
import Link from "next/link";

const featuredSeals = [
  { name: "キティちゃん ボンドロ大", series: "ボンボンドロップシール", rate: 8, price: 800, seller: "sealqueen", type: "sale" as const },
  { name: "クロミ うるチュル", series: "うるチュルポップシール", rate: 4, price: 350, seller: "pukkuri_love", type: "sale" as const },
  { name: "たまごっち ボンドロ", series: "ボンボンドロップシール", rate: 7, seller: "seal_mama", type: "trade" as const },
  { name: "ちいかわ マシュマロ", series: "マシュマロシール", rate: 3, price: 200, seller: "chiikawa_fan", type: "sale" as const },
];

const posts = [
  {
    username: "sealqueen",
    avatarColor: "linear-gradient(135deg, #ec4899, #a855f7)",
    content: "今日ロフトでボンドロ大ゲットできた！キティとクロミ！レート8だから大切にする",
    likes: 48,
    comments: 12,
    timeAgo: "3分前",
    tags: ["ボンドロ", "シール帳", "今日の収穫"],
  },
  {
    username: "pukkuri_love",
    avatarColor: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    content: "うるチュルポップシールのたまごっちと交換してくれる方いませんか？こちらはマシュマロシール3枚出せます！",
    likes: 23,
    comments: 8,
    timeAgo: "15分前",
    tags: ["交換希望", "うるチュル", "マシュマロシール"],
  },
  {
    username: "seal_mama",
    avatarColor: "linear-gradient(135deg, #f59e0b, #ec4899)",
    content: "娘と一緒にシール帳作りました！ちいかわページ完成〜ぷっくりシールを並べるの楽しすぎる",
    likes: 102,
    comments: 31,
    timeAgo: "1時間前",
    tags: ["シール帳", "ちいかわ", "親子シール活動"],
  },
];

const rateRanking = [
  { rank: 1, name: "ボンボンドロップシール（大）", rate: 8, color: "#f59e0b" },
  { rank: 2, name: "ボンボンドロップシール（小）", rate: 5, color: "#94a3b8" },
  { rank: 3, name: "うるチュルポップシール", rate: 4, color: "#cd7c2f" },
  { rank: 4, name: "プチドロップシール", rate: 4, color: "#ec4899" },
  { rank: 5, name: "マシュマロシール", rate: 3, color: "#22c55e" },
];

const locations = [
  { name: "渋谷ロフト", status: "あり", statusColor: "bg-green-100 text-green-600", detail: "ボンドロ在庫あり", timeAgo: "10分前" },
  { name: "新宿マルイ文具売場", status: "わずか", statusColor: "bg-yellow-100 text-yellow-600", detail: "残りわずか", timeAgo: "1時間前" },
  { name: "池袋東急ハンズ", status: "なし", statusColor: "bg-red-100 text-red-500", detail: "在庫なし", timeAgo: "2時間前" },
];

export default function Home() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      {/* ヒーローバナー */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-purple-500 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-pink-200 text-sm font-medium mb-2 tracking-wide uppercase">Sticker Community</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            シール好きのための<br />マーケット＆コミュニティ
          </h1>
          <p className="text-pink-100 text-sm mb-6 max-w-md">
            シールの売買・交換・情報共有がここで全部できる。レート情報から販売場所まで。
          </p>
          <div className="flex gap-3">
            <Link
              href="/market"
              className="bg-white text-pink-600 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-pink-50 transition-colors flex items-center gap-2"
            >
              <SearchIcon className="w-4 h-4" />シールを探す
            </Link>
            <Link
              href="/sell"
              className="bg-pink-700 bg-opacity-60 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-opacity-80 transition-colors border border-white border-opacity-20"
            >
              出品する
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* メインカラム */}
          <div className="lg:col-span-2 space-y-8">

            {/* 注目の出品 */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 text-lg">注目の出品</h2>
                <Link href="/market" className="text-pink-500 text-sm font-medium hover:underline">
                  もっと見る
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {featuredSeals.map((seal, i) => (
                  <SealCard key={i} {...seal} />
                ))}
              </div>
            </section>

            {/* タイムライン */}
            <section>
              <h2 className="font-bold text-gray-800 text-lg mb-4">みんなの投稿</h2>
              <div className="space-y-3">
                {posts.map((post, i) => (
                  <PostCard key={i} {...post} />
                ))}
              </div>
            </section>
          </div>

          {/* サイドバー */}
          <div className="space-y-4">

            {/* レートランキング */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrophyIcon className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-gray-800">レートランキング</h3>
              </div>
              <div className="space-y-2.5">
                {rateRanking.map((item) => (
                  <div key={item.rank} className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: item.color }}
                    >
                      {item.rank}
                    </div>
                    <p className="text-xs text-gray-700 flex-1 min-w-0 truncate">{item.name}</p>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                      R{item.rate}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/zukan" className="block text-center text-pink-500 text-xs mt-4 font-medium hover:underline">
                図鑑で詳しく見る
              </Link>
            </div>

            {/* 入荷情報 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-gray-800">入荷情報</h3>
              </div>
              <div className="space-y-3">
                {locations.map((loc, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{loc.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{loc.timeAgo}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${loc.statusColor}`}>
                      {loc.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/zukan#map" className="block text-center text-pink-500 text-xs mt-4 font-medium hover:underline">
                マップで探す
              </Link>
            </div>

            {/* 交換募集 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TradeIcon className="w-5 h-5 text-purple-500" />
                <h3 className="font-bold text-gray-800">交換募集中</h3>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                持っているシールと欲しいシールを登録して交換相手を探そう
              </p>
              <Link
                href="/trade"
                className="block text-center bg-purple-500 text-white text-sm font-bold py-2.5 rounded-full hover:bg-purple-600 transition-colors"
              >
                交換相手を探す
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
