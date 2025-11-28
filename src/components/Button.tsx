interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function Button({ children, onClick, variant = 'primary', disabled, type = 'button', fullWidth }: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#A892C4] text-white hover:bg-[#8B7AA8] active:scale-95',
    secondary: 'bg-[#E6E2DD] text-[#3A3A3A] hover:bg-[#CFC9D9] active:scale-95',
    ghost: 'bg-transparent text-[#8B7AA8] hover:bg-[#F4EFEA] active:scale-95'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
}
