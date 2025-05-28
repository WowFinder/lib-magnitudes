import {
    Energy,
    EnergyUnit,
    ForceUnit,
    type Length,
    LengthUnit,
    type Power,
    PowerUnit,
    type ScalarForce,
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

function forceTimesDistance(force: ScalarForce, distance: Length): Energy;
// TODO (Requires dot-product for vectors):
// function forceTimesDistance(force: Force, distance: Position): Energy;
// Combinations ScalarForce x Position and Force x Length;
function forceTimesDistance(force: ScalarForce, distance: Length): Energy {
    const forceInNewtons = force.convert(ForceUnit.N).value;
    const distanceInMeters = distance.convert(LengthUnit.m).value;

    return new Energy({
        value: forceInNewtons * distanceInMeters,
        unit: EnergyUnit.J,
    });
}
function distanceTimesForce(distance: Length, force: ScalarForce): Energy;
function distanceTimesForce(distance: Length, force: ScalarForce): Energy {
    return forceTimesDistance(force, distance);
}

export {
    powerTimesTime,
    timeTimesPower,
    forceTimesDistance,
    distanceTimesForce,
};
