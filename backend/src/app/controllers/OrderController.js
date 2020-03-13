import { getDay, isBefore, isAfter } from 'date-fns';

import Order from '../models/Order';
import Deliveryer from '../models/Deliveryer';
import Recipient from '../models/Recipient';
import File from '../models/File';

import OrderRegisterMail from '../jobs/OrderRegisterMail';

import FormatTime from '../../lib/FormatTime';
import Queue from '../../lib/Queue';

class OrderController {
    async store(req, res) {
        const recipient = await Recipient.findByPk(req.body.recipient_id);

        if (!recipient) {
            return res.status(400).json({
                error: 'Recipient do not exists',
            });
        }

        const deliveryer = await Deliveryer.findByPk(req.body.deliveryer_id);

        if (!deliveryer) {
            return res.status(400).json({
                error: 'Deliveryer do not exists',
            });
        }

        const newOrder = await Order.create(req.body);

        const order = await Order.findByPk(newOrder.id, {
            include: [
                {
                    model: Deliveryer,
                    as: 'deliveryer',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
            ],
        });

        await Queue.add(OrderRegisterMail.key, {
            order,
        });

        return res.json(order);
    }

    async update(req, res) {
        const { id } = req.params;
        const orderDatabase = await Order.findByPk(id);

        if (!orderDatabase) {
            return res.status(400).json({
                error: 'Order do not exists',
            });
        }

        const startDate = new Date();
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
            return res.status(400).json({
                error: 'We are out of business hours.',
            });
        }

        const updatedOrder = await orderDatabase.update(req.body);

        const order = await Order.findByPk(updatedOrder.id, {
            include: [
                {
                    model: Deliveryer,
                    as: 'deliveryer',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
            ],
        });

        return res.json(order);
    }

    async show(req, res) {
        const { page = 1, perpage = 10 } = req.query;

        const orders = await Order.findAndCountAll({
            where: {
                product: req.search,
            },
            offset: (page - 1) * perpage,
            limit: perpage,
            attributes: { exclude: ['createdAt', 'updatedAt', 'signature_id'] },
            include: [
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'path', 'url'],
                },
                {
                    model: Deliveryer,
                    as: 'deliveryer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'avatar_id'],
                    },
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
            ],
            order: [['createdAt', 'ASC']],
        });

        return res.json(orders);
    }

    async delete(req, res) {
        const orderDatabase = await Order.findByPk(req.params.id);

        if (!orderDatabase) {
            return res.status(400).json({
                error: 'Order do not exists',
            });
        }

        orderDatabase.canceled_at = new Date();

        await orderDatabase.destroy();

        return res.json('Order has deleted');
    }
}

export default new OrderController();
