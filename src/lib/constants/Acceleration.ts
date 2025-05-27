import { ScalarAcceleration } from '../Magnitude/Derived/Acceleration';

/** Standard acceleration due to Earth's gravity at sea level */
const g_0 = new ScalarAcceleration({
    value: 9.80665,
    unit: 'm/s²',
});

export { g_0 };
