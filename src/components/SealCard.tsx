import { SealPlaceholder } from "@/components/Icons";

type SealCardProps = {
  name: string;
  series: string;
  rate: number;
  price?: number;
  seller?: string;
  type: "sale" | "trade";
};

export default function SealCard({ name, series, rate, price, seller, type }: SealCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      {/* シール画像エリア */}
      <div className="aspect-square overflow-hidden">
        <SealPlaceholder series={series} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
      </div>

      <div className="p-3">
        <p className="font-bold text-gray-800 text-sm leading-tight truncate">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{series}</p>

        <div className="flex items-center gap-1.5 mt-2">
          <span className="bg-pink-50 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-md border border-pink-100">
            R{rate}
          </span>
          {type === "trade" && (
            <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2 py-0.5 rounded-md border border-purple-100">
              交換
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          {price !== undefined ? (
            <p className="text-pink-500 font-bold text-sm">¥{price.toLocaleString()}</p>
          ) : (
            <p className="text-purple-500 font-bold text-sm">交換のみ</p>
          )}
          {seller && (
            <p className="text-xs text-gray-300">@{seller}</p>
          )}
        </div>
      </div>
    </div>
  );
}
