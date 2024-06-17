import React, { useState } from "react";
import { Drawer, Input } from "antd";
import "./Navbar.scss";
import Logo from "../../media/img.png";
import LanguageSwitcher from "../../lang/LanguageSwitcher";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import axios from "axios";

const { Search } = Input;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { t } = useTranslation();

  const handleInputChange = (event) => {
    localStorage.setItem("open", true);
    setSearchQuery(event.target.value);
    let query = event.target.value;
    if (query.length !== 0) {
      axios
        .get(`https://api.elbim.uz/api/v1/search/${query}/`)
        .then((res) => {
          setFilteredData(res.data);
        })
        .catch((error) => {
          localStorage.setItem("open", false);
          setFilteredData([]);
          console.log(error.response.data.message);
        });
    }
  };

  const handleClose = () => {
    localStorage.setItem("open", false);
    setSearchQuery("");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header>
      <div className="navbar">
        <SEO />
        <div className="upper_nav">
          <div className="logo">
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>
          <NavLink className="nav-link" to="/products">
            {t("MAHSULOTLAR")} <div className="line"></div>
          </NavLink>
          <NavLink className="nav-link" to="/order">
            {t("BUYURTMA BERISH")} <div className="line"></div>
          </NavLink>
          <NavLink className="nav-link" to="/about">
            {t("BIZ HAQIMIZDA")} <div className="line"></div>
          </NavLink>
          <NavLink className="nav-link" to="/contacts">
            {t("ALOQA")} <div className="line"></div>
          </NavLink>
          <div
            className={
              localStorage.getItem("open") && searchQuery.length > 0
                ? "search open"
                : "search"
            }
          >
            <Search
              onChange={handleInputChange}
              size="large"
              className="search-input"
              placeholder={t("Maxsulotni izlash")}
              allowClear
              value={searchQuery}
            />
            <div
              className={
                localStorage.getItem("open") && searchQuery.length > 0
                  ? "search_result_list active"
                  : "search_result_list"
              }
            >
              {filteredData.length === 0 ? (
                <>Hech narsa topilmadi</>
              ) : (
                filteredData.map((item) => (
                  <NavLink
                    onClick={handleClose}
                    to={`/product-detail/${item.id}`}
                    className="search_result_list_item"
                    key={item.id}
                  >
                    <i className="bx bx-search"></i>
                    <li>{item[`name_${localStorage.getItem("value")}`]}</li>
                  </NavLink>
                ))
              )}
            </div>
          </div>
          <div className="language">
            <LanguageSwitcher />
          </div>
          <button className="burger_menu" onClick={showDrawer}>
            <i className="bx bx-menu"></i>
          </button>
        </div>
        <div className="responsive_nav">
          <div
            className={
              localStorage.getItem("open") && searchQuery.length > 0
                ? "search open"
                : "search"
            }
          >
            <Search
              onChange={handleInputChange}
              size="large"
              className="search-input"
              placeholder="Maxsulotni izlash"
              allowClear
              value={searchQuery}
            />
            <div
              className={
                localStorage.getItem("open") && searchQuery.length > 0
                  ? "search_result_list active"
                  : "search_result_list"
              }
            >
              {filteredData.length === 0 ? (
                <>Hech narsa topilmadi</>
              ) : (
                filteredData.map((item) => (
                  <NavLink
                    onClick={handleClose}
                    to={`/product-detail/${item.id}`}
                    className="search_result_list_item"
                    key={item.id}
                  >
                    <i className="bx bx-search"></i>
                    <li>{item[`name_${localStorage.getItem("value")}`]}</li>
                  </NavLink>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="drawer">
          <Drawer
            title=""
            placement="left"
            closable
            onClose={onClose}
            open={open}
            key="left"
          >
            <div className="navLinks">
              <NavLink onClick={onClose} className="nav-link" to="/">
                <div>
                  <i className="bx bx-home-alt-2"></i> {t("Asosiy")}
                </div>
              </NavLink>
              <NavLink onClick={onClose} className="nav-link" to="/about">
                <div>
                  <i className="bx bx-info-circle"></i> {t("Biz haqimizda")}
                </div>
              </NavLink>
              <NavLink onClick={onClose} className="nav-link" to="/products">
                <div>
                  <i className="bx bx-shopping-bag"></i> {t("Mahsulotlar")}
                </div>
              </NavLink>
              <NavLink onClick={onClose} className="nav-link" to="/order">
                <div>
                  <i className="bx bx-cart-alt"></i> {t("Buyurtma berish")}
                </div>
              </NavLink>
              <NavLink onClick={onClose} className="nav-link" to="/contacts">
                <div>
                  <i className="bx bxs-contact"></i> {t("Aloqa")}
                </div>
              </NavLink>
            </div>
            <div className="language">
              <LanguageSwitcher />
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
