import {
    Capacitance,
    CapacitanceUnit,
    type ElectricCharge,
    ElectricChargeUnit,
    type Voltage,
    VoltageUnit,
} from '../Magnitude';

function electricChargePerVoltage(
    charge: ElectricCharge,
    voltage: Voltage,
): Capacitance {
    if (voltage.value === 0) {
        throw new Error('Voltage cannot be zero when calculating capacitance.');
    }
    const chargeInCoulombs = charge.convert(ElectricChargeUnit.C).value;
    const voltageInVolts = voltage.convert(VoltageUnit.V).value;

    return new Capacitance({
        value: chargeInCoulombs / voltageInVolts,
        unit: CapacitanceUnit.F,
    });
}

export { electricChargePerVoltage };
