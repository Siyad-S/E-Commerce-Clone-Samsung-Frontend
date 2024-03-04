import React, { useEffect, useState } from "react";
import "./HomeDisplay.css";
import { useNavigate } from "react-router-dom"

const HomeDisplay = ({ data, title }) => {
  const [singleProduct, setSingleProduct] = useState(data[0] || {});
  const navigate = useNavigate()

  const defaultValue = () => {
    setSingleProduct(data[0]);
  };

  const singleItem = (id) => {
    return data.find((productData) => productData._id === id);
  };

  const handleClick = (id) => {
    const product = singleItem(id);
    if (product) {
      setSingleProduct(product);
    }
  };

  useEffect(() => {
    defaultValue();
  }, [data]);
  console.log(data)

  return (
    <div className="home_display">
      <div className="titleOption">
        <h1>{title}</h1>
        <div className="options">
          <ul>
            {data.map((datas, index) => (
              <li key={index} onClick={() => handleClick(datas._id)}>
                <button>{datas.product_name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {singleProduct && (
        <>
          <div className="single_product_img">
            <img
              src={`http://localhost:5001/product/uploads/${singleProduct.product_image}`}
              alt=""
            />
          </div>
          <div className="namePrice">
            <h2>{singleProduct.product_name}</h2>
            <p>
              Starting <i>&#8377;</i> {singleProduct.price}*
            </p>
            <button onClick={() => navigate(`/singleProduct/${singleProduct._id}`)}>Buy now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeDisplay;
