import { ScalarAcceleration } from '../Magnitude/Derived/Acceleration';

/** Standard acceleration due to Earth's gravity at sea level */
const g0 = new ScalarAcceleration({
    value: 9.80665,
    unit: 'm/s²',
});

export { g0 };
