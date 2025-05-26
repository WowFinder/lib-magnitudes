import {
    Length,
    Speed,
    type Time,
    Velocity,
    type Position,
    LengthUnit,
    TimeUnit,
    SpeedUnit,
} from '../Magnitude';

function distancePerTime(distance: Length, time: Time): Speed;
function distancePerTime(distance: Position, time: Time): Velocity;
function distancePerTime(
    distance: Length | Position,
    time: Time,
): Speed | Velocity {
    if (time.value === 0) {
        throw new Error(
            'Time cannot be zero when calculating speed or velocity.',
        );
    }

    const timeInSeconds = time.convert(TimeUnit.s).value;

    if (distance instanceof Length) {
        const distanceInMeters = distance.convert(LengthUnit.m).value;
        return new Speed({
            value: distanceInMeters / timeInSeconds,
            unit: SpeedUnit['m/s'],
        });
    } else {
        const distanceInMeters = distance.convert(LengthUnit.m);
        return new Velocity({
            x: distanceInMeters.x / timeInSeconds,
            y: distanceInMeters.y / timeInSeconds,
            z: distanceInMeters.z / timeInSeconds,
            unit: SpeedUnit['m/s'],
        });
    }
}

export { distancePerTime };
