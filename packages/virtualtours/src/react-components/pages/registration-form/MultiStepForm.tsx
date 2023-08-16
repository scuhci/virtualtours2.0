import React from 'react';
import { useStep } from 'react-hooks-helper';
import BasicInfo from './BasicInfo';
import ExtraInfo from './ExtraInfo';


const steps = [
    { id: "basicInfo" },
    { id: "extraInfo" }
];

interface useStepType {
    step: any,
    navigation: any,
}
interface IInputFields {
    firstName: string,
    lastName: string,
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    enrollmentYear: string,
    school: string
}
const MultiStepForm = (inputProps: { onSubmit: (event: any) => Promise<void>, onChange: (event: any) => void, inputFields: IInputFields }) => {
    const { step, navigation }: useStepType = useStep({ initialStep: 0, steps });
    let { id } = step;
    const { onSubmit, onChange, inputFields } = inputProps;
    const props = { navigation, onSubmit, onChange, inputFields };
    switch (id) {
        case 'basicInfo':
            return <BasicInfo {...props} />;
        case 'extraInfo':
            return <ExtraInfo {...props} />;
        default:
            return null;
    }
};
export default MultiStepForm; 
