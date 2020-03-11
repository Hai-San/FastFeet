import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Deliveryer from '../models/Deliveryer';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fails',
            });
        }

        const { id } = req.body;

        const deliveryer = await Deliveryer.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        if (!deliveryer) {
            return res.status(401).json({
                error: 'Deliveryer not found',
            });
        }

        return res.json({
            deliveryer,
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
