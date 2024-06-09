import React, {useEffect, useState} from 'react';
import './Product.scss'
import {Breadcrumb, Checkbox, Drawer, Pagination, Select} from "antd";
import axiosInstance from "../configs/axios";
import BaseProducts from "../BaseProducts";
import {useTranslation} from "react-i18next";
import NotFoundProduct from "../lib/NotFoundProduct";
import {NavLink} from "react-router-dom";
import SEO from "../../SEO";
const Product = () => {
    const [open,setOpen]=useState(false)
    const [openId,setOpenId]=useState()
    const [show, setShow] = useState(false);
    const [category,setCategory]=useState([])
    const [subCategory,setSubCategory]=useState([])
    const [filterProduct,setFilterProduct]=useState([])
    const [countPage,setCountPage]=useState()
    const [currentPage,setCurrentPage]=useState(1)
    const [id,setId]=useState()
    const [value,setValue]=useState()
    const[check1,setChek1]=useState(false)
    const[check2,setChek2]=useState(false)
    const {t}=useTranslation()

    const [error,setError]=useState();
const handleClick=(id,name)=>{
    localStorage.removeItem("sub")

    localStorage.setItem("name",name)
        axiosInstance.get(`/category/${id}/`).then((res)=>{
            setSubCategory(res.data)
            console.log(res)
            setOpen(!(open && openId === id))
            setOpenId(id)
        })


}

const handleClickSubCategory=async (id,count,name) => {
    localStorage.setItem("sub",name)
        setId(id)
    try {
        await axiosInstance.get(`/subproduct/${id}/?limit=8&page_number=${count}`).then((res) => {
            setFilterProduct(res.data.results)
            setCountPage(res.data.count)
            console.log(res)
        })
    } catch (error) {
        setFilterProduct([]);
        console.log(error)
        if (error.code === 'ECONNABORTED') {
            console.log("The request timed out.");
        } else {
            console.log("An error occurred:", error.message);
        }
    }

}

    const showDrawer = () => {
        setShow(true);
    };
    const onClose = () => {
        setShow(false);
    };
    useEffect(()=>{
        localStorage.removeItem("name")
        localStorage.removeItem("sub")
        axiosInstance.get("/category/").then((res)=>{
           setCategory(res.data)
        })
        getProductAll(1)

    },[])
    const getProductAll = (page)=>{
        axiosInstance.get(`/products/?limit=8&page_number=${page}`).then((res)=>{
            setFilterProduct(res.data.results)
            setCountPage(res.data.count)
        }).catch((error)=>{
        })
    }
    const handleChange=(page)=>{
        setCurrentPage(page)

        if(id){
            if(!value){
                handleClickSubCategory(id,page)
            }
            else {

                getProduct(value,page)
            }
        }
        else {
            console.log(value===undefined)
            console.log(value)
            if(value===undefined||value===''){
                getProductAll(page)
            }
            else {
                filter(value,page)

            }
        }


    }
const filter=(quary,page)=> {

    axiosInstance
        .get(`/filter/${quary}/?limit=8&page_number=${page}`)
        .then((res) => {
            setFilterProduct(res.data.results);
            setCountPage(res.data.count);
            console.log(res.data);
        })
        .catch((err) => {
            setFilterProduct([])
            setError({
                ...error,
                err,
            });
        });
}

    const handleClickCheck1 = ()=>{
        if(id){
        setChek1(!check1)
        setChek2(false)
            if(!check1){
                setValue("sale")
                getProduct("sale",1)
            }else {
                setValue("")
                handleClickSubCategory(id,1)
            }
        }
        else {
            setChek1(!check1)
            setChek2(false)
            if(!check1){
                setValue("sale")
                filter("sale",1)
            }else {
                setValue("")
                getProductAll(1)
            }
        }
    }
    const handleClickCheck2 = ()=>{
        if(id){
        setChek2(!check2)
        setChek1(false)
        setValue("order")

            if(!check2){
                setValue("order")
                getProduct("order",1)
            }else {
                setValue("")
                handleClickSubCategory(id,1)
            }
        }
        else {
            setChek2(!check2)
            setChek1(false)
            setValue("order")

            if(!check2){
                setValue("order")
                filter("order",1)
            }else {
                setValue("")
                getProductAll(1)
            }
        }
    }
const getProduct=(value,page)=>{
    axiosInstance.get(`/product/${value}/get/${id}/?page_number=${page}&limit=8`).then((res)=>{
        setFilterProduct(res.data.results)
        setCountPage(res.data.count)
    }).catch((err)=>{
        setFilterProduct([])
        setError(
            {
                ...error,
                err
            }
        )

    })
    }
    const handleSelectChange = (value) =>{
        if(id){
            setValue(value.value)

            if(value.value!==''){
                setValue(value.value)
                getProduct(value.value,1)
            }else {
                setValue(value.value)
                handleClickSubCategory(id,1,localStorage.getItem("sub"))
            }
        }
        else {
            setValue(value.value)

            if(value.value!==''){
                setValue(value.value)
                filter(value.value,1)
            }else {
                setValue("")
                getProductAll(1)
            }
        }
    }

    return (
        <>{category.length===0?<NotFoundProduct title={"Iltimos kuting..."}/>:
            <div>
                <Breadcrumb
                    items={[
                        {
                            title: <NavLink to="/">{t("Bosh sahifa")}</NavLink>,
                        },
                        {
                            title: localStorage.getItem("name"),
                        },
                        {
                            title: localStorage.getItem("sub"),
                        },
                    ]}
                />
                <div className="up">
                    <div className="category">{!localStorage.getItem("name")?<>{t("Mahsulotlar")}</>:<>{localStorage.getItem("name")}</>}</div>
                    <div>
                        <Select
                            size={"large"}

                            labelInValue
                            defaultValue={{
                                value: '',
                                label: t("Hammasi"),
                            }}
                            style={{
                                width: 150,
                            }}
                            onChange={handleSelectChange}
                            const options = {[
                            {
                                value: '',
                                label: t("Hammasi"),
                            },
                            {
                                value: 'order',
                                label: t("Buyurtma asosida"),
                            },
                            {
                                value: 'sale',
                                label: t("Sotuvda mavjud"),
                            },
                        ]}
                        />
                    </div>
                </div>
                <SEO/>
                <div className="products">

                    <div className="filters">
                        <h3>{t("Kategoriyalar")}</h3>
                        {
                            category.map((category=>(
                                <div className="collapse">
                                    <button onClick={()=>handleClick(category.id,category[`name_${localStorage.getItem("value")}`])} className={open&&openId===category.id?'collapse-header active':'collapse-header'}>
                                        <i className= {open&&openId===category.id?'bx bx-chevron-right active':'bx bx-chevron-right'} ></i> {category[`name_${localStorage.getItem("value")}`]}
                                    </button>
                                    <div className={open&&openId===category.id?'collapse-body active':'collapse-body'}>
                                        {
                                            subCategory.map((subCategory)=>(
                                                <div onClick={()=>handleClickSubCategory(subCategory.id,1,subCategory[`name_${localStorage.getItem("value")}`])} className={id===subCategory.id?'navlink active':"navlink"} >{subCategory[`name_${localStorage.getItem("value")}`]}</div>
                                            ))
                                        }

                                    </div>

                                </div>
                            )))
                        }

                    </div>

                    <Drawer className="drawer" title={t("Filter")} placement="left" onClose={onClose} open={show}>
                        <h3 style={{marginBottom:20}}>{t("Kategoriyalar")}</h3>
                        <div className="collapse">
                            {
                                category.map((category=>(
                                    <div className="collapse">
                                        <button onClick={()=>handleClick(category.id,category[`name_${localStorage.getItem("value")}`])} className="collapse-header">
                                            {category[`name_${localStorage.getItem("value")}`]} <i className= {open&&openId===category.id?'bx bx-chevron-right active':'bx bx-chevron-right'} ></i>
                                        </button>
                                        <div className={open&&openId===category.id?'collapse-body active':'collapse-body'}>
                                            {
                                                subCategory.map((subCategory)=>(
                                                    <div onClick={()=>handleClickSubCategory(subCategory.id,1,subCategory[`name_${localStorage.getItem("value")}`])} className="navlink" >{subCategory[`name_${localStorage.getItem("value")}`]}</div>
                                                ))
                                            }

                                        </div>

                                    </div>
                                )))
                            }

                        </div>
                        <h3>{t("Filter")}</h3>

                        <Checkbox checked={check1} onClick={handleClickCheck1} >{t("Sotuvda mavjud")}</Checkbox>
                        <Checkbox checked={check2} onClick={handleClickCheck2} >{t("Buyurtma asosida")}</Checkbox>

                    </Drawer>

                    <div className="main">
                        <button className="filter" onClick={showDrawer}>
                            <i className='bx bx-filter-alt' ></i> Filter
                        </button>
                        <div className="right-side">
                            {filterProduct.length===0?<>
                                <NotFoundProduct title={"Tanlangan filter bo'yicha mahsulot mavjud emas"}/>
                            </>:<>
                                <div className="products">
                                    {
                                        filterProduct.map((product)=>(
                                            <BaseProducts key={product.id} product={product}/>
                                        ))
                                    }
                                </div>
                                <Pagination onChange={handleChange} responsive={true} defaultPageSize={8} className="paginition" size="large" simple defaultCurrent={1} current={currentPage} total={countPage} />

                            </>
                            }
                        </div>

                    </div>

                </div>
            </div>


        }

        </>

    );
};

export default Product;