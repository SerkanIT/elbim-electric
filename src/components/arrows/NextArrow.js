import React from "react";

const NextArrow = (props) => {
    const { className, onClick } = props;
    const styleNext = {
        display: "block",
        transform: "translateX(-50px)",
        zIndex:1,
    };
    return (
        <div
            className={className}
            style={styleNext} // Customize styles here
            onClick={onClick}
        />
    );
};
export default NextArrow;