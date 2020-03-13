import { getDay, isBefore, isAfter } from 'date-fns';

import FormatTime from '../../lib/FormatTime';

class Available {
    async run({ startDate }) {
        const startDateTimestamp = Date.parse(startDate);
        const startDateDay = getDay(startDateTimestamp);

        const schedule = [
            {
                day: 0,
                schedules: [
                    {
                        start: '09:00',
                        end: '13:00',
                    },
                    {
                        start: '14:30',
                        end: '22:00',
                    },
                ],
            },
            {
                day: 1,
                schedules: [
                    {
                        start: '08:00',
                        end: '22:00',
                    },
                    {
                        start: '13:30',
                        end: '21:00',
                    },
                ],
            },
            {
                day: 2,
                schedules: [
                    {
                        start: '09:00',
                        end: '13:00',
                    },
                    {
                        start: '14:30',
                        end: '22:00',
                    },
                ],
            },
            {
                day: 3,
                schedules: [
                    {
                        start: '09:00',
                        end: '13:00',
                    },
                    {
                        start: '14:30',
                        end: '22:00',
                    },
                ],
            },
            {
                day: 4,
                schedules: [
                    {
                        start: '09:00',
                        end: '13:00',
                    },
                    {
                        start: '14:30',
                        end: '22:00',
                    },
                ],
            },
            {
                day: 5,
                schedules: [
                    {
                        start: '09:00',
                        end: '13:00',
                    },
                    {
                        start: '14:00',
                        end: '22:00',
                    },
                ],
            },
            {
                day: 6,
                schedules: [
                    {
                        start: '09:00',
                        end: '13:00',
                    },
                    {
                        start: '14:30',
                        end: '22:00',
                    },
                ],
            },
        ];

        let availableTime = false;

        schedule.forEach(time => {
            if (startDateDay === time.day && time.schedules.length > 0) {
                time.schedules.forEach(dayTime => {
                    const dayStart = FormatTime(
                        startDateTimestamp,
                        dayTime.start
                    );
                    const dayEnd = FormatTime(startDateTimestamp, dayTime.end);

                    if (
                        isAfter(startDateTimestamp, dayStart) &&
                        isBefore(startDateTimestamp, dayEnd)
                    ) {
                        availableTime = true;
                    }
                });
            }
        });

        if (!availableTime) {
            throw new Error('We are out of business hours.');
        }

        return availableTime;
    }
}

export default new Available();
