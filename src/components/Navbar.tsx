import Link from "next/link";
import { HomeIcon, ShopIcon, TradeIcon, BookIcon, UserIcon, LogoIcon, PlusIcon, MapPinIcon } from "@/components/Icons";

export default function Navbar() {
  return (
    <>
      <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoIcon className="w-7 h-7" />
            <span className="text-base font-semibold tracking-tight text-stone-900">PetaMikke</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { href: "/", label: "ホーム", icon: <HomeIcon className="w-4 h-4" /> },
              { href: "/market", label: "マーケット", icon: <ShopIcon className="w-4 h-4" /> },
              { href: "/trade", label: "交換", icon: <TradeIcon className="w-4 h-4" /> },
              { href: "/zukan", label: "シール図鑑", icon: <BookIcon className="w-4 h-4" /> },
            { href: "/map", label: "マップ", icon: <MapPinIcon className="w-4 h-4" /> },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/sell"
              className="hidden md:flex items-center gap-1.5 bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 transition-colors"
            >
              <PlusIcon className="w-3.5 h-3.5" />出品する
            </Link>
            <Link href="/mypage" className="p-2 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors">
              <UserIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* スマホ ボトムナビ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 flex justify-around items-center h-14 z-50">
        {[
          { href: "/", label: "ホーム", icon: <HomeIcon className="w-5 h-5" /> },
          { href: "/market", label: "マーケット", icon: <ShopIcon className="w-5 h-5" /> },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 text-stone-400 hover:text-stone-900 transition-colors">
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}

        <Link href="/sell" className="flex flex-col items-center -mt-5">
          <div className="w-11 h-11 bg-stone-900 rounded-full flex items-center justify-center shadow-md">
            <PlusIcon className="w-5 h-5 text-white" />
          </div>
        </Link>

        {[
          { href: "/trade", label: "交換", icon: <TradeIcon className="w-5 h-5" /> },
          { href: "/map", label: "マップ", icon: <MapPinIcon className="w-5 h-5" /> },
          { href: "/mypage", label: "マイページ", icon: <UserIcon className="w-5 h-5" /> },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 text-stone-400 hover:text-stone-900 transition-colors">
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
