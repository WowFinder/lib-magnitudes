import { type Frequency, FrequencyUnit, Time, TimeUnit } from '../Magnitude';

function periodFromFrequency(frequency: Frequency): Time {
    if (frequency.value === 0) {
        throw new Error('Frequency cannot be zero when calculating period.');
    }
    const valueInSeconds = 1 / frequency.convert(FrequencyUnit.Hz).value;
    return new Time({ value: valueInSeconds, unit: TimeUnit.s });
}

export { periodFromFrequency };
