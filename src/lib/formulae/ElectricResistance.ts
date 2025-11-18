import {
    ElectricResistance,
    ElectricResistanceUnit,
    type Voltage,
    VoltageUnit,
    type ElectricCurrent,
    ElectricCurrentUnit,
} from '../Magnitude';

function voltagePerCurrent(
    voltage: Voltage,
    current: ElectricCurrent,
): ElectricResistance {
    if (current.value === 0) {
        throw new Error(
            'Electric current cannot be zero when calculating resistance.',
        );
    }
    const voltageInVolts = voltage.convert(VoltageUnit.V).value;
    const currentInAmperes = current.convert(ElectricCurrentUnit.A).value;

    return new ElectricResistance({
        value: voltageInVolts / currentInAmperes,
        unit: ElectricResistanceUnit.Ω,
    });
}

export { voltagePerCurrent };
