import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 py-8 px-4 md:block hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-700 text-sm">PetaMikke</p>
            <p className="text-xs text-gray-400 mt-0.5">シール好きのためのマーケット＆コミュニティ</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">
              利用規約
            </Link>
            <Link href="/terms#privacy" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/terms#prohibited" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">
              禁止事項
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-50">
          <p className="text-xs text-gray-300 text-center">
            本サービスは個人間取引のプラットフォームです。取引内容・商品の真贋に関する責任は取引当事者間にあります。
            偽物・コピー品の出品は禁止されています。
          </p>
          <p className="text-xs text-gray-300 text-center mt-1">© 2026 PetaMikke</p>
        </div>
      </div>
    </footer>
  );
}
