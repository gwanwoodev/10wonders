export const createOrderNumber = () => {
    let orderNumber = '';
    const date = new Date();
    const YY = date.getFullYear().toString().substring(2, 4);
    const month = date.getMonth() + 1;
    const MM = month < 10 ? `0${month}` : `${month}`;
    const DD = date.getDay();

    let str = '';
    for (let i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10);
    };

    orderNumber = `${YY}${MM}${DD}${str}`;

    return orderNumber;



}