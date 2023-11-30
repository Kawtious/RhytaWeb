# RhytaWeb

[issues-shield]: https://img.shields.io/github/issues/Kawtious/RhytaWeb.svg?style=for-the-badge

[issues-url]: https://github.com/Kawtious/RhytaWeb/issues

[license-shield]: https://img.shields.io/github/license/Kawtious/RhytaWeb.svg?style=for-the-badge

[license-url]: https://github.com/Kawtious/RhytaWeb/blob/master/LICENSE

[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Kawtious/RhytaWeb.git
    ```

2. Change into the project directory:

    ```bash
    cd RhytaWeb
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Configure the API connection:

   This project connects to the Rhyta API to perform requests. (
   See [RhytaServerJS](https://github.com/Kawtious/RhytaServerJS))

   To configure the API connection, you must create a `.env` file in the root directory of the project. This file will
   contain environment variables that store the database connection information. Here's how to set it up:

   In the root directory of the project, create a `.env` file:

    ```bash
    touch .env
    ```

   Open the `.env` file using a text editor.

   Add the following environment variables with your MySQL database information:

    ```plaintext
    API_BASE_URL="your_api_base_url"         # "http://localhost:3000"
    API_VERSION=your_api_version             # 1
    ```

   Replace `your_api_base_url` and `your_api_version` with the actual API connection details.

5. Start the server:

    ```bash
    npm run dev
    ```

   This will run a Webpack server on port 4000. You can access the website through http://localhost:4000 in your
   browser.
   Make sure the Rhyta API is online, whether it's your own instance of the API, or an instance hosted somewhere else;
   otherwise you won't be able to do much in the website.

## Contributing

This project is meant to develop specific features and functionalities of another system using web frameworks
specifically. Basically, this project is meant for educational purposes. Therefore, we have intentionally limited
contributions to ensure the project remains aligned with its educational objectives.

## License

This application is open-source and available under the [MIT License](LICENSE).

## Authors

- [Kawtious](https://github.com/Kawtious)

- [Zeferito](https://github.com/Zeferito)

Feel free to reach out if you have any questions or need assistance with this application.
