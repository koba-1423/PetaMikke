import Link from "next/link";
import { HomeIcon, ShopIcon, TradeIcon, BookIcon, UserIcon, LogoIcon, PlusIcon } from "@/components/Icons";

export default function Navbar() {
  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon className="w-8 h-8" />
            <span className="text-lg font-bold text-gray-800 tracking-tight">PetaMikke</span>
          </Link>

          {/* PCナビ */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
              <HomeIcon className="w-4 h-4" />ホーム
            </Link>
            <Link href="/market" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
              <ShopIcon className="w-4 h-4" />マーケット
            </Link>
            <Link href="/trade" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
              <TradeIcon className="w-4 h-4" />交換
            </Link>
            <Link href="/zukan" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
              <BookIcon className="w-4 h-4" />シール図鑑
            </Link>
          </nav>

          {/* 右側ボタン */}
          <div className="flex items-center gap-2">
            <Link
              href="/sell"
              className="hidden md:flex items-center gap-1.5 bg-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />出品する
            </Link>
            <Link href="/mypage" className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
              <UserIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* スマホ用ボトムナビ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-14 z-50">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-pink-500">
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">ホーム</span>
        </Link>
        <Link href="/market" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-pink-500 transition-colors">
          <ShopIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">マーケット</span>
        </Link>
        <Link href="/sell" className="flex flex-col items-center -mt-5">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <PlusIcon className="w-6 h-6 text-white" />
          </div>
        </Link>
        <Link href="/trade" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-pink-500 transition-colors">
          <TradeIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">交換</span>
        </Link>
        <Link href="/mypage" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-pink-500 transition-colors">
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">マイページ</span>
        </Link>
      </nav>
    </>
  );
}
