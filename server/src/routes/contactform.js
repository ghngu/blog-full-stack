import { Router } from 'express';
import { sendEmail } from '../utils/mail'

let router = Router();

router.post('/', (req, res, next) => {
    let messageBody = `name: ${req.body.name}
                        Email: ${req.body.email}
                        message: ${req.body.message}`;
    sendEmail('GHNguyen91@gmail.com', 'no-reply@bumblr.com', 'New Contact Form Submission', messageBody)
        .then(response => {
            res.sendStatus(201)
        }).catch(err => {
            console.log(err)
            next(err);
        })
})

export default router;