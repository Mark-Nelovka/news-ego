interface IValidation {
    name: string,
    value: string,
    handleError: (name: string) => void
}

export default function validation({ name, value, handleError }: IValidation) {
switch (name) {
    case "name":
        if (/^[a-zA-Z]*$/.test(value)) {
            return value
        }
        handleError(name)
        break;
    case "password":
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            return value;
        }
        handleError(name)
        break;
    default:
        return "";
}
}
