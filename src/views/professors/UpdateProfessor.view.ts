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
import { ProfessorDto } from '../../dto/Professor.dto';
import { ProfessorRequest } from '../../requests/Professor.request';

const professorRequest = new ProfessorRequest();

$(async () => {
    $('#form-course-update-button-update').on('click', function (e) {
        e.preventDefault();

        const id = $('#form-course-update-input-id').val() as string;
        const version = $('#form-course-update-input-version').val() as string;
        const firstName = $(
            '#form-professor-update-input-first-name'
        ).val() as string;
        const lastName = $(
            '#form-professor-update-input-last-name'
        ).val() as string;

        const professorDto: ProfessorDto = {
            version: parseInt(version),
            firstName: firstName,
            lastName: lastName
        };

        professorRequest
            .update(parseInt(id), professorDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
