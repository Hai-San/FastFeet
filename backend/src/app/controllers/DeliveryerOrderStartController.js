import DeliveryerOrderStart from '../services/DeliveryerOrderStart';

class DeliveryerOrderStartController {
    async update(req, res) {
        const { orderid } = req.params;

        const response = await DeliveryerOrderStart.run({
            deliveryer_id: req.userId,
            orderid,
        });

        return res.json(response);
    }
}

export default new DeliveryerOrderStartController();
