"use client";

import { useState, useEffect } from "react";

export default function AgeVerificationModal() {
  const [show, setShow] = useState(false);
  const [isMinor, setIsMinor] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified");
    if (!verified) {
      setShow(true);
    }
  }, []);

  const handleAdult = () => {
    localStorage.setItem("age_verified", "adult");
    setShow(false);
  };

  const handleMinor = () => {
    setIsMinor(true);
  };

  const handleMinorConfirm = () => {
    localStorage.setItem("age_verified", "minor");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        {/* ロゴ */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="13" r="6" fill="white" opacity="0.9" />
              <circle cx="16" cy="13" r="3.5" fill="#ec4899" />
              <rect x="10" y="21" width="12" height="2.5" rx="1.25" fill="white" opacity="0.8" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">PetaMikkeへようこそ</h2>
          <p className="text-gray-400 text-sm mt-1">シール好きのためのコミュニティ</p>
        </div>

        {!isMinor ? (
          <>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-600 leading-relaxed text-center">
                本サービスは個人間のシール売買・交換プラットフォームです。ご利用には
                <a href="/terms" className="text-pink-500 underline">利用規約</a>
                への同意が必要です。
              </p>
            </div>

            <p className="text-sm font-bold text-gray-700 text-center mb-3">年齢を確認してください</p>

            <div className="space-y-2">
              <button
                onClick={handleAdult}
                className="w-full bg-pink-500 text-white font-bold py-3 rounded-full hover:bg-pink-600 transition-colors text-sm"
              >
                18歳以上です・利用規約に同意する
              </button>
              <button
                onClick={handleMinor}
                className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                18歳未満です
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-5">
              <p className="text-sm font-bold text-yellow-700 mb-2">保護者の方へ</p>
              <p className="text-xs text-yellow-600 leading-relaxed">
                本サービスには金銭を伴う取引機能が含まれます。18歳未満の方がご利用の際は、保護者の同意・管理のもとでご使用ください。投稿の閲覧・シール図鑑は無料でご利用いただけます。
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleMinorConfirm}
                className="w-full bg-pink-500 text-white font-bold py-3 rounded-full hover:bg-pink-600 transition-colors text-sm"
              >
                保護者の同意のもと利用する
              </button>
              <button
                onClick={() => setIsMinor(false)}
                className="w-full text-gray-400 text-sm py-2"
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
