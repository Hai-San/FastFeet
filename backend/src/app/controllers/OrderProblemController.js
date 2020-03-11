import * as Yup from 'yup';

import Order from '../models/Order';
import OrderProblem from '../models/OrderProblem';

class OrderProblemController {
    async show(req, res) {
        const { id } = req.params;
        const { page = 1, perpage = 10 } = req.query;

        const orderProblems = await OrderProblem.findAll({
            where: {
                order_id: id,
            },
            offset: (page - 1) * perpage,
            include: [
                {
                    model: Order,
                    as: 'order',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
            ],
        });

        if (!orderProblems) {
            return res.status(400).json({
                error: 'This order has no problem',
            });
        }

        return res.json(orderProblems);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails',
            });
        }

        const { id } = req.params;
        const orderDatabase = await Order.findByPk(id);

        if (!orderDatabase) {
            return res.status(400).json({
                error: 'Order do not exists',
            });
        }

        req.body.order_id = id;

        try {
            const orderProblems = await OrderProblem.create(req.body);
            return res.json(orderProblems);
        } catch (error) {
            return res.status(400).json({
                error,
            });
        }
    }
}

export default new OrderProblemController();
