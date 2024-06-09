
import React, { useState } from 'react';
import './CustomCarusel.css';

const Carousel = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);


    const handleClickDot = (index) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };



    return (
        <div className="carousel-container1">
            <div className="main-carusel">
                <div className="main-track">
                    <div className="carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {data.map((item) => (
                            <div
                                className="carousel-slide"
                                key={item.id}

                            >
                                <img
                                    src={item.photo}
                                    alt={item.caption}

                                />
                            </div>
                        ))}
                    </div>
                    <button className="prev-btn" onClick={prevSlide}>
                        <i className='bx bx-chevron-left'></i>
                    </button>
                    <button className="next-btn" onClick={nextSlide}>
                        <i className='bx bx-chevron-right'></i>
                    </button>
                </div>
                <div className="carousel-dots">
                    {data.map((_, index) => (
                        <div
                            key={index}
                            className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => handleClickDot(index)}
                        >
                            <img
                                src={data[index].photo}
                                alt={`Dot ${index + 1}`}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default Carousel;
