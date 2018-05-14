import { Router } from 'express';
import Table from '../Table';
import { callProcedure, executeQuery } from '../config/db';

let router = Router();
let tableName = new Table('Blogs');

router.get('/tags/:tagid', (req, res) => {
    callProcedure(`spGetById`, req.params.tagid)
        .then(results => {
            res.json(results[0]);
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get('/author/:authorid', (req, res) => {
    callProcedure(`spAuthorBlogs`, req.params.authorid)
        .then(results => {
            res.json(results[0]);
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get('/:blogid', (req, res) => {
    tableName
        .getOne(req.params.blogid)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500);
        })
})

router.get('/', (req, res) => {
    executeQuery(`
    SELECT
b.id AS id,
a.author AS author,
b.title AS title,
b.content AS content,
b._created AS _created
FROM blogs b
JOIN authors a ON a.id = b.authorid;
`)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    // tableName
    //     .getAll()
    //     .then(results => {
    //         res.json(results)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.sendStatus(500)
    //     })
})

router.post('/', (req, res) => {
    tableName
        .insert(req.body)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.put('/:blogid', (req, res) => {
    tableName
        .update(req.params.blogid, req.body)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.delete('/:blogid', (req, res) => {
    tableName
        .delete(req.params.blogid)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

export default router;