import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';
import DeliveryerController from './app/controllers/DeliveryerController';
import OrderController from './app/controllers/OrderController';

import DeliveryerOrderListController from './app/controllers/DeliveryerOrderListController';
import DeliveryerOrderStartController from './app/controllers/DeliveryerOrderStartController';
import DeliveryerOrderEndController from './app/controllers/DeliveryerOrderEndController';
import DeliveryerSessionController from './app/controllers/DeliveryerSessionController';

import OrderProblemAdminController from './app/controllers/OrderProblemAdminController';
import OrderProblemController from './app/controllers/OrderProblemController';
import OrderCancelController from './app/controllers/OrderCancelController';

import authMiddleware from './app/middlewares/auth';
import searchMiddleware from './app/middlewares/search';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/admin', SessionController.store);
routes.post('/login', DeliveryerSessionController.store);

routes.use(authMiddleware);

routes.get('/deliveryer/:id/orders', DeliveryerOrderListController.show);
routes.put('/orders/:orderid/start', DeliveryerOrderStartController.update);
routes.put('/orders/:orderid/end', DeliveryerOrderEndController.update);

routes.get('/order/:id/problems', OrderProblemController.show);
routes.post('/order/:id/problems', OrderProblemController.store);

routes.get('/recipients', searchMiddleware, RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliveryers', searchMiddleware, DeliveryerController.show);
routes.post('/deliveryers', DeliveryerController.store);
routes.put('/deliveryers/:id', DeliveryerController.update);
routes.delete('/deliveryers/:id', DeliveryerController.delete);

routes.get('/orders', searchMiddleware, OrderController.show);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.put('/problem/:id/cancel-order', OrderCancelController.update);
routes.get('/problems', OrderProblemAdminController.show);

export default routes;
