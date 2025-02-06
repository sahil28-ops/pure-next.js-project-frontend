import React from "react";

function CollectionProduct() {
  return (
    <div>
      <div>
        <h4 className="mt-4">Products</h4>
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CollectionProduct;
