import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "/Users/ramganesh/Desktop/COMS319/Team139_Final/frontend/src/style.css";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";



function Products() {
    const [myProducts, setMyProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newPrice, setNewPrice] = useState("");



    useEffect(() => {
        fetch("http://localhost:8081/listProducts")
            .then(response => response.json())
            .then(myProducts => {
                setMyProducts(myProducts);
            });
    }, []);



    function showOneProduct() {
        let id = document.getElementById("fakestore_catalogId").value;
        fetch(`http://localhost:8081/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(fakestore_catalog => {
                setSelectedProduct(fakestore_catalog);
            })
            .catch(error => {
                console.error('Error fetching or parsing catalog data:', error);
            });
    }



    function deleteOneProduct() {
        const idToDelete = document.getElementById("fakestore_catalogIdToDelete").value;
        const confirmation = document.getElementById("deleteConfirmation").value;

        if (confirmation.toLowerCase() !== "delete") {
            console.error('Deletion not confirmed');
            return;
        }

        console.log('Deleting product with ID:', idToDelete);

        fetch(`http://localhost:8081/deleteProduct/${idToDelete}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ "id": idToDelete })
        })
            .then(response => response.json())
            .then(deleteThisProduct => {
                console.log('Product deleted:', deleteThisProduct);
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    }

    function updatePrice() {
        const idToUpdate = document.getElementById("fakestore_catalogIdToUpdate").value;
        const newPrice = document.getElementById("newPrice").value;

        fetch(`http://localhost:8081/updateProduct/${idToUpdate}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "price": newPrice })
        })
            .then(response => response.json())
            .then(() => {

                fetch(`http://localhost:8081/${idToUpdate}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(updatedProduct => {
                        console.log('Product price updated:', updatedProduct);
                        setSelectedProduct(updatedProduct);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing updated product data:', error);
                    });
            })
            .catch(error => {
                console.error('Error updating product price:', error);
            });
    }
    const ShowProducts = () => {
        return (
            <div className="container mt-3">
                <div className="row">
                    {myProducts.map(fakestore_catalog => (
                        <div key={fakestore_catalog.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <img src={fakestore_catalog.image} className="card-img-top" alt={fakestore_catalog.locationName} style={{ objectFit: 'cover', height: '200px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{fakestore_catalog.locationName}</h5>
                                    <p className="card-text">{fakestore_catalog.menu}</p>
                                    <p className="card-text">{fakestore_catalog.text}</p>
                                    <Link to="/order" className="btn">Order Now</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (

        <div className="background-color">


            <Navbar />

            <div className="centerOptions">
                <input type="number" id="fakestore_catalogId" placeholder="Enter Store ID" className="button-spacing" />

                <button type="button" onClick={showOneProduct} className="btn btn-secondary button-spacing">Filter Item</button>
                <input type="number" id="fakestore_catalogIdToUpdate" placeholder="ID to Update Price" className="button-spacing" />
                <input type="number" id="newPrice" placeholder="Enter Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="button-spacing" />

                <button type="button" onClick={updatePrice} className="btn btn-secondary button-spacing">Update Menu</button>
            </div>

            {selectedProduct && (
                <div className="container mt-3" >


                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <img src={selectedProduct.image} className="card-img-top" alt={selectedProduct.locationName} />
                                <div className="card-body">
                                    <h5 className="card-title">{selectedProduct.locationName}</h5>
                                    <p className="card-text">{selectedProduct.menu}</p>
                                    <p className="card-text">{selectedProduct.text}</p>
                                    <Link to="/order" className="btn">Order Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            <div className="products-container">
                <ShowProducts />
            </div>
        </div>
    );
}

export default Products;