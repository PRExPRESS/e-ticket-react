import { ClipboardIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';


interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false); // Reset after 2 seconds
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
    >
      <ClipboardIcon className="h-4 w-4" />
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
};

export default CopyButton;
