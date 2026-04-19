"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { MapPinIcon, PlusIcon } from "@/components/Icons";
import { createClient } from "@/lib/supabase/client";
import type { StorePin } from "@/components/Map";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const sealSeriesOptions = [
  "ボンボンドロップシール",
  "うるチュルポップシール",
  "プチドロップシール",
  "マシュマロシール",
  "ウォーターシール",
  "タイルシール",
  "その他",
];

const statusOptions = [
  { value: "in_stock",     label: "在庫あり",   dot: "bg-green-400" },
  { value: "low",          label: "残りわずか", dot: "bg-yellow-400" },
  { value: "out_of_stock", label: "在庫なし",   dot: "bg-stone-300" },
] as const;

const statusConfig = {
  in_stock:     { label: "在庫あり",   bg: "bg-green-50",  border: "border-green-100", text: "text-green-700" },
  low:          { label: "残りわずか", bg: "bg-yellow-50", border: "border-yellow-100", text: "text-yellow-700" },
  out_of_stock: { label: "在庫なし",   bg: "bg-stone-100", border: "border-stone-200",  text: "text-stone-500" },
};

const initialPins: StorePin[] = [
  {
    id: 1, name: "渋谷ロフト", lat: 35.6599, lng: 139.7022,
    status: "in_stock", sealName: "キティちゃん ボンドロ大", series: "ボンボンドロップシール",
    location: "2F 文具売場", quantity: 30, perPersonLimit: 3,
    postedBy: "sealqueen", updatedBy: "sealqueen", updatedAt: "10分前",
    comment: "キティとクロミがありました",
  },
  {
    id: 2, name: "新宿マルイ文具売場", lat: 35.6938, lng: 139.7034,
    status: "low", sealName: "クロミ うるチュル", series: "うるチュルポップシール",
    location: "B1F", quantity: 5,
    postedBy: "pukkuri_love", updatedBy: "seal_mama", updatedAt: "1時間前",
  },
  {
    id: 3, name: "池袋東急ハンズ", lat: 35.7295, lng: 139.7109,
    status: "out_of_stock", sealName: "たまごっち ボンドロ小", series: "ボンボンドロップシール",
    postedBy: "seal_mama", updatedBy: "seal_mama", updatedAt: "2時間前",
  },
  {
    id: 4, name: "銀座伊東屋", lat: 35.6714, lng: 139.7653,
    status: "in_stock", sealName: "マイメロ プチドロップ", series: "プチドロップシール",
    location: "3F 雑貨", quantity: 20, perPersonLimit: 5, perTypeLimit: 2,
    postedBy: "ginza_sticker", updatedBy: "ginza_sticker", updatedAt: "30分前",
    comment: "プチドロが大量入荷",
  },
  {
    id: 5, name: "原宿ロフト", lat: 35.6702, lng: 139.7026,
    status: "in_stock", sealName: "ちいかわ マシュマロ", series: "マシュマロシール",
    location: "1F レジ横", quantity: 15, perPersonLimit: 2,
    postedBy: "harajuku_fan", updatedBy: "harajuku_fan", updatedAt: "5分前",
  },
];

type Mode = "none" | "post" | "edit";

const emptyForm = {
  storeName: "", sealName: "", series: sealSeriesOptions[0],
  status: "in_stock" as StorePin["status"],
  location: "", quantity: "", perPersonLimit: "", perTypeLimit: "", comment: "",
};

type Suggestion = { lat: number; lng: number; displayName: string; shortName: string };

async function searchPlaces(query: string): Promise<Suggestion[]> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&countrycodes=jp`,
    { headers: { "Accept-Language": "ja" } }
  );
  const data = await res.json();
  return data.map((d: { lat: string; lon: string; display_name: string; name: string }) => ({
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
    displayName: d.display_name,
    shortName: d.name || d.display_name.split(",")[0],
  }));
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    { headers: { "Accept-Language": "ja" } }
  );
  const data = await res.json();
  return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export default function MapPage() {
  const supabase = createClient();
  const [username, setUsername] = useState<string>("");
  const [pins, setPins]               = useState<StorePin[]>(initialPins);
  const [selectedPin, setSelectedPin] = useState<StorePin | null>(null);
  const [mode, setMode]               = useState<Mode>("none");
  const [post, setPost]               = useState({ ...emptyForm });
  const [edit, setEdit]               = useState({ ...emptyForm });
  const [geocoding, setGeocoding]       = useState(false);
  const [geocodeError, setGeocodeError] = useState("");
  const [geocodedCoords, setGeocodedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geocodedDisplayName, setGeocodedDisplayName] = useState("");
  const [suggestions, setSuggestions]   = useState<Suggestion[]>([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [pickMode, setPickMode]         = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ログイン中のユーザー名を取得
  useEffect(() => {
    const fetchUsername = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      if (profile) setUsername(profile.username);
    };
    fetchUsername();
  }, []);

  const openEdit = (pin: StorePin) => {
    setSelectedPin(pin);
    setEdit({
      storeName: pin.name, sealName: pin.sealName, series: pin.series,
      status: pin.status,
      location: pin.location ?? "", quantity: pin.quantity?.toString() ?? "",
      perPersonLimit: pin.perPersonLimit?.toString() ?? "",
      perTypeLimit: pin.perTypeLimit?.toString() ?? "",
      comment: pin.comment ?? "",
    });
    setMode("edit");
  };

  const resetLocation = () => {
    setGeocodedCoords(null);
    setGeocodedDisplayName("");
    setGeocodeError("");
    setSuggestions([]);
  };

  const handleLocationQueryChange = (value: string) => {
    setLocationQuery(value);
    resetLocation();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) return;
    debounceRef.current = setTimeout(async () => {
      setGeocoding(true);
      const results = await searchPlaces(value);
      setGeocoding(false);
      if (results.length === 0) {
        setGeocodeError("候補が見つかりませんでした。別の書き方で試してください。");
      } else {
        setSuggestions(results);
      }
    }, 600);
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    setLocationQuery(s.shortName);
    setGeocodedCoords({ lat: s.lat, lng: s.lng });
    setGeocodedDisplayName(s.displayName);
    setSuggestions([]);
    setGeocodeError("");
    setPickMode(false);
  };

  const handleMapClick = async (lat: number, lng: number) => {
    if (!pickMode) return;
    setPickMode(false);
    setGeocoding(true);
    const displayName = await reverseGeocode(lat, lng);
    setGeocoding(false);
    setGeocodedCoords({ lat, lng });
    setGeocodedDisplayName(displayName);
    setLocationQuery(displayName.split(",")[0]);
    setSuggestions([]);
    setGeocodeError("");
  };

  const handlePost = () => {
    if (!post.storeName.trim() || !post.sealName.trim() || !geocodedCoords) return;
    const newPin: StorePin = {
      id: Date.now(),
      name: post.storeName,
      lat: geocodedCoords.lat,
      lng: geocodedCoords.lng,
      status: post.status,
      sealName: post.sealName,
      series: post.series,
      address: geocodedDisplayName || undefined,
      location: post.location || undefined,
      quantity: post.quantity ? parseInt(post.quantity) : undefined,
      perPersonLimit: post.perPersonLimit ? parseInt(post.perPersonLimit) : undefined,
      perTypeLimit: post.perTypeLimit ? parseInt(post.perTypeLimit) : undefined,
      comment: post.comment || undefined,
      postedBy: username,
      updatedBy: username,
      updatedAt: "たった今",
    };
    setPins((prev) => [newPin, ...prev]);
    setPost({ ...emptyForm });
    setLocationQuery("");
    setGeocodedCoords(null);
    setGeocodedDisplayName("");
    setGeocodeError("");
    setSuggestions([]);
    setPickMode(false);
    setMode("none");
  };

  const handleEdit = () => {
    if (!selectedPin) return;
    setPins((prev) =>
      prev.map((p) =>
        p.id === selectedPin.id ? {
          ...p,
          sealName: edit.sealName || p.sealName,
          series: edit.series,
          status: edit.status,
          location: edit.location || undefined,
          quantity: edit.quantity ? parseInt(edit.quantity) : undefined,
          perPersonLimit: edit.perPersonLimit ? parseInt(edit.perPersonLimit) : undefined,
          perTypeLimit: edit.perTypeLimit ? parseInt(edit.perTypeLimit) : undefined,
          comment: edit.comment || undefined,
          updatedBy: username,
          updatedAt: "たった今",
        } : p
      )
    );
    setSelectedPin(null);
    setMode("none");
  };

  const canPost = post.storeName.trim() && post.sealName.trim() && geocodedCoords;

  return (
    <div className="pb-16 md:pb-0 flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* ヘッダー */}
        <div className="px-5 py-4 border-b border-stone-100 bg-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-stone-400" />
              <h1 className="text-base font-semibold text-stone-900">シール販売マップ</h1>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">ユーザーが投稿したリアルタイムの入荷情報</p>
          </div>
          <button
            onClick={() => { setMode(mode === "post" ? "none" : "post"); setSelectedPin(null); }}
            className="flex items-center gap-1.5 bg-stone-900 text-white text-xs font-medium px-3.5 py-2 rounded-full hover:bg-stone-700 transition-colors"
          >
            <PlusIcon className="w-3.5 h-3.5" />投稿する
          </button>
        </div>

        {/* 凡例 */}
        <div className="flex items-center gap-4 px-5 py-2.5 border-b border-stone-50 bg-white flex-shrink-0">
          {statusOptions.map((s) => (
            <div key={s.value} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              <span className="text-xs text-stone-500">{s.label}</span>
            </div>
          ))}
          <span className="text-xs text-stone-300 ml-auto">{pins.length}件</span>
        </div>

        {/* 地図 */}
        <div className="flex-1 relative min-h-0">
          <Map
            pins={pins}
            onPinClick={(pin) => { if (!pickMode) { setSelectedPin(pin); setMode("none"); } }}
            onMapClick={handleMapClick}
            pickMode={pickMode}
          />

          {/* 選択中カード */}
          {selectedPin && mode === "none" && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl border border-stone-100 shadow-lg p-4 z-[1000]">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-stone-900">{selectedPin.name}</p>
                  <p className="text-sm text-stone-700 mt-0.5">{selectedPin.sealName}</p>
                  <p className="text-xs text-stone-400">{selectedPin.series}</p>
                </div>
                <button onClick={() => setSelectedPin(null)} className="text-stone-300 hover:text-stone-600 text-xl leading-none">×</button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusConfig[selectedPin.status].bg} ${statusConfig[selectedPin.status].border} ${statusConfig[selectedPin.status].text}`}>
                  {statusConfig[selectedPin.status].label}
                </span>
                <span className="text-xs text-stone-400">{selectedPin.updatedAt}</span>
              </div>

              {/* 詳細情報 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                {selectedPin.address       && <p className="text-xs text-stone-500 col-span-2"><span className="text-stone-400">住所</span>　{selectedPin.address}</p>}
                {selectedPin.location      && <p className="text-xs text-stone-500"><span className="text-stone-400">場所</span>　{selectedPin.location}</p>}
                {selectedPin.quantity      && <p className="text-xs text-stone-500"><span className="text-stone-400">数量</span>　{selectedPin.quantity}個</p>}
                {selectedPin.perPersonLimit && <p className="text-xs text-stone-500"><span className="text-stone-400">1人</span>　{selectedPin.perPersonLimit}個まで</p>}
                {selectedPin.perTypeLimit   && <p className="text-xs text-stone-500"><span className="text-stone-400">1種類</span>　{selectedPin.perTypeLimit}個まで</p>}
              </div>

              {selectedPin.comment && (
                <p className="text-xs text-stone-500 italic bg-stone-50 rounded-lg px-3 py-2 mb-3">
                  "{selectedPin.comment}"
                </p>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center text-xs text-stone-600 font-medium">
                    {selectedPin.postedBy.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-stone-400">投稿：@{selectedPin.postedBy}</span>
                </div>
                {selectedPin.updatedBy !== selectedPin.postedBy && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center text-xs text-stone-600 font-medium">
                      {selectedPin.updatedBy.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-stone-400">修正：@{selectedPin.updatedBy}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => openEdit(selectedPin)}
                className="w-full border border-stone-200 text-stone-600 text-sm font-medium py-2 rounded-full hover:bg-stone-50 transition-colors"
              >
                情報を修正する
              </button>
            </div>
          )}
        </div>

        {/* 投稿フォーム */}
        {mode === "post" && (
          <div className="flex-shrink-0 border-t border-stone-100 bg-white p-5 space-y-3 max-h-[65vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-900 text-sm">入荷情報を投稿する</h2>
              {username && <span className="text-xs text-stone-400">@{username} として投稿</span>}
            </div>

            {/* 店名：自由入力 */}
            <Field label="店名 *">
              <Input
                value={post.storeName}
                onChange={(v) => setPost({ ...post, storeName: v })}
                placeholder="例：ロフト渋谷店"
              />
            </Field>

            {/* 場所：検索 or マップから選択 */}
            <Field label="場所 *">
              <div className="space-y-2">
                <div className="relative">
                  <div className="flex items-center border border-stone-200 rounded-lg px-3.5 py-2.5 focus-within:border-stone-400">
                    <input
                      value={locationQuery}
                      onChange={(e) => handleLocationQueryChange(e.target.value)}
                      placeholder="店名や住所で検索..."
                      className="flex-1 text-sm text-stone-700 placeholder-stone-300 focus:outline-none bg-transparent"
                    />
                    {geocoding && <span className="text-xs text-stone-400 whitespace-nowrap">検索中...</span>}
                  </div>

                  {suggestions.length > 0 && (
                    <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectSuggestion(s)}
                          className="w-full text-left px-4 py-3 hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-b-0"
                        >
                          <p className="text-sm text-stone-800 font-medium">{s.shortName}</p>
                          <p className="text-xs text-stone-400 mt-0.5 truncate">{s.displayName}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => { setPickMode(!pickMode); resetLocation(); setSuggestions([]); }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-medium transition-colors ${pickMode ? "bg-stone-900 text-white border-stone-900" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  {pickMode ? "タップをキャンセル" : "マップから選択"}
                </button>

                {geocodeError && <p className="text-xs text-rose-500">{geocodeError}</p>}
                {geocodedCoords && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-xs text-green-600 mt-0.5">✓</span>
                    <p className="text-xs text-stone-500 leading-relaxed">{geocodedDisplayName.split(",").slice(0, 4).join(",")}</p>
                  </div>
                )}
              </div>
            </Field>

            <Field label="シールの名前 *">
              <Input value={post.sealName} onChange={(v) => setPost({ ...post, sealName: v })} placeholder="例：キティちゃん ボンドロ大" />
            </Field>
            <Field label="シリーズ">
              <Select value={post.series} onChange={(v) => setPost({ ...post, series: v })} options={sealSeriesOptions} />
            </Field>
            <Field label="在庫状況">
              <StatusToggle value={post.status} onChange={(v) => setPost({ ...post, status: v })} />
            </Field>
            <Field label="建物内の場所">
              <Input value={post.location} onChange={(v) => setPost({ ...post, location: v })} placeholder="例：2F 文具売場" />
            </Field>
            <div className="grid grid-cols-3 gap-2">
              <Field label="数量">
                <Input type="number" value={post.quantity} onChange={(v) => setPost({ ...post, quantity: v })} placeholder="30" />
              </Field>
              <Field label="1人何個まで">
                <Input type="number" value={post.perPersonLimit} onChange={(v) => setPost({ ...post, perPersonLimit: v })} placeholder="3" />
              </Field>
              <Field label="1種類何個まで">
                <Input type="number" value={post.perTypeLimit} onChange={(v) => setPost({ ...post, perTypeLimit: v })} placeholder="2" />
              </Field>
            </div>
            <Field label="コメント">
              <Input value={post.comment} onChange={(v) => setPost({ ...post, comment: v })} placeholder="例：キティとクロミがありました" />
            </Field>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => { setMode("none"); setPickMode(false); resetLocation(); setLocationQuery(""); }}
                className="flex-1 border border-stone-200 text-stone-500 text-sm font-medium py-2.5 rounded-full hover:bg-stone-50 transition-colors"
              >
                キャンセル
              </button>
              <button onClick={handlePost} disabled={!canPost}
                className={`flex-1 text-sm font-medium py-2.5 rounded-full transition-colors ${canPost ? "bg-stone-900 text-white hover:bg-stone-700" : "bg-stone-100 text-stone-300 cursor-not-allowed"}`}>
                地図に投稿する
              </button>
            </div>
          </div>
        )}

        {/* 修正フォーム */}
        {mode === "edit" && selectedPin && (
          <div className="flex-shrink-0 border-t border-stone-100 bg-white p-5 space-y-3 max-h-[65vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-900 text-sm">「{selectedPin.name}」の情報を修正する</h2>
              <button onClick={() => setMode("none")} className="text-stone-300 hover:text-stone-600 text-xl leading-none">×</button>
            </div>
            {username && <p className="text-xs text-stone-400">@{username} として修正</p>}

            <Field label="シールの名前">
              <Input value={edit.sealName} onChange={(v) => setEdit({ ...edit, sealName: v })} placeholder={selectedPin.sealName} />
            </Field>
            <Field label="シリーズ">
              <Select value={edit.series} onChange={(v) => setEdit({ ...edit, series: v })} options={sealSeriesOptions} />
            </Field>
            <Field label="在庫状況">
              <StatusToggle value={edit.status} onChange={(v) => setEdit({ ...edit, status: v })} />
            </Field>
            <Field label="建物内の場所">
              <Input value={edit.location} onChange={(v) => setEdit({ ...edit, location: v })} placeholder="例：2F 文具売場" />
            </Field>
            <div className="grid grid-cols-3 gap-2">
              <Field label="数量">
                <Input type="number" value={edit.quantity} onChange={(v) => setEdit({ ...edit, quantity: v })} placeholder="30" />
              </Field>
              <Field label="1人何個まで">
                <Input type="number" value={edit.perPersonLimit} onChange={(v) => setEdit({ ...edit, perPersonLimit: v })} placeholder="3" />
              </Field>
              <Field label="1種類何個まで">
                <Input type="number" value={edit.perTypeLimit} onChange={(v) => setEdit({ ...edit, perTypeLimit: v })} placeholder="2" />
              </Field>
            </div>
            <Field label="コメント">
              <Input value={edit.comment} onChange={(v) => setEdit({ ...edit, comment: v })} placeholder="例：ボンドロ大のみ在庫あり" />
            </Field>

            <div className="flex gap-2 pt-1">
              <button onClick={() => setMode("none")} className="flex-1 border border-stone-200 text-stone-500 text-sm font-medium py-2.5 rounded-full hover:bg-stone-50 transition-colors">
                キャンセル
              </button>
              <button onClick={handleEdit}
                className="flex-1 bg-stone-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-stone-700 transition-colors">
                修正を保存する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 小コンポーネント
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-stone-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 text-stone-700 placeholder-stone-300"
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 bg-white text-stone-700">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function StatusToggle({ value, onChange }: { value: StorePin["status"]; onChange: (v: StorePin["status"]) => void }) {
  const options = [
    { value: "in_stock" as const,     label: "在庫あり",   dot: "bg-green-400" },
    { value: "low" as const,          label: "残りわずか", dot: "bg-yellow-400" },
    { value: "out_of_stock" as const, label: "在庫なし",   dot: "bg-stone-300" },
  ];
  return (
    <div className="flex gap-2">
      {options.map((s) => (
        <button key={s.value} onClick={() => onChange(s.value)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs border transition-colors ${
            value === s.value ? "bg-stone-900 text-white border-stone-900" : "text-stone-500 border-stone-200 hover:border-stone-400"
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${value === s.value ? "bg-white" : s.dot}`} />
          {s.label}
        </button>
      ))}
    </div>
  );
}
