import React from "react";


const Button = (props: any) => {
    const { children, buttonType, ...otherProps } = props;
    return (
        <button className={`button-container ${buttonType === 'google' ? 'google-sign-in' : ''}`} {...otherProps}>
            {children}
        </button>
    )
}
export default Button; 