import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetail.scss";
import CustomCarusel from "./CustomCarusel";
import { Button, Input, Modal } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../configs/axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const [date, setDate] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const [order, setOrder] = useState({
    product: "",
    user_name: "",
    phone: "",
  });
  console.log(id);
  useEffect(() => {
    axiosInstance
      .get(`/product/one/${id}/`)
      .then((res) => {
        setDate(res.data);
        setPhotos(res.data.photos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(order);
    axiosInstance
      .post("/order/", order)
      .then((res) => {
        toast.success(
          t("Buyurtnangiz qabul qilindi sizga tez orada bog'lanishadi"),
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        console.log(res);
      })
      .catch((error) => {
        toast.error(t("Telefon raqam yoki ism noto'g'ri kiritilgan"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    setOrder({
      ...order,
      product: id,
      user_name: e.target.value,
    });
  };
  const onPhoneChange = (phone) => {
    setOrder({
      ...order,
      phone: phone,
    });
  };

  return (
    <>
      <div className="up">
        <div style={{ fontWeight: "700" }}>
          {date[`name_${localStorage.getItem("value")}`]}
        </div>
      </div>
      <div className="product_detail">
        <ToastContainer />
        

        <div className="left">
          <CustomCarusel data={photos} />
        </div>
        <div className="right">
          <div className="product_name">
            {date[`name_${localStorage.getItem("value")}`]}
          </div>
          <div className="description">
            {date[`description_${localStorage.getItem("value")}`]}
          </div>
          <div className="price">{date.price} $</div>
          <div className="buttons">
            <a className="instruction" href={date.instruction}>
              <Button className="pdf">
                <span>{t("Foydalanish qo'llanmasi")}</span>{" "}
                <i className="bx bx-download"></i>
              </Button>
            </a>
            <div>
              {date.status === "order" ? (
                <Button onClick={showModal}>{t("Buyurtma qilish")}</Button>
              ) : (
                <Button>{t("Sotuvda mavjud")}</Button>
              )}
            </div>
            <div>
              {date.dastavka ? (
                <>
                  <Button>{t("Yetkazib berish mavjud")}</Button>
                </>
              ) : (
                <>
                  <Button danger={true}>{"Yetkazib berish mavjud emas"}</Button>
                </>
              )}
            </div>
          </div>
          <div className="contacts">
            <div className="contact-title">{t("Sotuv bo'limi")}:</div>
            <div className="contacts">
              <i
                className="bx bxs-phone"
                style={{ marginRight: 5, color: "green" }}
              ></i>
              <a href="tel:+998 (93) 555-06-55">+998 (93) 555-06-55</a>
            </div>
            <div className="contacts">
              <i
                className="bx bxs-phone"
                style={{ marginRight: 5, color: "green" }}
              ></i>
              <a href="tel:+998 (93) 555-13-54">+998 (93) 555-13-54</a>
            </div>
            <div className="contacts">
              <i
                className="bx bxs-phone"
                style={{ marginRight: 5, color: "green" }}
              ></i>
              <a href="tel:+998 (78) 120-31-72">+998 (78) 120-31-72</a>
            </div>
          </div>

          <Modal
            title="Buyurtma berish"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <PhoneInput
              onChange={onPhoneChange}
              countryCodeEditable={false}
              inputProps={{
                name: "phone",
                autoFocus: true,
              }}
              country={"uz"}
              disableDropdown={true}
              inputStyle={{ width: "100%" }}
            />
            <Input
              onChange={onChange}
              style={{ marginTop: "20px" }}
              placeholder="Ismingizni kiriting "
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
