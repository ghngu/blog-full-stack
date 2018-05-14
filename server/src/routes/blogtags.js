import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

let router = Router();
let tableName = new Table('BlogTags');

router.get('/:blogid', (req, res) => {
    callProcedure('spBlogTags', req.params.blogid)
        .then(results => {
            res.json(results[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    tableName
        .insert(req.body)
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

export default router;