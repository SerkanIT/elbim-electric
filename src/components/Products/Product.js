import React, { useEffect, useState } from 'react';
import './Product.scss';
import { Breadcrumb, Checkbox, Drawer, Pagination, Select } from "antd";
import axiosInstance from "../configs/axios";
import BaseProducts from "../BaseProducts";
import { useTranslation } from "react-i18next";
import NotFoundProduct from "../lib/NotFoundProduct";
import { NavLink } from "react-router-dom";
import SEO from "../../SEO";

const Product = () => {
    const [open, setOpen] = useState(false);
    const [openId, setOpenId] = useState();
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [countPage, setCountPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState();
    const [value, setValue] = useState();
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const { t } = useTranslation();
    const [error, setError] = useState();

    // Fetch all categories on component mount
    useEffect(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("sub");
        axiosInstance.get("/category/")
            .then(res => setCategory(res.data))
            .catch(err => setError(err));
        getProductAll(1);
    }, []);

    // Fetch all products with pagination
    const getProductAll = (page) => {
        axiosInstance.get(`/products/?limit=8&page_number=${page}`)
            .then(res => {
                setFilterProduct(res.data.results);
                setCountPage(res.data.count);
            })
            .catch(err => setError(err));
    };

    // Handle category click to fetch subcategories
    const handleClick = (id, name) => {
        localStorage.removeItem("sub");
        localStorage.setItem("name", name);
        axiosInstance.get(`/category/${id}/`)
            .then(res => {
                setSubCategory(res.data);
                setOpen(!(open && openId === id));
                setOpenId(id);
            })
            .catch(err => setError(err));
    };

    // Handle subcategory click to fetch products
    const handleClickSubCategory = async (id, count, name) => {
        localStorage.setItem("sub", name);
        setId(id);
        try {
            const res = await axiosInstance.get(`/subproduct/${id}/?limit=8&page_number=${count}`);
            setFilterProduct(res.data.results);
            setCountPage(res.data.count);
        } catch (error) {
            setFilterProduct([]);
            setError(error);
        }
    };

    // Handle page change in pagination
    const handleChange = (page) => {
        setCurrentPage(page);
        if (id) {
            value ? getProduct(value, page) : handleClickSubCategory(id, page);
        } else {
            value ? filter(value, page) : getProductAll(page);
        }
    };

    // Fetch filtered products
    const filter = (query, page) => {
        axiosInstance.get(`/filter/${query}/?limit=8&page_number=${page}`)
            .then(res => {
                setFilterProduct(res.data.results);
                setCountPage(res.data.count);
            })
            .catch(err => {
                setFilterProduct([]);
                setError(err);
            });
    };

    // Handle checkbox change for "Sotuvda mavjud"
    const handleClickCheck1 = () => {
        setCheck1(!check1);
        setCheck2(false);
        if (id) {
            if (!check1) {
                setValue("sale");
                getProduct("sale", 1);
            } else {
                setValue("");
                handleClickSubCategory(id, 1);
            }
        } else {
            if (!check1) {
                setValue("sale");
                filter("sale", 1);
            } else {
                setValue("");
                getProductAll(1);
            }
        }
    };

    // Handle checkbox change for "Buyurtma asosida"
    const handleClickCheck2 = () => {
        setCheck2(!check2);
        setCheck1(false);
        if (id) {
            if (!check2) {
                setValue("order");
                getProduct("order", 1);
            } else {
                setValue("");
                handleClickSubCategory(id, 1);
            }
        } else {
            if (!check2) {
                setValue("order");
                filter("order", 1);
            } else {
                setValue("");
                getProductAll(1);
            }
        }
    };

    // Fetch products based on selected value
    const getProduct = (value, page) => {
        axiosInstance.get(`/product/${value}/get/${id}/?page_number=${page}&limit=8`)
            .then(res => {
                setFilterProduct(res.data.results);
                setCountPage(res.data.count);
            })
            .catch(err => {
                setFilterProduct([]);
                setError(err);
            });
    };

    // Handle Select dropdown change
    const handleSelectChange = (value) => {
        setValue(value.value);
        if (id) {
            value.value ? getProduct(value.value, 1) : handleClickSubCategory(id, 1, localStorage.getItem("sub"));
        } else {
            value.value ? filter(value.value, 1) : getProductAll(1);
        }
    };

    return (
        <>
            {category.length === 0 ? <NotFoundProduct title={"Iltimos kuting..."} /> :
                <div>
                    <Breadcrumb
                        items={[
                            { title: <NavLink to="/">{t("Bosh sahifa")}</NavLink> },
                            { title: localStorage.getItem("name") },
                            { title: localStorage.getItem("sub") },
                        ]}
                    />
                    <div className="up">
                        <div className="category">{!localStorage.getItem("name") ? t("Mahsulotlar") : localStorage.getItem("name")}</div>
                        <div>
                            <Select
                                size={"large"}
                                labelInValue
                                defaultValue={{ value: '', label: t("Hammasi") }}
                                style={{ width: 150 }}
                                onChange={handleSelectChange}
                                options={[
                                    { value: '', label: t("Hammasi") },
                                    { value: 'order', label: t("Buyurtma asosida") },
                                    { value: 'sale', label: t("Sotuvda mavjud") },
                                ]}
                            />
                        </div>
                    </div>
                    <SEO />
                    <div className="products">
                        <div className="filters">
                            <h3>{t("Kategoriyalar")}</h3>
                            {category.map(category => (
                                <div className="collapse" key={category.id}>
                                    <button onClick={() => handleClick(category.id, category[`name_${localStorage.getItem("value")}`])} className={open && openId === category.id ? 'collapse-header active' : 'collapse-header'}>
                                        <i className={open && openId === category.id ? 'bx bx-chevron-right active' : 'bx bx-chevron-right'}></i> {category[`name_${localStorage.getItem("value")}`]}
                                    </button>
                                    <div className={open && openId === category.id ? 'collapse-body active' : 'collapse-body'}>
                                        {subCategory.map(subCategory => (
                                            <div key={subCategory.id} onClick={() => handleClickSubCategory(subCategory.id, 1, subCategory[`name_${localStorage.getItem("value")}`])} className={id === subCategory.id ? 'navlink active' : "navlink"}>
                                                {subCategory[`name_${localStorage.getItem("value")}`]}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Drawer className="drawer" title={t("Filter")} placement="left" onClose={() => setShow(false)} open={show}>
                            <h3 style={{ marginBottom: 20 }}>{t("Kategoriyalar")}</h3>
                            <div className="collapse">
                                {category.map(category => (
                                    <div className="collapse" key={category.id}>
                                        <button onClick={() => handleClick(category.id, category[`name_${localStorage.getItem("value")}`])} className="collapse-header">
                                            {category[`name_${localStorage.getItem("value")}`]} <i className={open && openId === category.id ? 'bx bx-chevron-right active' : 'bx bx-chevron-right'}></i>
                                        </button>
                                        <div className={open && openId === category.id ? 'collapse-body active' : 'collapse-body'}>
                                            {subCategory.map(subCategory => (
                                                <div key={subCategory.id} onClick={() => handleClickSubCategory(subCategory.id, 1, subCategory[`name_${localStorage.getItem("value")}`])} className="navlink">
                                                    {subCategory[`name_${localStorage.getItem("value")}`]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h3>{t("Filter")}</h3>
                            <Checkbox checked={check1} onClick={handleClickCheck1}>{t("Sotuvda mavjud")}</Checkbox>
                            <Checkbox checked={check2} onClick={handleClickCheck2}>{t("Buyurtma asosida")}</Checkbox>
                        </Drawer>

                        <div className="main">
                            <button className="filter" onClick={() => setShow(true)}>
                                <i className='bx bx-filter-alt'></i> Filter
                            </button>
                            <div className="right-side">
                                {filterProduct.length === 0 ? (
                                    <NotFoundProduct title={"Tanlangan filter bo'yicha mahsulot mavjud emas"} />
                                ) : (
                                    <>
                                        <div className="products">
                                            {filterProduct.map(product => (
                                                <BaseProducts key={product.id} product={product} />
                                            ))}
                                        </div>
                                        <Pagination onChange={handleChange} responsive={true} defaultPageSize={8} className="pagination" size="large" simple defaultCurrent={1} current={currentPage} total={countPage} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Product;
