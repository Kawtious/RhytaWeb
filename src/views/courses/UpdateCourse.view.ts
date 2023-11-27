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
import { CourseDto } from '../../dto/Course.dto';
import { CourseRequest } from '../../requests/Course.request';

const courseRequest = new CourseRequest();

$(async () => {
    $('#form-course-update-button-update').on('click', function (e) {
        e.preventDefault();

        const id = $('#form-course-update-input-id').val() as string;
        const version = $('#form-course-update-input-version').val() as string;
        const name = $('#form-course-update-input-name').val() as string;
        const description = $(
            '#form-course-update-input-description'
        ).val() as string;
        const careerId = $(
            '#form-course-update-input-career-id'
        ).val() as string;

        const courseDto: CourseDto = {
            version: parseInt(version),
            name: name,
            description: description,
            careerId: parseInt(careerId)
        };

        courseRequest
            .update(parseInt(id), courseDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
