import React from 'react';
import "./Button.css"

const variantStyles = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-300 text-purple-400",
}

const defaultStyles = "rounded-md flex px-4 py-2 font-light justify-center items-center"

function Button(props) {
    return (
        <button 
            onClick={props.onClick} 
            className={`cursor-pointer ${variantStyles[props.variant]} ${defaultStyles}`}
        >
            {props.startIcon && <div className='pr-2 pb-1'>{props.startIcon}</div>}
            {props.text}
            {props.endIcon}
        </button>
    );
}

Button.defaultProps = {
    variant: "primary",
    size: "md",
    text: "",
    startIcon: null,
    endIcon: null,
    onClick: () => {}
};

export default Button;
