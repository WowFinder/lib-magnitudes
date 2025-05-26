import {
    Acceleration,
    AccelerationUnit,
    ScalarAcceleration,
    Speed,
    SpeedUnit,
    type Time,
    TimeUnit,
    type Velocity,
} from '../Magnitude';

function speedPerTime(speed: Speed, time: Time): ScalarAcceleration;
function speedPerTime(speed: Velocity, time: Time): Acceleration;
function speedPerTime(
    speed: Speed | Velocity,
    time: Time,
): ScalarAcceleration | Acceleration {
    if (time.value === 0) {
        throw new Error('Time cannot be zero when calculating acceleration.');
    }

    const timeInSeconds = time.convert(TimeUnit.s).value;

    if (speed instanceof Speed) {
        const speedInMetersPerSecond = speed.convert(SpeedUnit['m/s']).value;
        return new ScalarAcceleration({
            value: speedInMetersPerSecond / timeInSeconds,
            unit: AccelerationUnit['m/s²'],
        });
    } else {
        const speedInMetersPerSecond = speed.convert(SpeedUnit['m/s']);
        return new Acceleration({
            x: speedInMetersPerSecond.x / timeInSeconds,
            y: speedInMetersPerSecond.y / timeInSeconds,
            z: speedInMetersPerSecond.z / timeInSeconds,
            unit: AccelerationUnit['m/s²'],
        });
    }
}

export { speedPerTime };
