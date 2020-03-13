import DeliveryerOrderList from '../services/DeliveryerOrderList';

class DeliveryerOrderListController {
    async show(req, res) {
        const { page = 1, perpage = 10 } = req.query;
        const { status } = req.query;

        const orders = await DeliveryerOrderList.run({
            deliveryer_id: req.userId,
            page,
            perpage,
            status,
        });

        return res.json(orders);
    }
}

export default new DeliveryerOrderListController();
