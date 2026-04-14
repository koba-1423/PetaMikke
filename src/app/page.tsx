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
    avatarColor: "#bc8880",
    content: "今日ロフトでボンドロ大ゲットできた。キティとクロミ、レート8だから大切にする",
    likes: 48,
    comments: 12,
    timeAgo: "3分前",
    tags: ["ボンドロ", "シール帳", "今日の収穫"],
  },
  {
    username: "pukkuri_love",
    avatarColor: "#8b7fc8",
    content: "うるチュルポップシールのたまごっちと交換してくれる方いませんか？こちらはマシュマロシール3枚出せます",
    likes: 23,
    comments: 8,
    timeAgo: "15分前",
    tags: ["交換希望", "うるチュル", "マシュマロシール"],
  },
  {
    username: "seal_mama",
    avatarColor: "#78aa78",
    content: "娘と一緒にシール帳作りました。ちいかわページ完成。ぷっくりシールを並べるの楽しすぎる",
    likes: 102,
    comments: 31,
    timeAgo: "1時間前",
    tags: ["シール帳", "ちいかわ", "親子シール活動"],
  },
];

const rateRanking = [
  { rank: 1, name: "ボンボンドロップシール（大）", rate: 8 },
  { rank: 2, name: "ボンボンドロップシール（小）", rate: 5 },
  { rank: 3, name: "うるチュルポップシール", rate: 4 },
  { rank: 4, name: "プチドロップシール", rate: 4 },
  { rank: 5, name: "マシュマロシール", rate: 3 },
];

const locations = [
  { name: "渋谷ロフト", status: "在庫あり", dot: "bg-green-400", timeAgo: "10分前" },
  { name: "新宿マルイ文具売場", status: "残りわずか", dot: "bg-yellow-400", timeAgo: "1時間前" },
  { name: "池袋東急ハンズ", status: "在庫なし", dot: "bg-stone-300", timeAgo: "2時間前" },
];

export default function Home() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      {/* ヒーロー */}
      <div className="border-b border-stone-100 bg-white py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">Sticker Community</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 leading-tight mb-4">
            シール好きのための<br />マーケット＆コミュニティ
          </h1>
          <p className="text-stone-500 text-sm mb-7 max-w-md leading-relaxed">
            シールの売買・交換・情報共有がここで全部できる。レート情報から販売場所まで。
          </p>
          <div className="flex gap-3">
            <Link
              href="/market"
              className="flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-700 transition-colors"
            >
              <SearchIcon className="w-4 h-4" />シールを探す
            </Link>
            <Link
              href="/sell"
              className="flex items-center gap-2 border border-stone-200 text-stone-700 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-50 transition-colors"
            >
              出品する
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* メインカラム */}
          <div className="lg:col-span-2 space-y-10">

            {/* 注目の出品 */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-stone-900">注目の出品</h2>
                <Link href="/market" className="text-xs text-stone-400 hover:text-stone-700 transition-colors">
                  もっと見る →
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
              <h2 className="font-semibold text-stone-900 mb-4">みんなの投稿</h2>
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
            <div className="border border-stone-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrophyIcon className="w-4 h-4 text-stone-400" />
                <h3 className="text-sm font-semibold text-stone-900">レートランキング</h3>
              </div>
              <div className="space-y-3">
                {rateRanking.map((item) => (
                  <div key={item.rank} className="flex items-center gap-2.5">
                    <span className="text-xs text-stone-300 w-4 text-right">{item.rank}</span>
                    <p className="text-xs text-stone-600 flex-1 min-w-0 truncate">{item.name}</p>
                    <span className="text-xs text-stone-400 border border-stone-100 px-1.5 py-0.5 rounded">
                      R{item.rate}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/zukan" className="block text-center text-xs text-stone-400 hover:text-stone-700 mt-4 transition-colors">
                図鑑で詳しく見る →
              </Link>
            </div>

            {/* 入荷情報 */}
            <div className="border border-stone-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="w-4 h-4 text-stone-400" />
                <h3 className="text-sm font-semibold text-stone-900">入荷情報</h3>
              </div>
              <div className="space-y-3">
                {locations.map((loc, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-stone-700">{loc.name}</p>
                      <p className="text-xs text-stone-400">{loc.timeAgo}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${loc.dot}`} />
                      <span className="text-xs text-stone-500">{loc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/zukan#map" className="block text-center text-xs text-stone-400 hover:text-stone-700 mt-4 transition-colors">
                マップで探す →
              </Link>
            </div>

            {/* 交換 */}
            <div className="border border-stone-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TradeIcon className="w-4 h-4 text-stone-400" />
                <h3 className="text-sm font-semibold text-stone-900">交換募集中</h3>
              </div>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                持っているシールと欲しいシールを登録して交換相手を探そう
              </p>
              <Link
                href="/trade"
                className="block text-center border border-stone-200 text-stone-700 text-sm font-medium py-2.5 rounded-full hover:bg-stone-50 transition-colors"
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
