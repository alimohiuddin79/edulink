import React from 'react'

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {
  return (
    <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-base
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            transition-colors
            duration-300
            ${disabled && 'opacity-50 cursor-default'}
            ${fullWidth && 'w-full'}
            ${secondary ? 'bg-[#459ED0]/75 hover:bg-[#459ED0]' : 'bg-[#36F8B2]/75'}
            ${danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'}
            ${!secondary && !danger && "bg-[#36F8B2]/75 hover:bg-[#36F8B2] focus-visible:outline-[#36F8B2]"}
        `}
    >
        {children}
    </button>
  )
}

export default Button