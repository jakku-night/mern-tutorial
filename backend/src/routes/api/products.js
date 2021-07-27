const express = require('express');
const router = express.Router();
const db = require('../../db');
const fileupload = require('express-fileupload');

router.get('/api/products/all/', async (req, res) => {
    try{
        const rows = await db.query('SELECT * FROM products');
        if(rows.length > 0){
            var data = JSON.stringify(rows);
            console.log('QUERY OK');
            res.json(data);
        }else{
            console.log('ERROR: DATABASE ERROR!!!')
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
            var data = JSON.stringify(rows[0]);
            console.log('QUERY OK');
            res.json(data);
        }else{
            console.log('ERROR: DATABASE ERROR!!!')
            res.json({status: "ERROR"});
        }
    }catch(error){
        console.error(error);
        res.json({status: "ERROR"});
    }
});

router.post('/api/products/', async (req, res) => {
    const { product } = req.body;
    try{
        const rows = await db.query('INSERT INTO products SET ?', [product]);
        if(rows[0].insertedId != ''){
            res.json({status: "OK"});
        }else{
            res.json({status: "ERROR"});
        }
    }catch(error){
        console.error(error);
        res.json({status: "ERROR"});
    }
});

router.put('/api/products/', async (req, res) => {
    var id = null;
    var product = null;
    if(req.body == null){
        console.log('ERROR: DATA IS IN BLANK!!!');
        res.json({'status': "ERROR"});
    }else{
        id = req.body.id;
        product = {
            product: req.body.product
        };
    }
    console.log(id, product);
    try{
        const rows = await db.query('UPDATE products SET ? WHERE id = ?', [product, id]);
        if(rows.affectedRows > 0){
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

router.delete('/api/products/', async (req, res) => {
    const id = req.body.id;
    try{
        const rows = await db.query('DELETE FROM products WHERE id = ?', [id]);
        if(rows.affectedRows > 0){
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

module.exports = router;