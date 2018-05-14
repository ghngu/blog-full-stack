import { Router } from 'express';
import authorsRouter from './authors';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogTagRouter from './blogtags';
import authRouter from './auth';
import usersRouter from './users';
import stripeDonationRouter from './stripeDonations'
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import contactRouter from './contactform';

let router = Router();

router.use('/auth', authRouter);
router.use('/donate', stripeDonationRouter);
router.use('/contact', contactRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/authors', authorsRouter);
router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogTagRouter);
router.use('/users', usersRouter);

export default router;