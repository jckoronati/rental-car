import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { AddSpecificationToCarController } from '../../../../modules/cars/useCases/addSpecificationToCar/AddSpecificationToCarController';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureUserIsAdmin';

const carRoute = Router();

const upload = multer(uploadConfig.upload('./tmp/carImages'));

const createCarController = new CreateCarController();
const listCarsAvailable = new ListCarsController();
const addSpecificationToCarController = new AddSpecificationToCarController();
const uploadCarImageController = new UploadCarImageController();

carRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carRoute.get('/available', listCarsAvailable.handle);

carRoute.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  addSpecificationToCarController.handle,
);

carRoute.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle,
);

export { carRoute };
