import { Op } from 'sequelize';

export default async (req, res, next) => {
    const { search = null } = req.query;

    const searchCondition = search
        ? { [Op.iLike]: `%${search}%` }
        : { [Op.not]: null };

    req.search = searchCondition;

    return next();
};
