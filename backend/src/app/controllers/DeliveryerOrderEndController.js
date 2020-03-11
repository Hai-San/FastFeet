import * as Yup from 'yup';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryer from '../models/Deliveryer';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryerOrderEndController {
    async update(req, res) {
        const schema = Yup.object().shape({
            signature_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fails',
            });
        }

        const fileFind = await File.findByPk(req.body.signature_id);

        if (!fileFind) {
            return res.status(400).json({
                error: 'There was an error processing your image.',
            });
        }

        const id = req.userId;

        const { orderid } = req.params;

        const deliveryerFind = await Deliveryer.findByPk(id);

        if (!deliveryerFind) {
            return res.status(400).json({
                error: 'Deliveryer do not exists',
            });
        }

        const deliveryerOrderFind = await Order.findOne({
            where: {
                id: orderid,
                deliveryer_id: id,
                start_date: {
                    [Op.not]: null,
                },
                canceled_at: null,
            },
        });

        if (!deliveryerOrderFind) {
            return res.status(400).json({
                error:
                    'The order does not exist, may have been canceled or has not been initiated.',
            });
        }

        req.body.end_date = new Date();

        const updatedOrder = await deliveryerOrderFind.update(req.body);

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
}

export default new DeliveryerOrderEndController();
