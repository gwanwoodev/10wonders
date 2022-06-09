const emailRegex = /\S+@\S+\.\S+/;
const blankRegex = /^\s*$/;

export const emailValidator = (email) => {
    return emailRegex.test(email);
};

export const blankValidator = (content) => {
    return blankRegex.test(content);
};
