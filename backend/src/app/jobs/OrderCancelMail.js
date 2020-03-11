import Mail from '../../lib/Mail';

class OrderCancelEmail {
    get key() {
        return 'OrderCancelEmail';
    }

    async handle({ data }) {
        const { order, orderProblem } = data;

        await Mail.sendMail({
            to: `${order.deliveryer.name} <${order.deliveryer.email}>`,
            subject: 'Encomenda cancelada',
            template: 'orderCancel',
            context: {
                order,
                recipient: order.recipient,
                deliveryer: order.deliveryer,
                problem: orderProblem,
            },
        });
    }
}

export default new OrderCancelEmail();
