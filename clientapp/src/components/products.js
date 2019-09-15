import React from 'react';

const imgFolderUrl = "https://<your-bucket-name>.<aws-region>.amazonaws.com/products/";
const imgFileSuffix = ".jpg";

const Products = ({ products }) => {
    return (
        <div class="row">
        {products.map((product) => (
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src={imgFolderUrl + product.id + imgFileSuffix} alt=""></img></a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">{product.name}</a>
                        </h4>
                        <h5>£{product.price}</h5>
                        <p class="card-text">{product.description}</p>
                    </div>
                    <div class="card-footer">
                    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                </div>
                </div>
            </div>
        ))};
        </div>
    );
};

export default Products
