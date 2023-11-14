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
import Cookies from 'js-cookie';

import { axiosInstance } from '../../configuration/Axios.configuration';
import { UserRequest } from '../../requests/User.request';

const userRequest = new UserRequest();

export async function resetTokenCookie() {
    Cookies.remove('jwt-auth-token');
}

export async function authenticate(token: string): Promise<boolean> {
    Cookies.set('jwt-auth-token', token);

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return userRequest
        .getFromAuthHeader()
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
