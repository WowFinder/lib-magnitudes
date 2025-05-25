import {
    Energy,
    EnergyUnit,
    type Power,
    PowerUnit,
    type Time,
    TimeUnit,
} from '../Magnitude';

function powerTimesTime(power: Power, time: Time): Energy {
    const powerInWatts = power.convert(PowerUnit.W).value;
    const timeInSeconds = time.convert(TimeUnit.s).value;

    return new Energy({
        value: powerInWatts * timeInSeconds,
        unit: EnergyUnit.J,
    });
}

function timeTimesPower(time: Time, power: Power): Energy {
    return powerTimesTime(power, time);
}

export { powerTimesTime, timeTimesPower };
