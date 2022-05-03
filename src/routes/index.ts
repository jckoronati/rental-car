import { Router } from 'express';

import { authenticateRoute } from './authenticate.routes';
import { categoriesRoute } from './categories.routes';
import { specificationRoute } from './specification.routes';
import { userRoute } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoute);
router.use('/specifications', specificationRoute);
router.use('/users', userRoute);
router.use(authenticateRoute);

export { router };
