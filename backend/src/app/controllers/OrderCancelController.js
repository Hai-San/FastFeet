import Order from '../models/Order';
import OrderProblem from '../models/OrderProblem';
import Deliveryer from '../models/Deliveryer';
import Recipient from '../models/Recipient';

import OrderCancelMail from '../jobs/OrderCancelMail';
import Queue from '../../lib/Queue';

class OrderCancelController {
    async update(req, res) {
        const orderProblem = await OrderProblem.findByPk(req.params.id);

        if (!orderProblem) {
            return res.status(400).json({
                error: 'Problem do not exists',
            });
        }

        const orderExists = await Order.findOne({
            where: {
                id: orderProblem.order_id,
                canceled_at: null,
            },
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

        if (!orderExists) {
            return res.status(400).json({
                error: 'This order does not exist or has already been canceled',
            });
        }

        const order = await orderExists.update({
            canceled_at: new Date(),
        });

        await Queue.add(OrderCancelMail.key, {
            order,
            orderProblem,
        });

        return res.json({
            order,
            orderProblem,
        });
    }
}

export default new OrderCancelController();
