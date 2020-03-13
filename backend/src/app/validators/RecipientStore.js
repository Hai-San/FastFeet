import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            address: Yup.string().required(),
            address_number: Yup.number().required(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.number().required(),
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
