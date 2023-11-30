const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sitesConfig = [
    {
        filename: 'index.html',
        template: './src/html/index.html',
        scripts: ['authCheckOnLoad', 'index']
    },
    {
        filename: 'home.html',
        template: './src/html/home.html',
        scripts: ['authCheckOnLoad', 'home']
    },
    {
        filename: 'login.html',
        template: './src/html/auth/login.html',
        scripts: ['login']
    },
    {
        filename: 'logout.html',
        template: './src/html/auth/logout.html',
        scripts: ['logout']
    },
    {
        filename: 'signIn.html',
        template: './src/html/auth/signIn.html',
        scripts: ['signIn']
    },
    {
        filename: 'careers.html',
        template: './src/html/menus/careers.html',
        scripts: ['authCheckOnLoad', 'careersMenu']
    },
    {
        filename: 'courses.html',
        template: './src/html/menus/courses.html',
        scripts: ['authCheckOnLoad', 'coursesMenu']
    },
    {
        filename: 'professors.html',
        template: './src/html/menus/professors.html',
        scripts: ['authCheckOnLoad', 'professorsMenu']
    },
    {
        filename: 'terms.html',
        template: './src/html/menus/terms.html',
        scripts: ['authCheckOnLoad', 'termsMenu']
    }
];

const entryHtmlPlugins = sitesConfig.map(({ filename, template, scripts }) => {
    return new HtmlWebpackPlugin({
        filename: filename,
        template: template,
        chunks: scripts
    });
});

module.exports = {
    entry: {
        authCheckOnLoad: './src/scripts/plugins/AuthCheckOnLoad.plugin.ts',
        index: './src/scripts/Index.script.ts',
        home: './src/scripts/Home.script.ts',
        login: './src/scripts/auth/Login.script.ts',
        logout: './src/scripts/auth/Logout.script.ts',
        signIn: './src/scripts/auth/SignIn.script.ts',
        careersMenu: './src/scripts/menus/CareersMenu.script.ts',
        coursesMenu: './src/scripts/menus/CoursesMenu.script.ts',
        professorsMenu: './src/scripts/menus/ProfessorsMenu.script.ts',
        termsMenu: './src/scripts/menus/TermsMenu.script.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        ...entryHtmlPlugins
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000
    }
};
