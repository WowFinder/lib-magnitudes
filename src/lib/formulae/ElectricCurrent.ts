import {
    type ElectricCharge,
    ElectricChargeUnit,
    ElectricCurrent,
    ElectricCurrentUnit,
    type Power,
    PowerUnit,
    type Voltage,
    VoltageUnit,
    type Time,
    TimeUnit,
} from '../Magnitude';

function electricChargePerTime(
    charge: ElectricCharge,
    time: Time,
): ElectricCurrent {
    if (time.value === 0) {
        throw new Error(
            'Time cannot be zero when calculating electric current.',
        );
    }
    const timeInSeconds = time.convert(TimeUnit.s).value;
    const chargeInCoulombs = charge.convert(ElectricChargeUnit.C).value;

    return new ElectricCurrent({
        value: chargeInCoulombs / timeInSeconds,
        unit: ElectricCurrentUnit.A,
    });
}

function powerPerVoltage(power: Power, voltage: Voltage): ElectricCurrent {
    if (voltage.value === 0) {
        throw new Error('Voltage cannot be zero when calculating current.');
    }
    const powerInWatts = power.convert(PowerUnit.W).value;
    const voltageInVolts = voltage.convert(VoltageUnit.V).value;

    return new ElectricCurrent({
        value: powerInWatts / voltageInVolts,
        unit: ElectricCurrentUnit.A,
    });
}

export { electricChargePerTime, powerPerVoltage };
