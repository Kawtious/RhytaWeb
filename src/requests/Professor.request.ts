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
import { ProfessorDto } from '../dto/Professor.dto';
import { Professor } from '../entities/Professor.entity';

export class ProfessorRequest {
    private readonly professorEndpoint: string;

    constructor() {
        this.professorEndpoint = 'professors';
    }

    async getAll() {
        return await axiosInstance.get<Professor[]>(
            `/${this.professorEndpoint}`
        );
    }

    async getById(id: number) {
        return await axiosInstance.get<Professor>(
            `/${this.professorEndpoint}/${id}`
        );
    }

    async insert(professorDto: ProfessorDto) {
        return await axiosInstance.post<Professor>(
            `/${this.professorEndpoint}`,
            professorDto
        );
    }

    async update(id: number, professorDto: ProfessorDto) {
        return await axiosInstance.put<Professor>(
            `/${this.professorEndpoint}/${id}`,
            professorDto
        );
    }

    async delete(id: number) {
        return await axiosInstance.delete(`/${this.professorEndpoint}/${id}`);
    }
}
