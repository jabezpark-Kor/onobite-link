import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--bg)] px-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center text-xl font-semibold text-[var(--text)]">
          한입 링크
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-[var(--text-sub)]"
            >
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-[var(--text-sub)]"
            >
              비밀번호
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-password-confirm"
              className="text-sm font-medium text-[var(--text-sub)]"
            >
              비밀번호 확인
            </label>
            <input
              id="signup-password-confirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>
        </div>
        <button
          type="button"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
        >
          회원가입
        </button>
        <p className="text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
