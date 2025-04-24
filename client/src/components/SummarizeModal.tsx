import { useState } from 'react';
import { summarizeNote } from '@/services/noteService';

interface SummarizeModalProps {
  noteContent: string;
  onClose: () => void;
}

const SummarizeModal: React.FC<SummarizeModalProps> = ({ noteContent, onClose }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await summarizeNote(noteContent);
      setSummary(result);
    } catch (error) {
      console.error('Summarization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white rounded-lg p-6 w-[90%] max-w-md relative shadow-xl">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-semibold mb-4">AI Summarization</h3>
        <p className="mb-2 text-sm text-gray-400">Original Note:</p>
        <div className="p-2 bg-zinc-800 rounded mb-4 text-sm max-h-40 overflow-auto">
          {noteContent}
        </div>

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded w-full mb-4 transition"
        >
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>

        {summary && (
          <>
            <p className="text-sm text-gray-400 mb-2">Summary:</p>
            <div className="p-2 bg-emerald-100 text-zinc-900 rounded text-sm">{summary}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SummarizeModal;
