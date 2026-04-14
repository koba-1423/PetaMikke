import Navbar from "@/components/Navbar";
import { MapPinIcon } from "@/components/Icons";
import { SealPlaceholder } from "@/components/Icons";

const sealSeries = [
  {
    name: "ボンボンドロップシール",
    series: "ボンボンドロップシール",
    description: "立体ぷっくり・光沢感が特徴の超人気シール。1000万枚突破の大ヒット商品。",
    rateMin: 5, rateMax: 8,
    availability: "入手困難",
    availabilityDot: "bg-red-300",
    characters: ["ハローキティ", "クロミ", "ポムポムプリン", "たまごっち", "ちいかわ"],
  },
  {
    name: "うるチュルポップシール",
    series: "うるチュルポップシール",
    description: "透明感とプルプルとした質感が魅力。ボンドロに次ぐ高レートシール。",
    rateMin: 4, rateMax: 4,
    availability: "やや入手困難",
    availabilityDot: "bg-yellow-300",
    characters: ["マイメロディ", "シナモロール", "ハローキティ"],
  },
  {
    name: "プチドロップシール",
    series: "プチドロップシール",
    description: "ボンドロより小ぶりで平成女児キャラが多い。ボンドロと同等のレートを誇る。",
    rateMin: 4, rateMax: 4,
    availability: "普通",
    availabilityDot: "bg-green-300",
    characters: ["リラックマ", "すみっコぐらし"],
  },
  {
    name: "マシュマロシール",
    series: "マシュマロシール",
    description: "柔らかいふわふわの手触りが特徴。交換の補助シールとして活躍する。",
    rateMin: 3, rateMax: 3,
    availability: "入手しやすい",
    availabilityDot: "bg-green-300",
    characters: ["アンパンマン", "ドラえもん"],
  },
  {
    name: "ウォーターシール",
    series: "ウォーターシール",
    description: "中に水が入っていて動く仕掛けが面白い立体シール。",
    rateMin: 3, rateMax: 3,
    availability: "普通",
    availabilityDot: "bg-green-300",
    characters: ["魚", "くらげ"],
  },
  {
    name: "タイルシール / ペラシール",
    series: "タイルシール",
    description: "立体感なしのフラットなシール。デザイン次第で価値が変わる。",
    rateMin: 1, rateMax: 2,
    availability: "入手しやすい",
    availabilityDot: "bg-stone-300",
    characters: ["各種キャラクター"],
  },
];

export default function ZukanPage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 py-8">
        <h1 className="text-xl font-semibold text-stone-900 mb-1">シール図鑑</h1>
        <p className="text-stone-400 text-sm mb-6">人気シールの種類・レート・特徴を確認しよう</p>

        {/* レートの説明 */}
        <div className="border border-stone-100 rounded-xl p-4 mb-6 bg-stone-50">
          <p className="text-xs font-semibold text-stone-600 mb-1">レートとは？</p>
          <p className="text-xs text-stone-500 leading-relaxed">
            シール交換時の価値の基準です。例えば「ボンドロ大（R8）」と「ペラシール（R1）」の交換ではペラシール8枚が公平とされています。コミュニティ投票と出品価格をもとに毎週更新されます。
          </p>
        </div>

        {/* シリーズ一覧 */}
        <div className="space-y-2">
          {sealSeries.map((series, i) => (
            <div key={i} className="bg-white border border-stone-100 rounded-xl p-4 hover:border-stone-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                  <SealPlaceholder series={series.series} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-stone-900 text-sm">{series.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${series.availabilityDot}`} />
                      <span className="text-xs text-stone-400">{series.availability}</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed mb-2">{series.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-stone-500 border border-stone-200 px-2 py-0.5 rounded">
                      R{series.rateMin === series.rateMax ? series.rateMin : `${series.rateMin}〜${series.rateMax}`}
                    </span>
                    {series.characters.map((char) => (
                      <span key={char} className="text-xs text-stone-400">{char}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* マップ */}
        <div id="map" className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="w-4 h-4 text-stone-400" />
            <h2 className="font-semibold text-stone-900">販売場所マップ</h2>
          </div>
          <div className="border border-stone-100 rounded-xl h-56 flex items-center justify-center bg-stone-50">
            <div className="text-center">
              <div className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPinIcon className="w-5 h-5 text-stone-300" />
              </div>
              <p className="text-sm text-stone-400">マップ機能は近日公開予定</p>
              <p className="text-xs text-stone-300 mt-1">Google Maps連携でシール販売店を表示します</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
