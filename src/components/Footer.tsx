import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 mt-16 py-8 px-5 hidden md:block">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-stone-700">PetaMikke</p>
          <p className="text-xs text-stone-400 mt-0.5">シール好きのためのマーケット＆コミュニティ</p>
        </div>
        <nav className="flex gap-5">
          {[
            { label: "利用規約", href: "/terms" },
            { label: "プライバシーポリシー", href: "/terms#privacy" },
            { label: "禁止事項", href: "/terms#prohibited" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="text-xs text-stone-400 hover:text-stone-700 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="max-w-5xl mx-auto mt-6 pt-5 border-t border-stone-50">
        <p className="text-xs text-stone-300 text-center">
          本サービスは個人間取引のプラットフォームです。取引内容・商品の真贋に関する責任は取引当事者間にあります。偽物・コピー品の出品は禁止されています。
        </p>
        <p className="text-xs text-stone-300 text-center mt-1">© 2026 PetaMikke</p>
      </div>
    </footer>
  );
}
