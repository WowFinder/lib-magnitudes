import {
    type ElectricCurrent,
    ElectricCurrentUnit,
    type Power,
    PowerUnit,
    Voltage,
    VoltageUnit,
} from '../Magnitude';

function powerPerElectricCurrent(
    power: Power,
    current: ElectricCurrent,
): Voltage {
    if (current.value === 0) {
        throw new Error(
            'Electric current cannot be zero when calculating voltage.',
        );
    }
    const powerInWatts = power.convert(PowerUnit.W).value;
    const currentInAmperes = current.convert(ElectricCurrentUnit.A).value;

    return new Voltage({
        value: powerInWatts / currentInAmperes,
        unit: VoltageUnit.V,
    });
}

export { powerPerElectricCurrent };
