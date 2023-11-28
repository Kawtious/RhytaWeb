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
import { ProfessorEventDto } from '../../../../dto/ProfessorEvent.dto';
import { ProfessorEventRequest } from '../../../../requests/ProfessorEvent.request';
import { refreshAuthToken } from '../../../../utils/cookies/JwtAuth.util';

const professorEventRequest = new ProfessorEventRequest();

$(async () => {
    await refreshAuthToken();

    $('#professor-event-update-button').on('click', function (e) {
        e.preventDefault();

        const professorId = $(
            '#professor-event-professor-id-input'
        ).val() as string;
        const id = $('#professor-event-id-input').val() as string;
        const version = $('#professor-event-version-input').val() as string;
        const title = $('#professor-event-title-input').val() as string;
        const description = $(
            '#professor-event-description-input'
        ).val() as string;
        const startDate = $(
            '#professor-event-start-date-input'
        ).val() as string;
        const endDate = $('#professor-event-end-date-input').val() as string;

        const professorEventDto: ProfessorEventDto = {
            version: parseInt(version),
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        professorEventRequest
            .updateByProfessorId(
                parseInt(professorId),
                parseInt(id),
                professorEventDto
            )
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
