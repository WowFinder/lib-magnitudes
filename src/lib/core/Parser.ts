import { type StrictEnum } from './StrictEnum';

type Parser<T> = (unit: string) => T;

function unitParser<T extends StrictEnum<T>>(unitEnum: T): Parser<keyof T> {
    return (unit: string): keyof T => {
        const key = unit as keyof T;
        if (key in unitEnum) {
            return key;
        } else {
            throw new Error(`Invalid unit: ${unit}`);
        }
    };
}

export { type Parser, unitParser };
