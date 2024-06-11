interface FormFieldBase {
    label: string;
    controlName: string;
    type: string;
}

interface InputField extends FormFieldBase {
    type: 'input';
    hasIcon?: boolean;
    icon?: {
        name: string;
        tooltip: string;
        clickHandler: string;
    };
}

interface SliderFieldGroup extends FormFieldBase {
    type: 'sliderGroup';
    children: {
        label: string;
        controlName: string;
    }[];
}

export type FormField = InputField | SliderFieldGroup;
