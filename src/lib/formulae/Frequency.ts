import { Frequency, FrequencyUnit, type Time, TimeUnit } from '../Magnitude';

function frequencyFromTime(time: Time): Frequency {
    if (time.value === 0) {
        throw new Error('Time cannot be zero when calculating frequency.');
    }
    const valueInHz = 1 / time.convert(TimeUnit.s).value;
    return new Frequency({ value: valueInHz, unit: FrequencyUnit.Hz });
}

export { frequencyFromTime };
