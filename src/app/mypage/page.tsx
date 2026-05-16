"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { StarIcon, PlusIcon, ChevronRightIcon } from "@/components/Icons";
import { SealPlaceholder } from "@/components/Icons";
import { readStoredListings, type UserListing } from "@/lib/listings";
import { clearAuthSession, readAuthSession } from "@/lib/local-auth";

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

const statusStyle: Record<string, string> = {
  "所持":  "text-stone-500 border-stone-200",
  "交換可": "text-green-600 border-green-200",
  "欲しい": "text-rose-400 border-rose-200",
};

const menuItems = [
  "プロフィール編集",
  "購入履歴",
  "評価・レビュー",
  "通知設定",
  "ログアウト",
];

export default function MyPage() {
  const router = useRouter();
  const [storedListings, setStoredListings] = useState<UserListing[]>([]);
  const [showListedMessage, setShowListedMessage] = useState(false);
  const [username, setUsername] = useState("sealqueen");
  const [email, setEmail] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowListedMessage(params.get("listed") === "1");
    const session = readAuthSession();
    if (session) {
      setHasSession(true);
      setUsername(session.username);
      setEmail(session.email);
      setStoredListings(readStoredListings().filter((listing) => listing.ownerUserId === session.userId));
      return;
    }
    setHasSession(false);
    setStoredListings([]);
  }, []);

  const allListings = hasSession ? storedListings : myListings;

  const handleMenuClick = (item: string) => {
    if (item !== "ログアウト") return;
    setLoggingOut(true);
    clearAuthSession();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-2xl mx-auto px-5 py-8">
        {showListedMessage && (
          <div className="mb-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">出品を保存しました</p>
            <p className="text-xs text-green-600 mt-1">マイページの「出品中」に追加されています。</p>
          </div>
        )}

        {/* プロフィール */}
        <div className="border border-stone-100 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-semibold flex-shrink-0"
              style={{ background: "#bc8880" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-stone-900">{username}</h1>
              <p className="text-stone-400 text-xs mt-0.5">
                {email ? `${email} でログイン中` : "シール収集歴3年 | 東京都"}
              </p>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3.5 h-3.5 text-yellow-400" filled />
                ))}
                <span className="text-stone-400 text-xs ml-1">5.0（48件）</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { value: "23", label: "所持シール" },
              { value: "15", label: "交換成立" },
              { value: "8",  label: "フォロワー" },
            ].map((s) => (
              <div key={s.label} className="bg-stone-50 rounded-lg py-3">
                <p className="text-xl font-semibold text-stone-900">{s.value}</p>
                <p className="text-xs text-stone-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* コレクション */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-stone-900">コレクション</h2>
            <button className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 transition-colors">
              <PlusIcon className="w-3.5 h-3.5" />追加
            </button>
          </div>
          <div className="flex gap-2 mb-3">
            {["所持", "交換可", "欲しい"].map((s) => (
              <span key={s} className={`text-xs px-2 py-0.5 rounded border ${statusStyle[s]}`}>{s}</span>
            ))}
          </div>
          <div className="space-y-2">
            {mySeals.map((seal, i) => (
              <div key={i} className="bg-white border border-stone-100 rounded-lg p-3 flex items-center gap-3 hover:border-stone-200 transition-colors">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <SealPlaceholder series={seal.series} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 truncate">{seal.name}</p>
                  <p className="text-xs text-stone-400">レート {seal.rate}{seal.quantity > 0 ? `・${seal.quantity}枚` : ""}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded border whitespace-nowrap ${statusStyle[seal.status]}`}>
                  {seal.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 出品中 */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-stone-900">出品中</h2>
            <Link href="/sell" className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 transition-colors">
              <PlusIcon className="w-3.5 h-3.5" />出品する
            </Link>
          </div>
          <div className="space-y-2">
            {allListings.map((listing, i) => (
              <div key={`${listing.name}-${i}`} className="bg-white border border-stone-100 rounded-lg p-3 flex items-center gap-3 hover:border-stone-200 transition-colors">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <SealPlaceholder series={listing.series} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 truncate">{listing.name}</p>
                  <p className="text-sm font-semibold text-stone-900">¥{listing.price.toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded border whitespace-nowrap ${
                  listing.status === "出品中" ? "text-stone-500 border-stone-200" : "text-yellow-600 border-yellow-200"
                }`}>
                  {listing.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 設定 */}
        <section>
          <h2 className="font-semibold text-stone-900 mb-3">設定</h2>
          <div className="border border-stone-100 rounded-xl overflow-hidden divide-y divide-stone-50">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleMenuClick(item)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors text-left"
              >
                {item === "ログアウト" && loggingOut ? "ログアウト中..." : item}
                <ChevronRightIcon className="w-4 h-4 text-stone-300" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
