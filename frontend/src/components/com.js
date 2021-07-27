import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

const Com = () => {
    const [product, setProduct] = useState([]);
    const get_data = async (event) => {
        event.preventDefault();
        var form = new FormData(event.currentTarget);
        const res = await fetch(event.target.action + form.get('id') + '/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'Content-Type': 'multipart/form-data'
            },
            //body: form
        });
        const data = await res.json();
        setProduct(data);
    };

    return (
        <Fragment>
            <form action = "http://localhost:3000/api/products/" encType = "multipart/form-data" onSubmit = {get_data}>
                <input type="text" name="id" id="id" placeholder="ID" />
                <input type="text" name="product" id="product" placeholder="PRODUCT" />
                <button type="submit">Send</button>
            </form>
            <h3>{product}</h3>
        </Fragment>
    );
};

export default Com;