import { Vector3D } from '../core';
import {
    Energy,
    EnergyUnit,
    Force,
    ForceUnit,
    Length,
    LengthUnit,
    Position,
    PowerUnit,
    ScalarForce,
    TimeUnit,
    type Time,
    type Power,
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
function forceTimesDistance(force: Force, distance: Length): Energy;
function forceTimesDistance(force: ScalarForce, distance: Position): Energy;
function forceTimesDistance(force: Force, distance: Position): Energy;
function forceTimesDistance(
    force: ScalarForce | Force,
    distance: Length | Position,
): Energy;
function forceTimesDistance(
    force: ScalarForce | Force,
    distance: Length | Position,
): Energy {
    const forceInNewtons = force.convert(ForceUnit.N);
    const distanceInMeters = distance.convert(LengthUnit.m);
    if (
        forceInNewtons instanceof Force &&
        distanceInMeters instanceof Position
    ) {
        return Vector3D.dotProduct<
            typeof ForceUnit,
            typeof LengthUnit,
            typeof EnergyUnit,
            Force,
            Position,
            Energy
        >(
            builder => new Energy(builder),
            EnergyUnit.J,
            forceInNewtons,
            distanceInMeters,
        );
    }
    const forceValue =
        forceInNewtons instanceof ScalarForce
            ? forceInNewtons.value
            : forceInNewtons.magnitude.value;
    const distanceValue =
        distanceInMeters instanceof Length
            ? distanceInMeters.value
            : distanceInMeters.magnitude.value;
    return new Energy({
        value: forceValue * distanceValue,
        unit: EnergyUnit.J,
    });
}

function distanceTimesForce(
    distance: Length | Position,
    force: ScalarForce | Force,
): Energy {
    return forceTimesDistance(force, distance);
}

export {
    powerTimesTime,
    timeTimesPower,
    forceTimesDistance,
    distanceTimesForce,
};
