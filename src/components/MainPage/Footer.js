import React from "react";
import Logo from "../../media/img.png";
import "./Footer.scss";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <SEO />
      <div className="container">
        <div className="upper_footer">
          <div className="left_side">
            <div className="footer_logo">
              <a href="/">
                <img className="logogo" src={Logo} alt="Logo" />
              </a>
              <h1 className="company_name">Elbim Elektronik</h1>
            </div>
            <div
              style={{ marginTop: 10 }}
              className="footer_company_description"
            >
              {t(
                "Biz eng so'nggi texnologiya mahsulotlaridan foydalanamiz va tajribali, samimiy xodimlarimiz bilan sektorda yetakchi o'rinni egallab turibmiz. Biz har doim mijozlar ehtiyojini qondirishni birinchi o'ringa qo'yadigan prinsipimiz bilan sizga xizmat qilishdan mamnunmiz. Iltimos, biz bilan bog'lanishda ikkilanmang."
              )}
            </div>
            <div className="footer_company_social_media">
              <a
                target="_blank"
                href="https://www.facebook.com/elbim_electronic"
              >
                <i className="bx bxl-facebook-circle"></i>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/elbim_electronic/?hl=tr"
              >
                <i className="bx bxl-instagram"></i>
              </a>
              <a target="_blank" href="https://t.me/elbim_electronic">
                <i className="bx bxl-telegram"></i>
              </a>
            </div>
          </div>
          <div className="right_side">
            <h1 style={{ marginTop: 40 }} className="company_name">
              {t("Aloqa")}
            </h1>

            <ul style={{ marginTop: 10 }}>
              <li>
                {" "}
                <span className="footer-icon">
                  <i
                    className="bx bxs-map"
                    style={{ marginRight: 5, color: "red" }}
                  ></i>
                </span>{" "}
                <a
                  target="_blank"
                  href="https://yandex.com.tr/harita/-/CTcUVnb"
                >
                  {t(
                    "Mirobod tumani, Farg'ona yo'li 222/4 O'zbekiston Toshkent"
                  )}
                </a>{" "}
              </li>
              <li style={{ display: "flex" }}>
                <div>
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 93 555-13-54"> +998 (93) 555-13-54</a>
                  <br />
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 78 120-31-72"> +998 (78) 120-31-72</a>
                </div>
              </li>
              <li>
                <span className="footer-icon">
                  <i
                    className="bx bx-envelope"
                    style={{ marginRight: 5, color: "orange" }}
                  ></i>
                </span>{" "}
                <a href="mailto:info@elbimelektronik.uz">
                  {" "}
                  info@elbimelektronik.uz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="down_footer">
        <span>{t("Mualliflik huquqi")}</span> © 2023 SMART SOFTWARE
      </div>
    </div>
  );
};

export default Footer;
