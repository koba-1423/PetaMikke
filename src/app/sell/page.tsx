"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { CameraIcon, PlusIcon } from "@/components/Icons";
import { readStoredListings, writeStoredListings, type ListingCondition, type ListingType, type UserListing } from "@/lib/listings";
import { readAuthSession, type LocalAuthSession } from "@/lib/local-auth";

const sealSeriesOptions = [
  "ボンボンドロップシール",
  "うるチュルポップシール",
  "プチドロップシール",
  "マシュマロシール",
  "ウォーターシール",
  "タイルシール",
  "ペラシール",
  "その他",
];

const conditions   = ["未使用", "良好", "傷あり"];
const listingTypes = ["販売のみ", "交換のみ", "両方OK"];

export default function SellPage() {
  const router = useRouter();
  const [session, setSession] = useState<LocalAuthSession | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [sealName, setSealName] = useState("");
  const [series, setSeries] = useState("");
  const [condition, setCondition] = useState<ListingCondition>("未使用");
  const [listingType, setListingType] = useState<ListingType>("両方OK");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSession(readAuthSession());
  }, []);

  const receiveAmount = useMemo(() => {
    const amount = Number(price);
    if (!Number.isFinite(amount) || amount <= 0) return 0;
    return Math.floor(amount * 0.9);
  }, [price]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const nextFiles = files.slice(0, Math.max(0, 5 - images.length));
    const readers = nextFiles.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers)
      .then((results) => setImages((current) => [...current, ...results].slice(0, 5)))
      .catch(() => setError("画像の読み込みに失敗しました"));

    event.target.value = "";
  };

  const handleSubmit = () => {
    setError("");

    if (!session) {
      setError("出品するにはログインが必要です");
      return;
    }

    if (!sealName.trim()) {
      setError("シール名を入力してください");
      return;
    }
    if (!series) {
      setError("シリーズを選択してください");
      return;
    }
    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError("販売価格を入力してください");
      return;
    }
    if (!agreed) {
      setError("利用規約と禁止事項への同意が必要です");
      return;
    }

    setSaving(true);

    const listing: UserListing = {
      id: crypto.randomUUID(),
      ownerUserId: session.userId,
      ownerUsername: session.username,
      ownerEmail: session.email,
      name: sealName.trim(),
      series,
      condition,
      listingType,
      price: numericPrice,
      description: description.trim(),
      status: "出品中",
      createdAt: new Date().toISOString(),
    };

    try {
      const current = readStoredListings();
      writeStoredListings([listing, ...current]);
      router.push("/mypage?listed=1");
      router.refresh();
    } catch {
      setError("出品の保存に失敗しました");
      setSaving(false);
    }
  };

  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-lg mx-auto px-5 py-8">
        <h1 className="text-xl font-semibold text-stone-900 mb-1">シールを出品する</h1>
        <p className="text-stone-400 text-sm mb-3">シールの情報を入力して出品しよう</p>
        <p className="text-xs text-stone-500 mb-6">
          {session ? `@${session.username} として出品します` : "ログイン後に出品できます"}
        </p>

        {!session && (
          <div className="border border-amber-100 bg-amber-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-amber-800">出品にはログインが必要です</p>
            <p className="text-xs text-amber-700 mt-1">ログインすると、出品があなたのアカウントに紐づきます。</p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-3 inline-flex items-center rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white hover:bg-stone-700 transition-colors"
            >
              ログインへ
            </button>
          </div>
        )}

        {/* 偽物禁止警告 */}
        <div className="border border-red-100 bg-red-50 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-red-500 mb-1">偽物・コピー品の出品は禁止です</p>
          <p className="text-xs text-red-400 leading-relaxed">
            模倣品の出品は商標法・著作権法に違反する場合があります。発見次第、出品削除・アカウント停止の措置を取ります。
          </p>
        </div>

        <div className="space-y-4">

          {/* 写真 */}
          <div className="border border-stone-100 rounded-xl p-5">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">写真</label>
            <label className="border-2 border-dashed border-stone-200 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-colors group">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
              <div className="w-9 h-9 border border-stone-200 rounded-full flex items-center justify-center mb-2 group-hover:border-stone-400 transition-colors">
                <CameraIcon className="w-4 h-4 text-stone-400" />
              </div>
              <p className="text-xs text-stone-400">タップして写真を追加</p>
              <p className="text-xs text-stone-300 mt-0.5">最大5枚</p>
            </label>
            <div className="flex gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-dashed border-stone-200 flex items-center justify-center bg-stone-50">
                  {images[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={images[i]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <PlusIcon className="w-3.5 h-3.5 text-stone-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 基本情報 */}
          <div className="border border-stone-100 rounded-xl p-5 space-y-4">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide">基本情報</label>

            <div>
              <label className="block text-xs text-stone-400 mb-1.5">シール名</label>
              <input
                type="text"
                value={sealName}
                onChange={(e) => setSealName(e.target.value)}
                placeholder="例：キティちゃん ボンボンドロップシール 大"
                className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 text-stone-700 placeholder-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1.5">シリーズ</label>
              <select
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 bg-white text-stone-700"
              >
                <option value="">選択してください</option>
                {sealSeriesOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1.5">状態</label>
              <div className="grid grid-cols-3 gap-2">
                {conditions.map((cond, i) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond as ListingCondition)}
                    className={`py-2 rounded-lg text-sm border transition-colors ${
                      condition === cond
                        ? "bg-stone-900 text-white border-stone-900"
                        : "text-stone-500 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 価格・タイプ */}
          <div className="border border-stone-100 rounded-xl p-5 space-y-4">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide">出品タイプ・価格</label>

            <div>
              <label className="block text-xs text-stone-400 mb-1.5">出品タイプ</label>
              <div className="grid grid-cols-3 gap-2">
                {listingTypes.map((type, i) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setListingType(type as ListingType)}
                    className={`py-2 rounded-lg text-sm border transition-colors ${
                      listingType === type
                        ? "bg-stone-900 text-white border-stone-900"
                        : "text-stone-500 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1.5">販売価格（円）</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">¥</span>
                <input
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="300"
                  className="w-full border border-stone-200 rounded-lg pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 text-stone-700"
                />
              </div>
              <p className="text-xs text-stone-400 mt-1.5">
                手数料10%を引いた金額が受け取り額になります
                {receiveAmount > 0 ? `（受け取り予定 ¥${receiveAmount.toLocaleString()}）` : ""}
              </p>
            </div>
          </div>

          {/* 説明 */}
          <div className="border border-stone-100 rounded-xl p-5">
            <label className="block text-xs text-stone-400 mb-1.5">説明・コメント</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="シールの状態や交換希望の詳細など..."
              className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 resize-none text-stone-700 placeholder-stone-300"
            />
          </div>

          {/* 同意 */}
          <div className="border border-stone-100 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <p className="text-xs text-stone-400 leading-relaxed">
                出品するシールが正規品であることを確認しました。
                <a href="/terms" className="text-stone-600 underline">利用規約</a>
                および禁止事項に同意します。
              </p>
            </label>
          </div>

          {/* ボタン */}
          {error && <p className="text-xs text-rose-500">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!session || saving}
            className="w-full bg-stone-900 text-white font-medium py-3.5 rounded-full hover:bg-stone-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "保存中..." : "出品する"}
          </button>
        </div>
      </div>
    </div>
  );
}
