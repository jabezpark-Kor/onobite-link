"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

function getResetRequestErrorMessage(code: string | undefined) {
  switch (code) {
    case "email_address_invalid":
    case "validation_failed":
      return "이메일 형식이 올바르지 않습니다.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "잠시 후 다시 시도해주세요.";
    default:
      return "이메일 발송에 실패했습니다. 다시 시도해주세요.";
  }
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const canSubmit = Boolean(email.trim() && !isSubmitting);

  const handleSendResetLink = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/reset-password` },
      );

      if (error) {
        setToastMessage(getResetRequestErrorMessage(error.code));
        return;
      }

      setToastMessage("비밀번호 리셋 링크를 이메일로 발송했습니다.");
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
        <div className="flex flex-col gap-2">
          <label
            htmlFor="forgot-password-email"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            이메일
          </label>
          <input
            id="forgot-password-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            disabled={isSubmitting}
            className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-60"
          />
        </div>
        <button
          type="button"
          onClick={handleSendResetLink}
          disabled={!canSubmit}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
        </button>
        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </>
  );
}
