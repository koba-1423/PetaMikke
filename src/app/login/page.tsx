"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoIcon } from "@/components/Icons";
import {
  normalizeEmail,
  normalizeUsername,
  readAuthUsers,
  writeAuthSession,
  writeAuthUsers,
} from "@/lib/local-auth";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("メールアドレスとパスワードを入力してください。");
      return;
    }

    if (mode === "signup") {
      const trimmedUsername = username.trim();
      if (!trimmedUsername) {
        setMessage("ユーザー名を入力してください。");
        return;
      }
      if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
        setMessage("ユーザー名は3〜20文字で入力してください。");
        return;
      }
      if (/[\s@#$%^&*()+=\[\]{}<>|\\/"']/.test(trimmedUsername)) {
        setMessage("ユーザー名にスペースや特殊文字は使用できません。");
        return;
      }
      if (password.length < 6) {
        setMessage("パスワードは6文字以上で入力してください。");
        return;
      }

      setLoading(true);
      const users = readAuthUsers();
      const normalizedEmail = normalizeEmail(email);
      const normalizedUserName = normalizeUsername(trimmedUsername);

      if (users.some((user) => user.email === normalizedEmail)) {
        setMessage("このメールアドレスはすでに登録されています。");
        setLoading(false);
        return;
      }
      if (users.some((user) => normalizeUsername(user.username) === normalizedUserName)) {
        setMessage("このユーザー名はすでに使用されています。");
        setLoading(false);
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        email: normalizedEmail,
        password,
        username: trimmedUsername,
        createdAt: new Date().toISOString(),
      };

      writeAuthUsers([newUser, ...users]);
      writeAuthSession({
        userId: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
      router.push("/mypage");
      router.refresh();
      return;
    }

    setLoading(true);
    const users = readAuthUsers();
    const normalizedEmail = normalizeEmail(email);
    const user = users.find((item) => item.email === normalizedEmail);

    if (!user || user.password !== password) {
      setMessage("メールアドレスまたはパスワードが間違っています。");
      setLoading(false);
      return;
    }

    writeAuthSession({
      userId: user.id,
      email: user.email,
      username: user.username,
    });
    router.push("/mypage");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="border-b border-stone-100 bg-white">
        <div className="max-w-5xl mx-auto px-5 py-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <LogoIcon className="w-8 h-8" />
            <span className="text-base font-semibold tracking-tight text-stone-900">PetaMikke</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="bg-white border border-stone-100 rounded-3xl p-8 lg:p-10">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">Welcome Back</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 leading-tight">
              シール好きのための
              <br />
              マーケット＆コミュニティへ。
            </h1>
            <p className="text-stone-500 text-sm leading-relaxed mt-5 max-w-md">
              出品、交換、レート共有、入荷情報まで。PetaMikke の世界観に合わせて、ログイン画面をアプリ本体と同じトーンで戻しています。
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              {[
                { title: "出品", text: "集めたシールをすぐ出品" },
                { title: "交換", text: "欲しいシールをマッチング" },
                { title: "みっけ", text: "入荷情報をコミュニティで共有" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
                  <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-stone-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-7">
              <div className="flex justify-center mb-4">
                <LogoIcon className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-semibold text-stone-900">
                {mode === "login" ? "ログイン" : "新規登録"}
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                {mode === "login" ? "アカウント情報を入力してください" : "メールアドレスで新規登録できます"}
              </p>
            </div>

            <div className="flex rounded-xl bg-stone-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => { setMode("login"); setMessage(""); }}
                className={`flex-1 text-sm py-1.5 rounded-lg font-medium transition-colors ${mode === "login" ? "bg-white text-stone-800 shadow-sm" : "text-stone-400"}`}
              >
                ログイン
              </button>
              <button
                type="button"
                onClick={() => { setMode("signup"); setMessage(""); }}
                className={`flex-1 text-sm py-1.5 rounded-lg font-medium transition-colors ${mode === "signup" ? "bg-white text-stone-800 shadow-sm" : "text-stone-400"}`}
              >
                新規登録
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "signup" && (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ユーザー名"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />

              {message && (
                <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                  <p className="text-xs text-amber-700 leading-relaxed">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 text-white rounded-full py-3 text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
              >
                {loading ? "処理中..." : mode === "login" ? "ログインする" : "新規登録する"}
              </button>
            </form>

            <p className="text-xs text-stone-400 text-center mt-6 leading-relaxed">
              続けることで
              <Link href="/terms" className="underline hover:text-stone-600">
                利用規約
              </Link>
              に同意したものとみなします
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
