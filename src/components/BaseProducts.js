import React, { useState, useEffect } from "react";
import "./BaseProducts.scss";
import { NavLink } from "react-router-dom";
import Skeleton from "./lib/Skelation";
import { useTranslation } from "react-i18next";
import { Zoom } from "react-toastify";

const BaseProducts = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (product.photos && product.photos[0] && product.photos[0].photo) {
      const img = new Image();
      img.src = product.photos[0].photo;
      img.onload = () => setIsLoading(false);
      img.onerror = () => setIsLoading(false);
    } else {
      console.error("Product photos are not defined or empty");
      setIsLoading(false);
    }
  }, [product.photos]);

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <NavLink
          className={product.is_active ? "card-link" : "card-link none"}
          to={product.is_active ? `/product-detail/${product.id}` : ""}
        >
          <div className="card">
            <div className="product-image">
              <div className="product">
                <span className={product.dastavka ? "new " : "new dostavka"}>
                  {product.dastavka ? <>Доставка есть</> : <>Доставка нет</>}
                </span>
              </div>
              <img
                src={product.photos[0].photo}
                alt="Product Photo"
                key={product.id}
              />
              <div className="discount">
                {product.status === "sale" ? (
                  <div className="product-selling-info info">
                    <span>{t("Sotuvda mavjud")}</span>
                  </div>
                ) : (
                  <div className="product-selling-info info order">
                    <span>{t("Buyurtma asosida")}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="product-description-area">
              <div className="product-title">
                {product[`name_${localStorage.getItem("value")}`]}
              </div>
              <div className="product-selling-info price">
                {product.price} $
              </div>
            </div>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default BaseProducts;
