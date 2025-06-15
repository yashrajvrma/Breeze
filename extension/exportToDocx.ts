import { useMutation } from "@tanstack/react-query";

type ExportDocxInput = {
  htmlContent: string;
  title: string;
  leftMargin: number;
  rightMargin: number;
};

export function useExportDocx() {
  return useMutation({
    mutationFn: async ({
      htmlContent,
      title,
      leftMargin,
      rightMargin,
    }: ExportDocxInput) => {
      const res = await fetch("/api/v1/export-docx", {
        method: "POST",
        body: JSON.stringify({ htmlContent, leftMargin, rightMargin }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to export DOCX");
      const blob = await res.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.docx`;
      link.click();
      URL.revokeObjectURL(url);
    },
  });
}
