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
import { TermDto } from '../../dto/Term.dto';
import { TermRequest } from '../../requests/Term.request';

const termRequest = new TermRequest();

$(async () => {
    $('#form-term-update-button-update').on('click', function (e) {
        e.preventDefault();

        const id = $('#form-term-update-input-id').val() as string;
        const version = $('#form-term-update-input-version').val() as string;
        const title = $('#form-term-update-input-title').val() as string;
        const description = $(
            '#form-term-update-input-description'
        ).val() as string;
        const startDate = $(
            '#form-term-update-input-start-date'
        ).val() as string;
        const endDate = $('#form-term-update-input-end-date').val() as string;

        const termDto: TermDto = {
            version: parseInt(version),
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        termRequest
            .update(parseInt(id), termDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
