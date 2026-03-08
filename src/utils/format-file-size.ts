export function formatFileSize(bytes: number): string {
  if (bytes < 0) {
    throw new Error("Tamanho em bytes não pose ser negativo");
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
}
