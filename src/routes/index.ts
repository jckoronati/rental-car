import { Router } from 'express';

import { categoriesRoute } from './categories.routes';
import { specificationRoute } from './specification.routes';

const router = Router();

router.use('/categories', categoriesRoute);
router.use('/specifications', specificationRoute);

export { router };
