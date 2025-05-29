import { Vector3D } from '../core';
import {
    Energy,
    EnergyUnit,
    type Force,
    ForceUnit,
    Length,
    LengthUnit,
    type Position,
    type Power,
    PowerUnit,
    ScalarForce,
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
    if (forceInNewtons instanceof ScalarForce) {
        if (distanceInMeters instanceof Length) {
            return new Energy({
                value: forceInNewtons.value * distanceInMeters.value,
                unit: EnergyUnit.J,
            });
        } else {
            return new Energy({
                value: forceInNewtons.value * distanceInMeters.magnitude.value,
                unit: EnergyUnit.J,
            });
        }
    } else {
        if (distanceInMeters instanceof Length) {
            return new Energy({
                value: forceInNewtons.magnitude.value * distanceInMeters.value,
                unit: EnergyUnit.J,
            });
        } else {
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
    }
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
