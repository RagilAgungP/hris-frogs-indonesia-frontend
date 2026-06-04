"use client";

import { useEffect } from "react";

export function SuccessAlert({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (message) {
      const t = setTimeout(onDismiss, 4000);
      return () => clearTimeout(t);
    }
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
      {message}
    </div>
  );
}
