module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "./src/build.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
