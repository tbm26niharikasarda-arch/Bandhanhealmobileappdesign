import React from 'react';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

export function Chip({ label, selected = false, onToggle, onRemove, size = 'md' }: ChipProps) {
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
  };

  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 rounded-full border transition-all ${
        selected
          ? 'bg-muted-purple text-white border-muted-purple'
          : 'bg-white text-text-primary border-soft-grey-purple hover:border-muted-purple'
      } ${sizeStyles[size]}`}
    >
      {label}
      {onRemove && (
        <X
          size={16}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </button>
  );
}
