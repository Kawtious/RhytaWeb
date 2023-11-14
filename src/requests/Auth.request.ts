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
import { axiosInstance } from '../configuration/Axios.configuration';
import { JwtAuthResponseDto } from '../dto/JwtAuthResponse.dto';
import { LoginRequestDto } from '../dto/LoginRequest.dto';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { User } from '../entities/User.entity';

export class AuthRequest {
    private readonly authEndpoint: string;

    constructor() {
        this.authEndpoint = 'auth';
    }

    async register(registerUserDto: RegisterUserDto) {
        return await axiosInstance.post<User>(
            `/${this.authEndpoint}/register`,
            registerUserDto
        );
    }

    async login(loginRequestDto: LoginRequestDto) {
        return await axiosInstance.post<JwtAuthResponseDto>(
            `/${this.authEndpoint}/login`,
            loginRequestDto
        );
    }
}
