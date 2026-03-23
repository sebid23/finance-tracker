import { X, Trash2 } from "lucide-react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({ isOpen, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg border border-cyan-900/50 bg-cyan-950 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                Delete transaction
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <X size={18}/>
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-400">
                Are you sure you want to delete this transaction?
            </p>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={onConfirm}
                    className="flex items-center gap-1 rounded-lg border border-cyan-900 bg-cyan-900/40 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-900/20 transition cursor-pointer"
                >
                    <Trash2 size={16}/>Delete
                </button>
            </div>
          </div>
        </div>
    );
}