const emailRegex = /\S+@\S+\.\S+/;
const blankRegex = /^\s*$/;
const orderNumberRegex = /^\d{9}$/;
export const emailValidator = (email) => {
    return emailRegex.test(email);
};

export const blankValidator = (content) => {
    return blankRegex.test(content);
};


export const orderNumberValidator = (orderNumber) => {
    return orderNumberRegex.test(orderNumber);
}