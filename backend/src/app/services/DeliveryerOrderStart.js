import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryer from '../models/Deliveryer';

import Available from './Available';

class DeliveryerOrderStart {
    async run({ deliveryer_id, orderid }) {
        const start_date = new Date();
        const startDateTimestamp = Date.parse(start_date);

        const deliveryerFind = await Deliveryer.findByPk(deliveryer_id);

        if (!deliveryerFind) {
            throw new Error('Deliveryer do not exists');
        }

        const deliveryerCheckOrdersLimit = await Order.count({
            where: {
                deliveryer_id,
                start_date: {
                    [Op.between]: [
                        startOfDay(startDateTimestamp),
                        endOfDay(startDateTimestamp),
                    ],
                },
            },
        });

        if (deliveryerCheckOrdersLimit >= 5) {
            throw new Error('The delivery limit has already been reached');
        }

        const deliveryerOrderFind = await Order.findOne({
            where: {
                id: orderid,
                deliveryer_id,
                start_date: null,
                canceled_at: null,
                end_date: null,
            },
        });

        if (!deliveryerOrderFind) {
            throw new Error(
                'The order does not exist, may have been canceled or has already been delivered.'
            );
        }

        await Available.run({
            startDate: start_date,
        });

        const { product, recipient_id } = await deliveryerOrderFind.update({
            start_date,
        });

        return {
            product,
            recipient_id,
            deliveryer_id,
            start_date,
        };
    }
}

export default new DeliveryerOrderStart();
