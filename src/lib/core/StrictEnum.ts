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

export { type KeyAsValueObject, type StrictEnum, assertIsValidKey };
