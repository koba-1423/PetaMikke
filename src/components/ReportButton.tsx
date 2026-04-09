"use client";

import { useState } from "react";

type ReportButtonProps = {
  targetType: "出品" | "投稿" | "交換リクエスト" | "ユーザー";
  targetId?: string;
};

const reasons = [
  "偽物・コピー品の疑いがある",
  "著作権・商標権の侵害",
  "虚偽の商品情報",
  "不適切なコンテンツ",
  "嫌がらせ・誹謗中傷",
  "未成年への不適切な勧誘",
  "その他",
];

export default function ReportButton({ targetType }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    // 実際の実装ではAPIに送信する
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setSelected("");
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-gray-300 hover:text-red-400 transition-colors"
      >
        通報
      </button>

      {/* モーダル */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-bold text-gray-800">通報を受け付けました</p>
                <p className="text-xs text-gray-400 mt-1">確認後、適切に対応いたします</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">{targetType}を通報する</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    閉じる
                  </button>
                </div>

                <p className="text-xs text-gray-500 mb-3">通報理由を選択してください</p>

                <div className="space-y-2 mb-4">
                  {reasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelected(reason)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm border transition-colors ${
                        selected === reason
                          ? "bg-red-50 border-red-200 text-red-600 font-medium"
                          : "border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    虚偽の通報はアカウント停止の対象となる場合があります。偽物シールの疑いがある場合は優先的に調査いたします。
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selected}
                  className={`w-full py-2.5 rounded-full text-sm font-bold transition-colors ${
                    selected
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  通報する
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
