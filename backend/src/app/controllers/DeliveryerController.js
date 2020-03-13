import * as Yup from 'yup';

import Deliveryer from '../models/Deliveryer';
import File from '../models/File';
import Order from '../models/Order';

class DeliveryerController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            avatar_id: Yup.number().nullable(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails',
            });
        }

        const deliveryerExists = await Deliveryer.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (deliveryerExists) {
            return res.status(400).json({
                error: 'Deliveryer already exists',
            });
        }

        const { id, name, email, avatar_id } = await Deliveryer.create(
            req.body
        );

        return res.json({
            id,
            name,
            email,
            avatar_id,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fails',
            });
        }

        const { id } = req.params;
        const deliveryerDatabase = await Deliveryer.findByPk(id);

        if (!deliveryerDatabase) {
            return res.status(400).json({
                error: 'Deliveryer do not exists',
            });
        }

        const { email } = req.body;

        if (email && email !== deliveryerDatabase.email) {
            const deliveryerExists = await Deliveryer.findOne({
                where: {
                    email,
                },
            });

            if (deliveryerExists) {
                return res.status(400).json({
                    error: 'This email already in use',
                });
            }
        }

        const updatedDeliveryer = await deliveryerDatabase.update(req.body);

        const newDeliveyer = await Deliveryer.findByPk(updatedDeliveryer.id, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        return res.json(newDeliveyer);
    }

    async show(req, res) {
        const { page = 1, perpage = 10 } = req.query;

        const deliveryers = await Deliveryer.findAndCountAll({
            where: {
                name: req.search,
            },
            offset: (page - 1) * perpage,
            limit: perpage,
            order: [['id', 'DESC']],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        return res.json(deliveryers);
    }

    async delete(req, res) {
        const deliveryerDatabase = await Deliveryer.findByPk(req.params.id);

        if (!deliveryerDatabase) {
            return res.status(400).json({
                error: 'Deliveryer do not exists',
            });
        }

        const deliveryerOrders = await Order.findOne({
            where: {
                deliveryer_id: req.params.id,
            },
        });

        if (deliveryerOrders) {
            return res.status(406).json({
                error:
                    'This deliveryer has orders under your name and cannot be deleted.',
            });
        }

        deliveryerDatabase.destroy();

        return res.json({
            message: 'Deliveryer has deleted',
        });
    }
}

export default new DeliveryerController();
