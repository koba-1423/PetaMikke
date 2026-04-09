import Navbar from "@/components/Navbar";
import Link from "next/link";
import { StarIcon, PlusIcon, ChevronRightIcon } from "@/components/Icons";
import { SealPlaceholder } from "@/components/Icons";

const mySeals = [
  { name: "キティ ボンドロ大", series: "ボンボンドロップシール", rate: 8, status: "所持", quantity: 2 },
  { name: "クロミ うるチュル", series: "うるチュルポップシール", rate: 4, status: "交換可", quantity: 1 },
  { name: "ちいかわ マシュマロ", series: "マシュマロシール", rate: 3, status: "所持", quantity: 3 },
  { name: "シナモ ウォーター", series: "ウォーターシール", rate: 3, status: "欲しい", quantity: 0 },
  { name: "たまごっち ボンドロ小", series: "ボンボンドロップシール", rate: 5, status: "欲しい", quantity: 0 },
];

const myListings = [
  { name: "クロミ ボンドロ大", series: "ボンボンドロップシール", price: 750, status: "出品中" },
  { name: "マシュマロ × 3枚セット", series: "マシュマロシール", price: 500, status: "取引中" },
];

const statusStyles: Record<string, string> = {
  "所持": "bg-blue-50 text-blue-600 border-blue-100",
  "交換可": "bg-green-50 text-green-600 border-green-100",
  "欲しい": "bg-pink-50 text-pink-600 border-pink-100",
};

const menuItems = [
  { label: "プロフィール編集", href: "#" },
  { label: "購入履歴", href: "#" },
  { label: "評価・レビュー", href: "#" },
  { label: "通知設定", href: "#" },
  { label: "ログアウト", href: "#" },
];

export default function MyPage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* プロフィール */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-5 text-white mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "2px solid rgba(255,255,255,0.3)" }}
            >
              S
            </div>
            <div>
              <h1 className="text-xl font-bold">sealqueen</h1>
              <p className="text-pink-100 text-sm">シール収集歴3年 | 東京都</p>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-300" filled />
                ))}
                <span className="text-white text-xs ml-1">5.0（48件）</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            {[
              { value: "23", label: "所持シール" },
              { value: "15", label: "交換成立" },
              { value: "8", label: "フォロワー" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white bg-opacity-15 rounded-xl py-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-pink-100 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* コレクション管理 */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-lg">コレクション</h2>
            <button className="flex items-center gap-1 text-pink-500 text-sm font-medium hover:underline">
              <PlusIcon className="w-4 h-4" />追加
            </button>
          </div>

          {/* 凡例 */}
          <div className="flex gap-2 mb-3">
            {["所持", "交換可", "欲しい"].map((s) => (
              <span key={s} className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusStyles[s]}`}>{s}</span>
            ))}
          </div>

          <div className="space-y-2">
            {mySeals.map((seal, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 hover:border-pink-100 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <SealPlaceholder series={seal.series} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{seal.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">レート {seal.rate}</span>
                    {seal.quantity > 0 && (
                      <span className="text-xs text-gray-400">{seal.quantity}枚</span>
                    )}
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap border font-medium ${statusStyles[seal.status]}`}>
                  {seal.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 出品中 */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-lg">出品中のシール</h2>
            <Link href="/sell" className="flex items-center gap-1 text-pink-500 text-sm font-medium hover:underline">
              <PlusIcon className="w-4 h-4" />出品する
            </Link>
          </div>
          <div className="space-y-2">
            {myListings.map((listing, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 hover:border-pink-100 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <SealPlaceholder series={listing.series} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{listing.name}</p>
                  <p className="text-pink-500 text-sm font-bold">¥{listing.price.toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap border font-medium ${
                  listing.status === "出品中"
                    ? "bg-blue-50 text-blue-600 border-blue-100"
                    : "bg-orange-50 text-orange-600 border-orange-100"
                }`}>
                  {listing.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 設定メニュー */}
        <section>
          <h2 className="font-bold text-gray-800 text-lg mb-3">設定</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-4 py-3.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
