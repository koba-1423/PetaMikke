"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogoIcon } from "@/components/Icons";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function LineIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#06C755">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );
}

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signInWithLine = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "custom:line" as never,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message === "User already registered" ? "このメールアドレスはすでに登録されています" : "エラーが発生しました");
      } else {
        setDone(true);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("メールアドレスまたはパスワードが間違っています");
      } else {
        router.push("/");
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-100 w-full max-w-sm p-8 shadow-sm">

        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoIcon className="w-12 h-12" />
          </div>
          <h1 className="text-xl font-bold text-stone-900">PetaMikke</h1>
          <p className="text-stone-400 text-sm mt-1">シール好きのためのコミュニティ</p>
        </div>

        {done ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-stone-700 font-medium">確認メールを送信しました</p>
            <p className="text-xs text-stone-400 leading-relaxed">
              {email} に届いたメールのリンクをクリックして登録を完了してください
            </p>
            <button
              onClick={() => { setDone(false); setMode("login"); }}
              className="text-xs text-stone-500 underline mt-2"
            >
              ログイン画面に戻る
            </button>
          </div>
        ) : (
          <>
            {/* ソーシャルログイン */}
            <div className="space-y-3">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center gap-3 border border-stone-200 rounded-full px-5 py-3 hover:bg-stone-50 transition-colors"
              >
                <GoogleIcon />
                <span className="text-sm font-medium text-stone-700 flex-1 text-left">Googleで続ける</span>
              </button>
              <button
                onClick={signInWithLine}
                className="w-full flex items-center gap-3 border border-stone-200 rounded-full px-5 py-3 hover:bg-stone-50 transition-colors"
              >
                <LineIcon />
                <span className="text-sm font-medium text-stone-700 flex-1 text-left">LINEで続ける</span>
              </button>
            </div>

            {/* 区切り */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-stone-100" />
              <span className="text-xs text-stone-300">または</span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>

            {/* ログイン / 新規登録 タブ */}
            <div className="flex rounded-xl bg-stone-100 p-1 mb-5">
              <button
                onClick={() => { setMode("login"); setError(""); }}
                className={`flex-1 text-sm py-1.5 rounded-lg font-medium transition-colors ${mode === "login" ? "bg-white text-stone-800 shadow-sm" : "text-stone-400"}`}
              >
                ログイン
              </button>
              <button
                onClick={() => { setMode("signup"); setError(""); }}
                className={`flex-1 text-sm py-1.5 rounded-lg font-medium transition-colors ${mode === "signup" ? "bg-white text-stone-800 shadow-sm" : "text-stone-400"}`}
              >
                新規登録
              </button>
            </div>

            {/* メール・パスワードフォーム */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                required
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード（6文字以上）"
                required
                minLength={6}
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />

              {error && <p className="text-xs text-rose-500 ml-1">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-800 text-white rounded-full py-3 text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
              >
                {loading ? "処理中..." : mode === "login" ? "ログイン" : "アカウントを作成"}
              </button>
            </form>
          </>
        )}

        <p className="text-xs text-stone-400 text-center mt-6 leading-relaxed">
          続けることで
          <a href="/terms" className="underline hover:text-stone-600">利用規約</a>
          に同意したものとみなします
        </p>
      </div>
    </div>
  );
}
