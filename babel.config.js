module.exports = function(api) {
    api.cache(true);

    return {
        presets: [
            [
                "@babel/env",
                { targets: "> 0.25%", useBuiltIns: "usage", corejs: 3 }
            ],
            ["@babel/preset-typescript", { allExtensions: true, isTSX: true }]
        ],
        plugins: [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-async-to-generator",
            "@babel/plugin-syntax-dynamic-import",
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
            "@babel/plugin-transform-typescript"
        ]
    };
};
