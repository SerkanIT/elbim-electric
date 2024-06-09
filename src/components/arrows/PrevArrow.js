import React from "react";

const PrevArrow = (props) => {
    const { className, onClick } = props;
    const stylePrew = {
        display: "block",
        transform: "translateX(50px)",
        zIndex:1,

    };

    return (
        <div
            className={className}
            style={ stylePrew }// Customize styles here
            onClick={onClick}
        />
    );
};
export default PrevArrow;