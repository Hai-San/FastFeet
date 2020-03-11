import { startOfDay, endOfDay, getDay, isBefore, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryer from '../models/Deliveryer';

import FormatTime from '../../lib/FormatTime';

class DeliveryerOrderStartController {
    async update(req, res) {
        const start_date = new Date();
        const startDateTimestamp = Date.parse(start_date);
        const startDateDay = getDay(startDateTimestamp);

        const id = req.userId;

        const { orderid } = req.params;

        const deliveryerFind = await Deliveryer.findByPk(id);

        if (!deliveryerFind) {
            return res.status(400).json({
                error: 'Deliveryer do not exists',
            });
        }

        const deliveryerCheckOrdersLimit = await Order.count({
            where: {
                deliveryer_id: id,
                start_date: {
                    [Op.between]: [
                        startOfDay(startDateTimestamp),
                        endOfDay(startDateTimestamp),
                    ],
                },
            },
        });

        if (deliveryerCheckOrdersLimit >= 5) {
            return res.status(400).json({
                error: 'The delivery limit has already been reached.',
            });
        }

        const deliveryerOrderFind = await Order.findOne({
            where: {
                id: orderid,
                deliveryer_id: id,
                canceled_at: null,
                end_date: null,
            },
        });

        if (!deliveryerOrderFind) {
            return res.status(400).json({
                error:
                    'The order does not exist, may have been canceled or has already been delivered.',
            });
        }

        const schedule = [
            {
                day: 1,
                schedules: [
                    {
                        start: '08:00',
                        end: '12:00',
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
                        start: '14:30',
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
            return res.status(400).json({
                error: 'We are out of business hours.',
            });
        }

        const {
            product,
            recipient_id,
            deliveryer_id,
        } = await deliveryerOrderFind.update({ start_date });

        return res.json({
            product,
            recipient_id,
            deliveryer_id,
            start_date,
        });
    }
}

export default new DeliveryerOrderStartController();
