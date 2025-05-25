import {
    type ElectricCurrent,
    ElectricCurrentUnit,
    type Energy,
    EnergyUnit,
    Power,
    PowerUnit,
    type Voltage,
    VoltageUnit,
    type Time,
    TimeUnit,
} from '../Magnitude';

function energyPerTime(energy: Energy, time: Time): Power {
    if (time.value === 0) {
        throw new Error('Time cannot be zero when calculating power.');
    }
    const energyInJoules = energy.convert(EnergyUnit.J).value;
    const timeInSeconds = time.convert(TimeUnit.s).value;

    return new Power({
        value: energyInJoules / timeInSeconds,
        unit: PowerUnit.W,
    });
}

function electricCurrentTimesVoltage(
    current: ElectricCurrent,
    voltage: Voltage,
): Power {
    const currentInAmperes = current.convert(ElectricCurrentUnit.A).value;
    const voltageInVolts = voltage.convert(VoltageUnit.V).value;

    return new Power({
        value: currentInAmperes * voltageInVolts,
        unit: PowerUnit.W,
    });
}

function voltageTimesElectricCurrent(
    voltage: Voltage,
    current: ElectricCurrent,
): Power {
    return electricCurrentTimesVoltage(current, voltage);
}

export {
    energyPerTime,
    electricCurrentTimesVoltage,
    voltageTimesElectricCurrent,
};
