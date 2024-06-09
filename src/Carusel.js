import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './components/MainPage/MainPage.scss'
import {Skeleton} from "antd";
import './Carusel.scss'

const Carousel = ({data,settings,style,className}) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const img = new Image();
        img.src = data.photo;
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
        };
    }, [data.photo]);
    return (
        isLoading ? (
            <Skeleton.Image className="skelation" active={true} size={'large'}  />
        ) : (
            <div className="carousel-container">
                <Slider {...settings} className={className}>
                    {data?.map((item) => (
                        <div className={"item"} key={item.id}>
                            {item.url?<a target="_blank" href={item.url} rel="noreferrer">
                                <img style={style} src={item.photo} alt={item.id} />

                            </a>:

                                    <img style={style} src={item.photo} alt={item.id} />


                            }

                        </div>
                    ))}
                </Slider>
            </div>
        )
    );
};

export default Carousel;