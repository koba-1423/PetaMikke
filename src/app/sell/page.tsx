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

const conditions = ["未使用", "良好", "傷あり"];
const listingTypes = ["販売のみ", "交換のみ", "両方OK"];

export default function SellPage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">シールを出品する</h1>
        <p className="text-gray-400 text-sm mb-6">シールの情報を入力して出品しよう</p>

        {/* 偽物禁止警告 */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
          <p className="text-sm font-bold text-red-600 mb-1">偽物・コピー品の出品は禁止です</p>
          <p className="text-xs text-red-500 leading-relaxed">
            模倣品・コピー品の出品は商標法・著作権法に違反する場合があります。発見次第、出品削除・アカウント停止の措置を取ります。
            出品するシールが正規品であることを確認してください。
          </p>
        </div>

        <div className="space-y-5">

          {/* 写真アップロード */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-sm font-bold text-gray-700 mb-3">写真</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-pink-100 flex items-center justify-center mb-2 transition-colors">
                <CameraIcon className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-400 group-hover:text-pink-500 transition-colors font-medium">タップして写真を追加</p>
              <p className="text-xs text-gray-300 mt-1">最大5枚まで</p>
            </div>
            <div className="flex gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center cursor-pointer hover:border-pink-200 transition-colors">
                  <PlusIcon className="w-4 h-4 text-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* 基本情報 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-700 text-sm">基本情報</h2>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">シール名</label>
              <input
                type="text"
                placeholder="例：キティちゃん ボンボンドロップシール 大"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">シリーズ</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 bg-white text-gray-700 transition-colors">
                <option value="">選択してください</option>
                {sealSeriesOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">状態</label>
              <div className="grid grid-cols-3 gap-2">
                {conditions.map((cond, i) => (
                  <button
                    key={cond}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      i === 0
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 出品タイプ・価格 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-700 text-sm">出品タイプ・価格</h2>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">出品タイプ</label>
              <div className="grid grid-cols-3 gap-2">
                {listingTypes.map((type, i) => (
                  <button
                    key={type}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      i === 2
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">販売価格（円）</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">¥</span>
                <input
                  type="number"
                  placeholder="300"
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">手数料10%を引いた金額が受け取り額になります</p>
            </div>
          </div>

          {/* 説明 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">説明・コメント</label>
            <textarea
              rows={4}
              placeholder="シールの状態や交換希望の詳細など..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 resize-none transition-colors"
            />
          </div>

          {/* 同意チェック */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-pink-500" />
              <p className="text-xs text-gray-500 leading-relaxed">
                出品するシールが正規品であることを確認しました。
                <a href="/terms" className="text-pink-500 underline">利用規約</a>
                および禁止事項に同意します。偽物・コピー品の出品は禁止されており、違反した場合はアカウントが停止されます。
              </p>
            </label>
          </div>

          {/* 出品ボタン */}
          <button className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-full hover:bg-pink-600 transition-colors text-sm shadow-sm shadow-pink-200">
            出品する
          </button>
        </div>
      </div>
    </div>
  );
}
