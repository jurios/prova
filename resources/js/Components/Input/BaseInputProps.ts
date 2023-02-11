export interface BaseInputProps<T = string> {
    value?: T,
    onChange?: (value?: T) => void;
}
