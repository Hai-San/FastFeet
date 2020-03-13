import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            address: Yup.string(),
            address_number: Yup.number(),
            complement: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            zip_code: Yup.number(),
        });

        await schema.validate(req.body, {
            abortEarly: false,
        });

        return next();
    } catch (error) {
        return res.status(400).json({
            error: 'validation fails',
            messages: error.inner,
        });
    }
};
