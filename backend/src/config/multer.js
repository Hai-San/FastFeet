import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import SanitizeFileName from '../lib/SanitizeFileName';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(4, (err, res) => {
                if (err) {
                    return cb(err);
                }

                let sanitizedName = file.originalname
                    .split('.')
                    .slice(0, -1)
                    .join('.');

                sanitizedName = SanitizeFileName(sanitizedName);

                return cb(
                    null,
                    `${sanitizedName}-${res.toString('hex') +
                        extname(file.originalname)}`
                );
            });
        },
    }),
};
