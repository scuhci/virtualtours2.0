import React, { FC, ChangeEvent } from "react";

export type inputProps = {
    label: string,
    inputOptions: {
        type: string,
        name: string,
        value: string,
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
        required: boolean
    }
}

const FormInput: FC<inputProps> = ({ label, inputOptions }) => {
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