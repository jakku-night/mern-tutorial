const express = require('express');
const router = express.Router();
const db = require('../../db');
const fileupload = require('express-fileupload');

router.get('/api/products/all/', async (req, res) => {
    try{
        const rows = await db.query('SELECT * FROM products');
        if(rows.length > 0){
            const data = JSON.stringify(rows);
            res.json(data);
        }else{
            res.json({status: "ERROR"});
        }
    }catch(error){
        console.error(error);
        res.json({status: "ERROR"});
    }
});

router.get('/api/products/:id/', async (req, res) => {
    const id = req.params.id;
    try{
        const rows = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if(rows.length > 0){
            const data = JSON.stringify(rows);
            res.json(data);
        }else{
            res.json(JSON.stringify({status: "ERROR"}));
        }
    }catch(error){
        console.error(error);
        res.json(JSON.stringify({status: "ERROR"}));
    }
});

router.post('/api/products/', async (req, res) => {
    const { product } = req.body;
    try{
        const rows = await db.query('INSERT INTO products SET ?', [product]);
        if(rows[0].insertedId != ''){
            res.json(JSON.stringify({status: "OK"}));
        }else{
            res.json(JSON.stringify({status: "ERROR"}));
        }
    }catch(error){
        console.error(error);
        res.json(JSON.stringify({status: "ERROR"}));
    }
});

router.put('/api/products/', async (req, res) => {
    const id = req.body.id;
    const product = req.body.product;
    console.log(id, product);
    try{
        const rows = await db.query('UPDATE products SET ? WHERE id = ?', [product, id]);
        if(rows.length > 0){
            console.log('QUERY OK');
            res.json({'status': "OK"});
        }else{
            console.log('ERROR: DATABASE ERROR!!!');
            res.json({'status': "ERROR"});
        }
    }catch(error){
        console.error(error);
        res.json({'status': "ERROR"});
    }
});

router.delete('/api/products/:id/', async (req, res) => {
    const id = req.params.id;
    try{
        const rows = await db.query('DELETE FROM products WHERE id = ?', [id]);
        if(rows[0].affectedRows > 0){
            res.json(JSON.stringify({status: "OK"}));
        }else{
            res.json(JSON.stringify({status: "ERROR"}));
        }
    }catch(error){
        console.error(error);
        res.json(JSON.stringify({status: "ERROR"}));
    }
});

module.exports = router;