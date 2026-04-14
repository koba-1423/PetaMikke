"use client";

import { useState, useEffect } from "react";

export default function AgeVerificationModal() {
  const [show, setShow] = useState(false);
  const [isMinor, setIsMinor] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified");
    if (!verified) setShow(true);
  }, []);

  const handleAdult = () => {
    localStorage.setItem("age_verified", "adult");
    setShow(false);
  };

  const handleMinorConfirm = () => {
    localStorage.setItem("age_verified", "minor");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-7 shadow-xl">
        <div className="mb-6">
          <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center mb-4">
            <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
              <circle cx="16" cy="13" r="5" fill="white" opacity="0.2" />
              <circle cx="16" cy="13" r="3" fill="white" opacity="0.9" />
              <rect x="11" y="20" width="10" height="1.5" rx="0.75" fill="white" opacity="0.5" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-stone-900">PetaMikkeへようこそ</h2>
          <p className="text-stone-400 text-sm mt-1">ご利用前に確認事項があります</p>
        </div>

        {!isMinor ? (
          <>
            <div className="bg-stone-50 rounded-xl p-3.5 mb-5">
              <p className="text-xs text-stone-500 leading-relaxed">
                本サービスは個人間のシール売買・交換プラットフォームです。
                <a href="/terms" className="text-stone-700 underline">利用規約</a>
                への同意が必要です。
              </p>
            </div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">年齢を確認してください</p>
            <div className="space-y-2">
              <button
                onClick={handleAdult}
                className="w-full bg-stone-900 text-white font-medium py-3 rounded-full hover:bg-stone-700 transition-colors text-sm"
              >
                18歳以上・利用規約に同意する
              </button>
              <button
                onClick={() => setIsMinor(true)}
                className="w-full border border-stone-200 text-stone-600 font-medium py-3 rounded-full hover:bg-stone-50 transition-colors text-sm"
              >
                18歳未満
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="border border-yellow-100 bg-yellow-50 rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-yellow-700 mb-1.5">保護者の方へ</p>
              <p className="text-xs text-yellow-600 leading-relaxed">
                本サービスには金銭を伴う取引機能が含まれます。18歳未満の方がご利用の際は、保護者の同意・管理のもとでご使用ください。
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleMinorConfirm}
                className="w-full bg-stone-900 text-white font-medium py-3 rounded-full hover:bg-stone-700 transition-colors text-sm"
              >
                保護者の同意のもと利用する
              </button>
              <button
                onClick={() => setIsMinor(false)}
                className="w-full text-stone-400 text-sm py-2"
              >
                戻る
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
