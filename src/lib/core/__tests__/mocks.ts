const lengthUnitsEnum = {
    m: 'm',
    ft: 'ft',
    inch: 'inch',
} as const;

const invalidUnitsEnum = {
    m: 'm',
    ft: "'",
} as const;

export { lengthUnitsEnum, invalidUnitsEnum };
