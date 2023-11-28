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
        insertCareer: './src/scripts/pages/api/careers/InsertCareer.script.ts',
        updateCareer: './src/scripts/pages/api/careers/UpdateCareer.script.ts',
        deleteCareer: './src/scripts/pages/api/careers/DeleteCareer.script.ts',
        insertCourse: './src/scripts/pages/api/courses/InsertCourse.script.ts',
        updateCourse: './src/scripts/pages/api/courses/UpdateCourse.script.ts',
        deleteCourse: './src/scripts/pages/api/courses/DeleteCourse.script.ts',
        insertProfessor:
            './src/scripts/pages/api/professors/InsertProfessor.script.ts',
        updateProfessor:
            './src/scripts/pages/api/professors/UpdateProfessor.script.ts',
        deleteProfessor:
            './src/scripts/pages/api/professors/DeleteProfessor.script.ts',
        insertProfessorEvent:
            './src/scripts/pages/api/professorEvents/InsertProfessorEvent.script.ts',
        updateProfessorEvent:
            './src/scripts/pages/api/professorEvents/UpdateProfessorEvent.script.ts',
        deleteProfessorEvent:
            './src/scripts/pages/api/professorEvents/DeleteProfessorEvent.script.ts',
        insertTerm: './src/scripts/pages/api/terms/InsertTerm.script.ts',
        updateTerm: './src/scripts/pages/api/terms/UpdateTerm.script.ts',
        deleteTerm: './src/scripts/pages/api/terms/DeleteTerm.script.ts'
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
