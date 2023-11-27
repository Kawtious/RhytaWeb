/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { LoginRequestDto } from '../../dto/LoginRequest.dto';
import { AuthRequest } from '../../requests/Auth.request';
import { authenticate } from '../../utils/cookies/JwtAuth.util';

const authRequest = new AuthRequest();

$(async () => {
    $('#form-login-button-login').on('click', function (e) {
        e.preventDefault();

        const identifier = $('#form-login-input-identifier').val() as string;
        const password = $('#form-login-input-password').val() as string;

        const registerUserDto: LoginRequestDto = {
            identifier: identifier,
            password: password
        };

        authRequest
            .login(registerUserDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));
                return authenticate(result.data.accessToken);
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
