import Order from '../models/Order';
import OrderProblem from '../models/OrderProblem';

class OrderProblemAdminController {
    async show(req, res) {
        const { page = 1, perpage = 10 } = req.query;

        const orderProblems = await OrderProblem.findAndCountAll({
            offset: (page - 1) * perpage,
            limit: perpage,
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
}

export default new OrderProblemAdminController();
