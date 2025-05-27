import { ElectricCharge } from "../Magnitude/Derived/ElectricCharge";

/** Elementary charge (absolute charge of a single proton or electron) */
const e = new ElectricCharge({
    value: 1,
    unit: 'e',
}).convert('C');

export { e };