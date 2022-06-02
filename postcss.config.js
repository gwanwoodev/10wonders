module.exports = {
    plugins: [
        [
            "postcss-preset-env",
            "postcss-custom-properties",
            {
                browsers: ["> 1% in KR", "ie >= 10"],
                autoprefixer: { grid: "autoplace" }
            }
        ]
    ]
}