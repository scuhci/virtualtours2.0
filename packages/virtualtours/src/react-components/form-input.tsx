import React from "react";

const FormInput = (props: any) => {
    const { label, inputOptions } = props;
    return (
        <div className="group">
            <input className="form-input" {...inputOptions} required />
            {label && (
                <label className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    )
}
export default FormInput;