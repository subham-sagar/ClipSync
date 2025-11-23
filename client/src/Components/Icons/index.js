// sizeOptions = "xs" | "sm" | "md" | "lg"
// export  iconProps {
//     size: sizeOptions;
// }

export const iconSizeVariants = {
    "xs": "size-4",
    "sm": "size-5",
    "md": "size-6",
    "lg": "size-6"
};

// Adding JSDoc comments for better IDE support
/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} SizeOptions
 */

/**
 * @typedef {Object} IconProps
 * @property {SizeOptions} size - The size of the icon
 */