"use client";

type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 z-30 -translate-x-1/2 rounded-md border border-[var(--error)] bg-[var(--card-bg)] px-4 py-2 text-sm font-medium text-[var(--error)]">
      {message}
    </div>
  );
}
