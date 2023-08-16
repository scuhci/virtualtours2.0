import React from 'react';
import FormInput from '../../form-input';

const BasicInfo = (props: any) => {
    const { navigation, onChange, inputFields } = props;
    const { displayName, email, password, confirmPassword } = inputFields;
    const { next } = navigation;
    return (
        <>
            <span>Please provide your name and email for signing up</span>
            <div className="form">
                <div className="group">
                    <select name="role" value={inputFields.role} onChange={onChange} defaultValue="default" className="form-select">
                        <option value="default" disabled>
                            Select your role
        				</option>
                        <option value="Parent">Parent</option>
                        <option value="Student">Student</option>
                        <option value="Educator">Educator</option>
                    </select>
                </div>
                <FormInput label='Display Name' inputOptions={{ type: 'text', name: 'displayName', value: displayName, onChange: onChange, required: true }} />
                <FormInput label='Email' inputOptions={{ type: 'text', name: 'email', value: email, onChange: onChange, required: true }} />
                <FormInput label='Password' inputOptions={{ type: 'password', name: 'password', value: password, onChange: onChange, required: true }} />
                <FormInput label='Confirm Password' inputOptions={{ type: 'password', name: 'confirmPassword', value: confirmPassword, onChange: onChange, required: true }} />
                <div>
                    <button className="button-container" onClick={next}>Next</button>
                </div>
            </div>
        </>
    )
}
export default BasicInfo; 
