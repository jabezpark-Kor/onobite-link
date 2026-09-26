"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

function getLoginErrorMessage(code: string | undefined) {
  switch (code) {
    case "invalid_credentials":
    case "user_not_found":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "email_not_confirmed":
      return "이메일 인증이 완료되지 않았습니다.";
    case "user_banned":
      return "이용이 제한된 계정입니다.";
    case "over_request_rate_limit":
      return "잠시 후 다시 시도해주세요.";
    default:
      return "로그인에 실패했습니다. 다시 시도해주세요.";
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const canSubmit = Boolean(email.trim() && password && !isSubmitting);

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setToastMessage(getLoginErrorMessage(error.code));
        return;
      }

      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast message={toastMessage} />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center text-xl font-semibold text-[var(--text)]">
          한입 링크
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-[var(--text-sub)]"
            >
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-60"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-[var(--text-sub)]"
            >
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isSubmitting}
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-60"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          disabled={!canSubmit}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
        <p className="text-center text-sm">
          <Link
            href="/forgot-password"
            className="text-[var(--accent)] hover:underline"
          >
            비밀번호 찾기
          </Link>
        </p>
        <p className="text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
}
