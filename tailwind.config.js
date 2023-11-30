const tailwindDracula = require('tailwind-dracula');
const draculaColors = require('tailwind-dracula/colors');

module.exports = {
    content: ['./src/html/**/*.html', './src/**/*.js', './src/**/*.ts'],
    theme: {
        extend: {
            colors: {
                ...draculaColors,
                mandy: {
                    50: '#fef2f3',
                    100: '#fde6e7',
                    200: '#fbd0d5',
                    300: '#f7aab2',
                    400: '#f27a8a',
                    500: '#ea546c',
                    600: '#d5294d',
                    700: '#b31d3f',
                    800: '#961b3c',
                    900: '#811a39',
                    950: '#48091a'
                }
            }
        }
    },
    plugins: [tailwindDracula('dracula', true)]
};
