"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoIcon } from "@/components/Icons";

export default function SetupUsernamePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = username.trim();
    if (!trimmed) {
      setError("ユーザー名を入力してください");
      return;
    }
    if (trimmed.length < 3 || trimmed.length > 20) {
      setError("3〜20文字で入力してください");
      return;
    }
    if (/[\s@#$%^&*()+=\[\]{}<>|\\/"']/.test(trimmed)) {
      setError("スペースや特殊文字は使用できません");
      return;
    }

    setLoading(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-100 w-full max-w-sm p-8 shadow-sm">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoIcon className="w-12 h-12" />
          </div>
          <h1 className="text-xl font-bold text-stone-900">ユーザー名を決めよう</h1>
          <p className="text-stone-400 text-sm mt-1">後から変更はできません</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="例: sticker_lover"
              maxLength={20}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
            />
            <p className="text-xs text-stone-400 mt-1.5 ml-1">3〜20文字・日本語OK・スペース不可</p>
          </div>

          {error && (
            <p className="text-xs text-rose-500 ml-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-800 text-white rounded-full py-3 text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {loading ? "設定中..." : "決定する"}
          </button>
        </form>
      </div>
    </div>
  );
}
