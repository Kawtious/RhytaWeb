const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    entry: {
        authCheckOnLoad: './src/scripts/plugins/AuthCheckOnLoad.plugin.ts',
        logoutOnLoad: './src/scripts/plugins/LogoutOnLoad.plugin.ts',
        index: './src/scripts/pages/Index.script.ts',
        home: './src/scripts/pages/Home.script.ts',
        registerUser: './src/scripts/pages/auth/RegisterUser.script.ts',
        loginUser: './src/scripts/pages/auth/LoginUser.script.ts',
        careersMenu: './src/scripts/pages/menus/CareersMenu.script.ts',
        coursesMenu: './src/scripts/pages/menus/CoursesMenu.script.ts'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new Dotenv(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000
    }
};
