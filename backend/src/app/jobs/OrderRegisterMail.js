import Mail from '../../lib/Mail';

class OrderRegisterMail {
    get key() {
        return 'OrderRegisterMail';
    }

    async handle({ data }) {
        const { order } = data;

        await Mail.sendMail({
            to: `${order.deliveryer.name} <${order.deliveryer.email}>`,
            subject: 'Nova encomenda cadastrada',
            template: 'orderRegister',
            context: {
                product: {
                    name: order.product,
                },
                recipient: order.recipient,
                deliveryer: order.deliveryer,
            },
        });
    }
}

export default new OrderRegisterMail();
