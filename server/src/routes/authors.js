import { Router } from 'express';
import Table from '../Table';
import { isAdmin } from "../middleware/admin.mw";
import { tokenMiddleware } from "../middleware/auth.mw";
import { generateHash } from "../utils/bcrypt";

let router = Router();
let tableName = new Table('Authors');
let id;

router.get('/:authorid', (req, res) => {
    id = req.params.authorid
    tableName
        .getOne(id)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/', tokenMiddleware, isAdmin, (req, res) => {
    tableName
        .getAll()
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    generateHash(req.body.password).then(hash => {
        tableName.insert({
            author: req.body.author,
            email: req.body.email,
            password: hash
        })
            .then(results => {
                res.json(results).send(200)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

export default router;