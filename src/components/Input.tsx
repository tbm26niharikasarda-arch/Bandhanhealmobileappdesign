interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function Input({ label, type = 'text', placeholder, value, onChange, error, required }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[#4A4A4A]">
          {label} {required && <span className="text-[#D88B8B]">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-2xl bg-white border border-[#E6E2DD] focus:border-[#A892C4] focus:outline-none transition-colors"
      />
      {error && <small className="text-[#D88B8B]">{error}</small>}
    </div>
  );
}
