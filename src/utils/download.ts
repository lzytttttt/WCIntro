export function downloadFile(filename: string, content: string, mimeType: string = "text/plain"): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadTxt(filename: string, content: string): void {
  downloadFile(filename, content, "text/plain;charset=utf-8");
}

export function downloadMarkdown(filename: string, content: string): void {
  downloadFile(filename, content, "text/markdown;charset=utf-8");
}
