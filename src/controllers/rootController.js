export const home = (req, res) => {
    return res.render("home", { pageTitle: "Main" });
}

export const shop = (req, res) => {
    return res.render("shop", { pageTitle: "Shop" });
}