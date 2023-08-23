import React, { ChangeEvent, FormEvent } from 'react';
import { useStep, UseStepResponse } from 'react-hooks-helper';
import BasicInfo from './BasicInfo';
import ExtraInfo from './ExtraInfo';
import { IInputFields } from '../../../interfaces';


const steps = [
    { id: "basicInfo" },
    { id: "extraInfo" }
];



const MultiStepForm = (inputProps: { onSubmit: (event: FormEvent<HTMLButtonElement>) => Promise<void>, onChange: (event: ChangeEvent<HTMLInputElement>) => void, inputFields: IInputFields }) => {
    const { index, navigation }: UseStepResponse = useStep({ initialStep: 0, steps });
    const { onSubmit, onChange, inputFields } = inputProps;
    const props = { navigation, onSubmit, onChange, inputFields };
    switch (index) {
        case 0:
            return <BasicInfo {...props} />;
        case 1:
            return <ExtraInfo {...props} />;
        default:
            return null;
    }
};
export default MultiStepForm; 
