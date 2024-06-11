import { FormField } from '../interfaces/form-field-base';

export const HERO_FORM: FormField[] = [
    { label: 'Name', controlName: 'name', type: 'input' },
    { label: 'Fullname', controlName: 'fullname', type: 'input' },
    { label: 'First appearance', controlName: 'firstAppearance', type: 'input' },
    { label: 'Publisher', controlName: 'publisher', type: 'input' },
    { label: 'Work', controlName: 'work', type: 'input' },
    {
        label: 'Image URL',
        controlName: 'imageUrl',
        type: 'input',
        hasIcon: true,
        icon: {
            name: 'shuffle',
            tooltip: 'Get random image',
            clickHandler: 'setRandomImage'
        }
    },
    {
        label: 'Powerstats',
        controlName: 'powerstats',
        type: 'sliderGroup',
        children: [
            { label: 'Combat', controlName: 'combat' },
            { label: 'Intelligence', controlName: 'intelligence' },
            { label: 'Power', controlName: 'power' },
            { label: 'Speed', controlName: 'speed' }
        ]
    }
]