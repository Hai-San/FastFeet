import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';

import multerConfig from './config/multer';

/* Controllers */
import SessionController from './app/controllers/SessionController';

import OrderController from './app/controllers/OrderController';
import OrderProblemAdminController from './app/controllers/OrderProblemAdminController';
import OrderProblemController from './app/controllers/OrderProblemController';
import OrderCancelController from './app/controllers/OrderCancelController';

import DeliveryerController from './app/controllers/DeliveryerController';
import DeliveryerOrderListController from './app/controllers/DeliveryerOrderListController';
import DeliveryerOrderStartController from './app/controllers/DeliveryerOrderStartController';
import DeliveryerOrderEndController from './app/controllers/DeliveryerOrderEndController';
import DeliveryerSessionController from './app/controllers/DeliveryerSessionController';

import RecipientController from './app/controllers/RecipientController';

import FileController from './app/controllers/FileController';

/* Middlewares */
import authMiddleware from './app/middlewares/auth';
import searchMiddleware from './app/middlewares/search';

/* Validators */
import validateSessionStore from './app/validators/SessionStore';

import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateOrderProblemStore from './app/validators/OrderProblemStore';

import validateDeliveryerSessionStore from './app/validators/DeliveryerSessionStore';
import validateDeliveryerStore from './app/validators/DeliveryerStore';
import validateDeliveryerUpdate from './app/validators/DeliveryerUpdate';

import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post(
    '/admin',
    bruteForce.prevent,
    validateSessionStore,
    SessionController.store
);
routes.post(
    '/login',
    bruteForce.prevent,
    validateDeliveryerSessionStore,
    DeliveryerSessionController.store
);

routes.use(authMiddleware);

routes.post('/orders', validateOrderStore, OrderController.store);
routes.get('/orders', searchMiddleware, OrderController.show);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/problems', OrderProblemAdminController.show);
routes.put('/problem/:id/cancel-order', OrderCancelController.update);

routes.post(
    '/order/:id/problems',
    validateOrderProblemStore,
    OrderProblemController.store
);
routes.get('/order/:id/problems', OrderProblemController.show);

routes.post(
    '/deliveryers',
    validateDeliveryerStore,
    DeliveryerController.store
);
routes.get('/deliveryers', searchMiddleware, DeliveryerController.show);
routes.put(
    '/deliveryers/:id',
    validateDeliveryerUpdate,
    DeliveryerController.update
);
routes.delete('/deliveryer/:id', DeliveryerController.delete);

routes.get('/deliveryer/orders', DeliveryerOrderListController.show);
routes.put(
    '/deliveryer/order/:orderid/start',
    DeliveryerOrderStartController.update
);
routes.put(
    '/deliveryer/order/:orderid/end',
    DeliveryerOrderEndController.update
);

routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.get('/recipients', searchMiddleware, RecipientController.show);
routes.put(
    '/recipients/:id',
    validateRecipientUpdate,
    RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
