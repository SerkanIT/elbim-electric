import React, { useEffect, useState } from "react";
import BaseProducts from "../BaseProducts";
import { Pagination } from "antd";
import axiosInstance from "../configs/axios";
import NotFoundProduct from "../lib/NotFoundProduct";
import SEO from "../../SEO";
import { useTranslation } from "react-i18next";

const Order = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const { t } = useTranslation();
  const handleChange = (page) => {
    setCurrentPage(page);
    getProducts(page);
  };
  const getProducts = (count) => {
    axiosInstance
      .get(`/products/order/?page_number=${count}`)
      .then((res) => {
        setProduct(res.data.results);
        setPageCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
        setIsValid(false);
        if (err) {
          setIsValid(false);
        }
      });
  };
  useEffect(() => {
    getProducts(1);
  }, []);
  return (
    <div>
      <SEO />
      {isValid ? (
        <>
          <div className="up">
            <div style={{ fontWeight: "700" }}>{t("Mahsulotlar")}</div>
          </div>
          <div className="product_section">
            <div className="products">
              {product.map((product) => (
                <BaseProducts product={product} key={product.id} />
              ))}
            </div>

            <Pagination
              style={{ marginBottom: 30 }}
              size="large"
              simple
              onChange={handleChange}
              defaultCurrent={1}
              current={currentPage}
              total={pageCount}
            />
          </div>
        </>
      ) : (
        <NotFoundProduct
          title={"Buyurtma qilish uchun mahsulotlar mavjud emas"}
        />
      )}
    </div>
  );
};

export default Order;
