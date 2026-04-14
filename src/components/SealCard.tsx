import { SealPlaceholder } from "@/components/Icons";
import ReportButton from "@/components/ReportButton";

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
    <div className="bg-white border border-stone-100 rounded-xl overflow-hidden hover:border-stone-200 hover:shadow-sm transition-all cursor-pointer group">
      <div className="aspect-square overflow-hidden bg-stone-50">
        <SealPlaceholder series={series} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="p-3">
        <p className="font-medium text-stone-900 text-sm leading-snug truncate">{name}</p>
        <p className="text-xs text-stone-400 mt-0.5 truncate">{series}</p>

        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="text-xs text-stone-500 border border-stone-200 px-1.5 py-0.5 rounded">
            R{rate}
          </span>
          {type === "trade" && (
            <span className="text-xs text-stone-400 border border-stone-100 px-1.5 py-0.5 rounded bg-stone-50">
              交換
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          {price !== undefined ? (
            <p className="text-stone-900 font-semibold text-sm">¥{price.toLocaleString()}</p>
          ) : (
            <p className="text-stone-400 text-sm">交換のみ</p>
          )}
          <ReportButton targetType="出品" />
        </div>
      </div>
    </div>
  );
}
