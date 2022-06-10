const emailRegex = /\S+@\S+\.\S+/;
const blankRegex = /^\s*$/;
const orderNumberRegex = /^\d{9}$/;
const imageExt = [".png", ".jpg", ".jpeg", ".bmp", ".jfif"];
export const emailValidator = (email) => {
    return emailRegex.test(email);
};

export const blankValidator = (content) => {
    return blankRegex.test(content);
};


export const orderNumberValidator = (orderNumber) => {
    return orderNumberRegex.test(orderNumber);
}

export const imageExtensionChecker = (ext) => {
    return imageExt.includes(ext);
};

export const getExtention = (filename) => {
    const fileLen = filename.length;
    const lastDot = filename.lastIndexOf(".");
    const fileExt = filename.substring(lastDot, fileLen).toLowerCase();
    return fileExt;
};


