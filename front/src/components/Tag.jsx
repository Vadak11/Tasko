// eslint-disable-next-line react/prop-types
export const Tag = ({ bgColor, text }) => {
    return (
        <span
            className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 ${bgColor} rounded-full dark:text-gray-300`}
        >
            {text}
        </span>
    );
};