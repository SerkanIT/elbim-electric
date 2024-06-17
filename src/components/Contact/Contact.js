import React from "react";
import "./Contact.scss";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="up">
        <div className="category">{t("Aloqa")} </div>
      </div>
      <div className="contact">
        <SEO />
        <div className="left-side">
          <div className="coutry">
            <ul style={{ marginTop: 10 }}>
              <li style={{ display: "flex !important" }}>
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
                  rel="noreferrer"
                >
                  {t(
                    "Mirobod tumani, Farg'ona yo'li 222/4 O'zbekiston Toshkent"
                  )}
                </a>
              </li>
              <li style={{ display: "flex" }}>
                <div>
                  <li className="office">{t("Ofis menedjer")}</li>
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 10, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 93 555 06-55">+998 (93) 555 06-55</a>
                  <br />
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 93 555 13-54"> +998 (93) 555-13-54</a>{" "}
                  <br />
                  <i
                    className="bx bxs-phone"
                    style={{ marginRight: 9, color: "green", padding: "3px" }}
                  ></i>{" "}
                  <a href="tel:+998 78 120 31-72">+998 (78) 120-31-72</a>
                  <li className="office">{t("Avtomatlashtirish bo'limi")}</li>
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:998 (93) 555 13-54">+998 (93) 555-13-54</a>
                  <br />
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+90 (532) 205 88 76">+90 (532) 205 88 76</a>
                  <br />
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 (93) 555 13 50">+998 (93) 555 13 50</a>
                  <li className="office">{t("Tamirlash bo'limi")} </li>
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 (78) 120 31 73">+998 (78) 120 31 73</a>
                  <br />
                  <span className="footer-icon">
                    <i
                      className="bx bxs-phone"
                      style={{ marginRight: 5, color: "green" }}
                    ></i>
                  </span>
                  <a href="tel:+998 (78) 120 31 72">+998 (78) 120 31 72</a>
                </div>
              </li>
              <li>
                <div>
                  <i
                    className="bx bx-envelope"
                    style={{ marginRight: 5, color: "orange" }}
                  ></i>
                  <a href="mailto:info@elbimelektronik.uz">
                    {" "}
                    info@elbimelektronik.uz
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-side">
          <iframe
            title="Yandex map"
            className="yandex-map"
            src="https://yandex.com.tr/map-widget/v1/?ll=69.304537%2C41.282736&mode=search&sll=69.304844%2C41.282752&text=41.282752%2C69.304844&z=17.42"
            width="560"
            height="400"
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
