import React from 'react';
import FormInput from '../../form-input';

const ExtraInfo = (props: any) => {
    const { navigation, onChange, inputFields, onSubmit } = props;
    const { role, firstName, lastName, email, enrollmentYear, school, studentEmail } = inputFields;
    const { previous } = navigation;
    let currentYear = new Date().getFullYear();
    const startYears = [];
    for (let i = currentYear; i <= currentYear + 6; i++) {
        startYears.push(String(i));
    }
    return (
        <>
            {role === "Student" &&
                <span>Let us know more about you!</span>
            }
            {role !== "Student" &&
                <span>Please provide the student's information</span>
            }
            <div className="form">
                <FormInput label='Student first name' inputOptions={{ type: 'text', name: 'firstName', value: firstName, onChange: onChange, required: true }} />
                <FormInput label='Student last name' inputOptions={{ type: 'text', name: 'lastName', value: lastName, onChange: onChange, required: true }} />
                {role !== "Student" &&
                    <FormInput label='Student Email' inputOptions={{ type: 'text', name: 'studentEmail', value: studentEmail, onChange: onChange, required: true }} />
                }
                <div className="group">
                    <select name="enrollmentYear" value={enrollmentYear} onChange={onChange} defaultValue="0" className="form-select">
                        <option value="0" disabled>
                            Select the enrollment year
        				</option>
                        {startYears.map((startYear) => {
                            return (
                                <option value={startYear}>{startYear}</option>
                            )
                        })}
                    </select>
                </div>
                <FormInput label='School Name' inputOptions={{ type: 'text', name: 'school', value: school, onChange: onChange, required: true }} />
                <div className='buttons-container'>
                    <button className="button-container" onClick={previous}>Previous</button>
                    <button className="button-container" onClick={onSubmit}>Submit</button>

                </div>
            </div>
        </>
    )
}
export default ExtraInfo; 
