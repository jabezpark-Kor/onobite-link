"use client";

type ConfirmDeleteLinkModalProps = {
  linkTitle: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteLinkModal({
  linkTitle,
  onCancel,
  onConfirm,
}: ConfirmDeleteLinkModalProps) {
  if (!linkTitle) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          링크를 삭제할까요?
        </h2>
        <p className="text-sm text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{linkTitle}</span>{" "}
          링크를 삭제하면 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--error-hover)]"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
