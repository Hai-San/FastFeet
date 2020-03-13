import jwt from 'jsonwebtoken';

import Deliveryer from '../models/Deliveryer';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
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
