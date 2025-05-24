import {
    type Conversion,
    type ConversionFactors,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';

const TimeUnit = {
    s: 's',
    m: 'm', // ⚠️ may conflict with 'm' (milli-) prefix
    h: 'h', // ⚠️ may conflict with 'h' prefix. ⚠️ May be confused with 'H' (Henry, inductance) unit
    d: 'd', // ⚠️ may conflict with 'd' prefix
} as const;
Object.freeze(TimeUnit);

const timeConversionFactors: ConversionFactors<typeof TimeUnit> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
} as const;
Object.freeze(timeConversionFactors);

class Time extends Scalar<typeof TimeUnit> {
    static #converter: Conversion<typeof TimeUnit, Time>;
    constructor({ value, unit }: ScalarBuilder<typeof TimeUnit>) {
        super({ value, unit });
    }

    static {
        Time.#converter = makeConversions<typeof TimeUnit, Time>(
            timeConversionFactors,
            ({ value, unit }) => new Time({ value, unit }),
        );
    }

    convert(unit: keyof typeof TimeUnit): Time {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Time.#converter(this, unit);
    }
}

export { TimeUnit, timeConversionFactors, Time };
