// TODO: split helpers.ts into proper modules

type Parser<T> = (unit: string) => T;

type KeyAsValueObject<T extends string | symbol | number> = {
    [K in T]: K;
};

function assertIsValidKey<T extends string>(
    key: string,
    enumObject: Readonly<KeyAsValueObject<T>>,
): asserts key is T {
    if (!(key in enumObject)) {
        throw new Error(`Invalid key: ${key}`);
    }
}

type StrictEnum<T> = KeyAsValueObject<keyof T>;

const defaultPrecision = 3;

function unitParser<T extends KeyAsValueObject<keyof T & string>>(
    unitEnum: T,
): Parser<keyof T> {
    return (unit: string): keyof T => {
        const key = unit as keyof T;
        if (key in unitEnum) {
            return key;
        } else {
            throw new Error(`Invalid unit: ${unit}`);
        }
    };
}

export {
    type Parser,
    type KeyAsValueObject,
    type StrictEnum,
    unitParser,
    assertIsValidKey,
    defaultPrecision,
};
