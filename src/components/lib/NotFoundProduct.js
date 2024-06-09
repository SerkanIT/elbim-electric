import React from 'react';
import Logo from '../../media/penguin.webp'
import './NotFoundProduct.scss'
const NotFoundProduct = ({title}) => {
    return (
        <div className="notFoundWrapper">
            <div className="notFound">
                <div className="not-found">
                    <img src={Logo} alt="Nothing"/>
                </div>
                <div className="title">{title}</div>
                <div className="comment">Qaytadan urinib ko'ring</div>
            </div>

        </div>
    );
};

export default NotFoundProduct;