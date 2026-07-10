import { FileText, X } from "lucide-react";

interface MockFileAttachmentProps {
  fileName: string;
  onRemove?: () => void;
}

export function MockFileAttachment({ fileName, onRemove }: MockFileAttachmentProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-200 rounded-lg">
      <FileText className="w-4 h-4 text-cyan-500" />
      <span className="text-xs text-cyan-700">{fileName}</span>
      {onRemove && (
        <button onClick={onRemove} className="p-0.5 hover:bg-cyan-100 rounded">
          <X className="w-3 h-3 text-cyan-400" />
        </button>
      )}
    </div>
  );
}
