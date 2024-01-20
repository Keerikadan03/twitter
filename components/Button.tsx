import React from "react"

interface ButtonProps{
    label: string
    secondary?: boolean
    fullWidth?: boolean
    large?: boolean
    onClick: ()=> void
    disabled: boolean
    outline: boolean
}

const Button:React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    large,
    onClick,
    disabled,
    outline
}) => {
  return (
    <div>
        <button
            className={
              `disabled:opacity-70
               disabled:cursor-not-allowed
               rounded-full
               font-semibold
               hover:opacity-80
               transition
               border-2
               ${fullWidth?'w-full':'w-fit'}
               ${secondary?'bg-white':'bg-sky-500'}
               ${secondary?'text-black':'text-white'}
               ${secondary?'border-black':'border-sky-500'}
               ${large?'text-xl':'text-md'}
               
              `
            }
        >
            {label}
        </button>
    </div>
  )
}

export default Button