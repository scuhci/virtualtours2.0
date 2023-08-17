import React, { FC, ButtonHTMLAttributes } from "react";

export type ButtonProps = {
    buttonType?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${buttonType === 'google' ? 'google-sign-in' : ''}`} {...otherProps}>
            {children}
        </button>
    )
}
export default Button; 