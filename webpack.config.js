const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_JS = "./src/client/js/";

module.exports = {

    entry: {
        main: BASE_JS + "main.js",
        home: BASE_JS + "home.js",
        page: BASE_JS + "page.js",
        shop: BASE_JS + "shop.js",
        cart: BASE_JS + "cart.js",
        order: BASE_JS + "order.js",
        orderResult: BASE_JS + "orderResult.js",
        login: BASE_JS + "login.js",
        dashboard: BASE_JS + "dashboard.js",
        dashboardAdd: BASE_JS + "dashboardAdd.js",
        dashboardUpdate: BASE_JS + "dashboardUpdate.js",
        orderManage: BASE_JS + "orderManage.js",
        orderEstimate: BASE_JS + "orderEstimate.js",
        orderShipping: BASE_JS + "orderShipping.js",
        global: BASE_JS + "global.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css"
        }),
    ],
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: ["last 2 versions", "ie >= 11"],
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },

                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]?[hash]",
                    limit: 10000
                },
            },

        ]
    }
}