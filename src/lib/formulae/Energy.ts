import { Vector3D } from '../core';
import {
    Energy,
    EnergyUnit,
    Force,
    ForceUnit,
    type Length,
    LengthUnit,
    Position,
    PowerUnit,
    type ScalarForce,
    TimeUnit,
    type Time,
    type Power,
    VoltageUnit,
    CapacitanceUnit,
    type Capacitance,
    type Voltage,
    type Mass,
    MassUnit,
    type Velocity,
    SpeedUnit,
    type Speed,
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
    return new Energy({
        value: forceInNewtons.value * distanceInMeters.value,
        unit: EnergyUnit.J,
    });
}

function distanceTimesForce(
    distance: Length | Position,
    force: ScalarForce | Force,
): Energy {
    return forceTimesDistance(force, distance);
}

function kineticEnergy(mass: Mass, velocity: Velocity | Speed): Energy {
    const massInKg = mass.convert(MassUnit.g).value / 1000;
    const velocityInMps = velocity.convert(SpeedUnit['m/s']).value;
    return new Energy({
        value: 0.5 * massInKg * velocityInMps * velocityInMps,
        unit: EnergyUnit.J,
    });
}

function capacitorEnergy(capacitance: Capacitance, voltage: Voltage): Energy {
    const capacitanceInFarads = capacitance.convert(CapacitanceUnit.F).value;
    const voltageInVolts = voltage.convert(VoltageUnit.V).value;
    return new Energy({
        value: 0.5 * capacitanceInFarads * voltageInVolts * voltageInVolts,
        unit: EnergyUnit.J,
    });
}

export {
    powerTimesTime,
    timeTimesPower,
    forceTimesDistance,
    distanceTimesForce,
    kineticEnergy,
    capacitorEnergy,
};
