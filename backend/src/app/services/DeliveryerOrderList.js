import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryer from '../models/Deliveryer';
import Recipient from '../models/Recipient';

class DeliveryerOrderList {
    async run({ deliveryer_id, page, perpage, status }) {
        const deliveryerFind = await Deliveryer.findByPk(deliveryer_id);

        if (!deliveryerFind) {
            throw new Error('Deliveryer do not exists');
        }

        let filterStatus = {};

        const notNull = { [Op.not]: null };

        if (status === 'canceled') {
            filterStatus = {
                canceled_at: notNull,
            };
        } else if (status === 'delivered') {
            filterStatus = {
                canceled_at: null,
                end_date: notNull,
            };
        } else if (status === 'pending') {
            filterStatus = {
                start_date: null,
                end_date: null,
                canceled_at: null,
            };
        } else if (status === 'started') {
            filterStatus = {
                start_date: notNull,
                end_date: null,
                canceled_at: null,
            };
        }

        const orders = await Order.findAndCountAll({
            where: {
                deliveryer_id,
                ...filterStatus,
            },
            offset: (page - 1) * perpage,
            limit: perpage,
            attributes: { exclude: ['updatedAt'] },
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

        return orders;
    }
}

export default new DeliveryerOrderList();
