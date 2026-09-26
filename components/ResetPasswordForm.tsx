"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

function getResetPasswordErrorMessage(code: string | undefined) {
  switch (code) {
    case "weak_password":
      return "비밀번호가 너무 약합니다. 더 안전한 비밀번호를 입력해주세요.";
    case "same_password":
      return "이전과 동일한 비밀번호로는 변경할 수 없습니다.";
    case "session_not_found":
    case "user_not_found":
      return "링크가 만료되었습니다. 비밀번호 찾기를 다시 시도해주세요.";
    default:
      return "비밀번호 재설정에 실패했습니다. 다시 시도해주세요.";
  }
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const canSubmit = Boolean(password && !isSubmitting);

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setToastMessage(getResetPasswordErrorMessage(error.code));
        return;
      }

      router.push("/login");
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
            htmlFor="reset-password-new"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            새 비밀번호
          </label>
          <input
            id="reset-password-new"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="새 비밀번호를 입력하세요"
            disabled={isSubmitting}
            className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-60"
          />
        </div>
        <button
          type="button"
          onClick={handleResetPassword}
          disabled={!canSubmit}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "재설정 중..." : "비밀번호 재설정"}
        </button>
      </div>
    </>
  );
}
