import Navbar from "@/components/Navbar";
import { CameraIcon, PlusIcon } from "@/components/Icons";

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
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-lg mx-auto px-5 py-8">
        <h1 className="text-xl font-semibold text-stone-900 mb-1">シールを出品する</h1>
        <p className="text-stone-400 text-sm mb-6">シールの情報を入力して出品しよう</p>

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
            <div className="border-2 border-dashed border-stone-200 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-colors group">
              <div className="w-9 h-9 border border-stone-200 rounded-full flex items-center justify-center mb-2 group-hover:border-stone-400 transition-colors">
                <CameraIcon className="w-4 h-4 text-stone-400" />
              </div>
              <p className="text-xs text-stone-400">タップして写真を追加</p>
              <p className="text-xs text-stone-300 mt-0.5">最大5枚</p>
            </div>
            <div className="flex gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border border-dashed border-stone-200 flex items-center justify-center cursor-pointer hover:border-stone-400 transition-colors">
                  <PlusIcon className="w-3.5 h-3.5 text-stone-300" />
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
                placeholder="例：キティちゃん ボンボンドロップシール 大"
                className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 text-stone-700 placeholder-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1.5">シリーズ</label>
              <select className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 bg-white text-stone-700">
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
                    className={`py-2 rounded-lg text-sm border transition-colors ${
                      i === 0
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
                    className={`py-2 rounded-lg text-sm border transition-colors ${
                      i === 2
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
                  placeholder="300"
                  className="w-full border border-stone-200 rounded-lg pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 text-stone-700"
                />
              </div>
              <p className="text-xs text-stone-400 mt-1.5">手数料10%を引いた金額が受け取り額になります</p>
            </div>
          </div>

          {/* 説明 */}
          <div className="border border-stone-100 rounded-xl p-5">
            <label className="block text-xs text-stone-400 mb-1.5">説明・コメント</label>
            <textarea
              rows={4}
              placeholder="シールの状態や交換希望の詳細など..."
              className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-stone-400 resize-none text-stone-700 placeholder-stone-300"
            />
          </div>

          {/* 同意 */}
          <div className="border border-stone-100 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-0.5" />
              <p className="text-xs text-stone-400 leading-relaxed">
                出品するシールが正規品であることを確認しました。
                <a href="/terms" className="text-stone-600 underline">利用規約</a>
                および禁止事項に同意します。
              </p>
            </label>
          </div>

          {/* ボタン */}
          <button className="w-full bg-stone-900 text-white font-medium py-3.5 rounded-full hover:bg-stone-700 transition-colors text-sm">
            出品する
          </button>
        </div>
      </div>
    </div>
  );
}
