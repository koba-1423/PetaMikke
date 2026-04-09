import Navbar from "@/components/Navbar";
import { MapPinIcon, BookIcon } from "@/components/Icons";
import { SealPlaceholder } from "@/components/Icons";

const sealSeries = [
  {
    name: "ボンボンドロップシール",
    shortName: "ボンドロ",
    series: "ボンボンドロップシール",
    description: "立体ぷっくり・光沢感が特徴の超人気シール。1000万枚突破の大ヒット商品。サンリオやたまごっちなど人気キャラが多い。",
    rateMin: 5,
    rateMax: 8,
    availability: "入手困難",
    availabilityStyle: "bg-red-50 text-red-500 border-red-100",
    borderColor: "border-pink-100",
    characters: ["ハローキティ", "クロミ", "ポムポムプリン", "たまごっち", "ちいかわ"],
  },
  {
    name: "うるチュルポップシール",
    shortName: "うるチュル",
    series: "うるチュルポップシール",
    description: "透明感とプルプルとした質感が魅力。ボンドロに次ぐ高レートシール。光の当たり方で見え方が変わる。",
    rateMin: 4,
    rateMax: 4,
    availability: "やや入手困難",
    availabilityStyle: "bg-orange-50 text-orange-500 border-orange-100",
    borderColor: "border-purple-100",
    characters: ["マイメロディ", "シナモロール", "ハローキティ", "ポチャッコ"],
  },
  {
    name: "プチドロップシール",
    shortName: "プチドロ",
    series: "プチドロップシール",
    description: "ボンドロより小ぶりで平成女児キャラが多い。ぷっくり感と光沢でボンドロと同等のレートを誇る。",
    rateMin: 4,
    rateMax: 4,
    availability: "普通",
    availabilityStyle: "bg-green-50 text-green-600 border-green-100",
    borderColor: "border-yellow-100",
    characters: ["リラックマ", "すみっコぐらし", "パンダ"],
  },
  {
    name: "マシュマロシール",
    shortName: "マシュマロ",
    series: "マシュマロシール",
    description: "柔らかいふわふわの手触りが特徴。触り心地の良さで人気。交換の補助シールとして活躍することが多い。",
    rateMin: 3,
    rateMax: 3,
    availability: "比較的入手しやすい",
    availabilityStyle: "bg-green-50 text-green-600 border-green-100",
    borderColor: "border-green-100",
    characters: ["アンパンマン", "ドラえもん", "ピカチュウ"],
  },
  {
    name: "ウォーターシール",
    shortName: "ウォーター",
    series: "ウォーターシール",
    description: "中に水が入っていて動く仕掛けが面白い立体シール。動きがあるため子どもたちに大人気。",
    rateMin: 3,
    rateMax: 3,
    availability: "普通",
    availabilityStyle: "bg-green-50 text-green-600 border-green-100",
    borderColor: "border-blue-100",
    characters: ["魚", "くらげ", "マリン系"],
  },
  {
    name: "タイルシール / ペラシール",
    shortName: "ペラシール",
    series: "タイルシール",
    description: "立体感なしのフラットなシール。デザイン次第で価値が変わる。交換の補助として使われることが多い。",
    rateMin: 1,
    rateMax: 2,
    availability: "入手しやすい",
    availabilityStyle: "bg-gray-50 text-gray-500 border-gray-200",
    borderColor: "border-gray-100",
    characters: ["各種キャラクター"],
  },
];

export default function ZukanPage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-1">
          <BookIcon className="w-6 h-6 text-pink-500" />
          <h1 className="text-2xl font-bold text-gray-800">シール図鑑</h1>
        </div>
        <p className="text-gray-400 text-sm mb-6">人気シールの種類・レート・特徴を確認しよう</p>

        {/* レートの説明 */}
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-6">
          <h2 className="font-bold text-pink-700 mb-2 text-sm">レートとは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            シール交換時の価値の基準です。例えば「ボンドロ大（レート8）」と「ペラシール（レート1）」を交換する場合、ペラシール8枚と交換するのが公平とされています。レートはコミュニティ投票と出品価格をもとに毎週更新されます。
          </p>
        </div>

        {/* シリーズ一覧 */}
        <div className="space-y-3">
          {sealSeries.map((series, i) => (
            <div key={i} className={`bg-white border ${series.borderColor} rounded-2xl p-4 hover:shadow-sm transition-shadow`}>
              <div className="flex items-start gap-4">
                {/* シールプレビュー */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                  <SealPlaceholder series={series.series} className="w-full h-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-gray-800 text-sm">{series.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${series.availabilityStyle}`}>
                      {series.availability}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{series.description}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      レート {series.rateMin === series.rateMax ? series.rateMin : `${series.rateMin}〜${series.rateMax}`}
                    </span>
                    {series.characters.map((char) => (
                      <span key={char} className="text-gray-400 text-xs px-2 py-0.5 rounded-full border border-gray-100 bg-gray-50">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 販売場所マップ */}
        <div id="map" className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="w-5 h-5 text-pink-500" />
            <h2 className="font-bold text-gray-800 text-lg">販売場所マップ</h2>
          </div>
          <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPinIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm font-medium">マップ機能は近日公開予定</p>
              <p className="text-gray-400 text-xs mt-1">Google Maps連携でシール販売店を表示します</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
