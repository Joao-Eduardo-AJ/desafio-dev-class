import { SelectHTMLAttributes } from "react";

interface IOption {
    Value: number | string;
    Label: string;
}

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
    options: IOption[]
    label: string;
}

export function Select({options, label, ...props}: ISelect) {
    return (
        <label className="flex flex-col text-primaryGray">
            {label}
            <select {...props} className="w-40 outline-none">
                {options.map((opt) => (
                    <option key={opt.Label.toString() + opt.Value.toString()} value={opt.Value}>{opt.Label}</option>
                    ))}
            </select>
        </label>
    )
}