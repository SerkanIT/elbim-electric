import React, {useEffect, useState} from 'react';
import Carusel from "../../Carusel";
import BaseProducts from "../BaseProducts";
import './MainPage.scss'
import axiosInstance from '../configs/axios'
import {Pagination} from "antd";
import {useTranslation} from "react-i18next";
import NextArrow from "../arrows/NextArrow";
import PrevArrow from "../arrows/PrevArrow";
import NotFoundProduct from "../lib/NotFoundProduct";
import SEO from "../../SEO";


const MainPage = () => {
    const [caruselData, setCaruselData] = useState([]);
    const [products, setProdeucts] = useState([]);
    const {t} = useTranslation();
    const [pageCount, setPageCount] = useState(0)

    const [caruselData2, setCaruselData2] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const [error, setError] = useState([])
    const handleChange = (page) => {
        setCurrentPage(page)
        getProducts(page)
    }
    useEffect(() => {
        getProducts(1)
        axiosInstance.get("/carusel/").then((res) => {
            setCaruselData(res.data)
        }).catch((err) => {
            setError(
                {
                    ...error,
                    err
                }
            )
        })
        axiosInstance.get("/partnior/").then((res) => {
            setCaruselData2(res.data)
        }).catch((err) => {
            setError(
                {
                    ...error,
                    err
                }
            )
        })

    }, []);
    const getProducts = (count) => {

        axiosInstance.get(`/products/?page_number=${count}`).then((res) => {
            setProdeucts(res.data.results)
            setPageCount(res.data.count)
            console.log(res.data)
        }).catch((err) => {
            setError(
                {
                    ...error,
                    err
                }
            )

        })
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable auto slideshow
        autoplaySpeed: 3000,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
    };
    const settings2 = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true, // Enable auto slideshow
        autoplaySpeed: 3000,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }

        ]
    };
    const style = {
        height: 443,
        width: '100%',
        borderRadius: 25,
        zIndex: -1,
    }
    const style2 = {
        height: 100,
        width: '100%',
        borderRadius: 25,
        zIndex: -1,
    }
    return (
        <div className="main-page">
            <SEO/>
            {caruselData.length !== 0 || caruselData2.length !== 0 || products.length !== 0 ?
                <div>
                    <div>
                        <Carusel data={caruselData} settings={settings} style={style}/>
                    </div>
                    <div className="product_section">
                        <h1>{t("Bizning mahsulotlarimiz")}</h1>
                        <div className="products">
                            {
                                products.map((product) => (
                                    <BaseProducts product={product} key={product.id}/>
                                ))
                            }
                        </div>
                        <Pagination size="large" simple onChange={handleChange} defaultCurrent={1} current={currentPage}
                                    total={pageCount}/>
                    </div>
                    <div className="our_brends">
                        <h1>{t("Bizning hamkorlarimiz")}</h1>
                        <Carusel className={"custom-slider"} data={caruselData2} settings={settings2} style={style2}/>
                    </div>
                </div> :
                <NotFoundProduct title={"Iltimos kuting..."}/>
            }
        </div>
    )
};

export default MainPage;