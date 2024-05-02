var express = require('express');
var cors = require('cors');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'reactdata';
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());
const port = '8081';
const host = 'localhost';

app.listen(port, () => {
	console.log('App listening at http://%s:%s', host, port);
});

app.get('/listProducts', async (req, res) => {
	await client.connect();
	console.log('Node connected successfully to GET MongoDB');
	const query = {};
	const results = await db.collection('fakestore_catalog').find(query).limit(100).toArray();
	console.log(results);
	res.status(200);
	res.send(results);
});


app.get('/:id', async (req, res) => {
	const fakestore_catalogid = Number(req.params.id);
	console.log('Product to find :', fakestore_catalogid);
	await client.connect();
	console.log('Node connected successfully to GET-id MongoDB');
	const query = { id: fakestore_catalogid };
	const results = await db.collection('fakestore_catalog').findOne(query);
	console.log('Finig product with ID:', query);

	console.log('Results :', results);
	if (!results) res.send('Not Found').status(404);
	else res.send(results).status(200);
});
//need to update
app.post('/addProduct', async (req, res) => {
	try {
		await client.connect();
		const keys = Object.keys(req.body);
		const values = Object.values(req.body);
		const newDocument = {
			id: values[0],
            locationName: values[1], // also "name": req.body.name,
			menu: values[2], // also "price": req.body.price,
			text: values[3], // also "description": req.body.description,
            image: values[4],
		};
		console.log(newDocument);

		const results = await db.collection('fakestore_catalog').insertOne(newDocument);
		res.status(200);
		res.send(results);

		
	} catch (error) {
		console.error('An error occurred:', error);
		res.status(500).send({ error: 'An internal server error occurred' });
	}
});

app.delete('/deleteProduct/:id', async (req, res) => {
	try {
		const fakestore_catalogId = req.params.id; // Get the robot ID from request parameters

		// Check if the robot exists in the database
		const query = { id: parseInt(fakestore_catalogId) };
		const productToDelete = await db.collection('fakestore_catalog').findOne(query);

		console.log('Deleting product with ID:', query);

		if (!productToDelete) {
			console.log('Product not found with ID:', fakestore_catalogId);
			return res.status(404).send({ message: 'Product not found' });
		}

		// Delete the robot from the database
		const deleteResult = await db.collection('fakestore_catalog').deleteOne(query);

		if (deleteResult.deletedCount === 1) {
			console.log('Product deleted successfully:', productToDelete);
			res.status(200).send({
				message: 'Product deleted successfully',
				deletedProduct: productToDelete,
			});
		} else {
			console.log('Error deleting product:', faksestore_catatlogId);
			res.status(500).send({ message: 'Error deleting product' });
		}
	} catch (error) {
		console.error('Error deleting product:', error);
		res.status(500).send({ message: 'Internal Server Error' });

	}
	
});

app.put('/updateProduct/:id', async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    console.log('Product to Update :', id);
    
    const updateData = {
        $set: {
            price: req.body.price,
        },
    };
    
    const options = {};
    const result = await db.collection('fakestore_catalog').updateOne(query, updateData, options);
    
    if (result.matchedCount === 0) {
        return res.status(404).send({ message: 'Product not found' });
    }

    const updatedProduct = await db.collection('fakestore_catalog').findOne(query);

    res.status(200).send(updatedProduct);
});
