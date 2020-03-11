import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            address: Yup.string().required(),
            address_number: Yup.number().required(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fails',
            });
        }

        const {
            id,
            name,
            address,
            address_number,
            complement,
            state,
            city,
            zip_code,
        } = await Recipient.create(req.body);

        return res.json({
            id,
            name,
            address,
            address_number,
            complement,
            state,
            city,
            zip_code,
        });
    }

    async update(req, res) {
        const { id: idRecipient } = req.params;

        const recipient = await Recipient.findByPk(idRecipient);

        if (!recipient) {
            return res.json({
                error: 'User do not exists',
            });
        }

        const {
            id,
            name,
            address,
            address_number,
            complement,
            state,
            city,
            zip_code,
        } = await recipient.update(req.body);

        return res.json({
            id,
            name,
            address,
            address_number,
            complement,
            state,
            city,
            zip_code,
        });
    }

    async show(req, res) {
        const { page = 1, perpage = 10 } = req.query;

        const recipients = await Recipient.findAndCountAll({
            where: {
                name: req.search,
            },
            offset: (page - 1) * perpage,
            limit: perpage,
        });

        return res.json(recipients);
    }

    async delete(req, res) {
        const recipientDatabase = await Recipient.findByPk(req.params.id);

        if (!recipientDatabase) {
            return res.status(400).json({
                error: 'Recipient do not exists',
            });
        }

        recipientDatabase.destroy();

        return res.json('Recipient has deleted');
    }
}

export default new RecipientController();
