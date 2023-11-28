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
import { TermDto } from '../../../dto/Term.dto';
import { Term } from '../../../entities/Term.entity';
import { TermRequest } from '../../../requests/Term.request';
import { refreshAuthToken } from '../../../utils/cookies/JwtAuth.util';

const termRequest = new TermRequest();

let selectedTerm: Term | null;

async function refreshTermsList() {
    termRequest.getAll().then((result) => {
        const termsTable = $('#terms-table');

        // Store headers row before removing it
        const termsTableHeadersRow = $('#terms-table-headers-row');

        termsTable.html('');

        termsTable.append(termsTableHeadersRow);

        for (const term of result.data) {
            const termRow = document.createElement('tr');
            termRow.style.cursor = 'pointer';
            termRow.onclick = function () {
                selectedTerm = term;

                $('#term-update-title-input').val(term.title);
                $('#term-update-description-input').val(term.description);
                $('#term-update-start-date-input').val(
                    new Date(term.startDate).toISOString().slice(0, 10)
                );
                $('#term-update-end-date-input').val(
                    new Date(term.endDate).toISOString().slice(0, 10)
                );
            };

            const termIdColumn = document.createElement('td');
            termIdColumn.textContent = term.id.toString();

            const termCreatedDateColumn = document.createElement('td');
            termCreatedDateColumn.textContent = term.createdDate.toString();

            const termUpdatedDateColumn = document.createElement('td');
            termUpdatedDateColumn.textContent = term.updatedDate.toString();

            const termVersionColumn = document.createElement('td');
            termVersionColumn.textContent = term.version.toString();

            const termTitleColumn = document.createElement('td');
            termTitleColumn.textContent = term.title;

            const termDescriptionColumn = document.createElement('td');
            termDescriptionColumn.textContent = term.description;

            const termStartDateColumn = document.createElement('td');
            termStartDateColumn.textContent = term.startDate.toString();

            const termEndDateColumn = document.createElement('td');
            termEndDateColumn.textContent = term.endDate.toString();

            termRow.appendChild(termIdColumn);
            termRow.appendChild(termCreatedDateColumn);
            termRow.appendChild(termUpdatedDateColumn);
            termRow.appendChild(termVersionColumn);
            termRow.appendChild(termTitleColumn);
            termRow.appendChild(termDescriptionColumn);
            termRow.appendChild(termStartDateColumn);
            termRow.appendChild(termEndDateColumn);

            termsTable.append(termRow);
        }
    });
}

$(async () => {
    await refreshAuthToken();

    await refreshTermsList();

    $('#term-insert-button').on('click', function (e) {
        e.preventDefault();

        const title = $('#term-insert-title-input').val() as string;
        const description = $('#term-insert-description-input').val() as string;
        const startDate = $('#term-insert-start-date-input').val() as string;
        const endDate = $('#term-insert-end-date-input').val() as string;

        const termDto: TermDto = {
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        termRequest
            .insert(termDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                $('#term-insert-title-input').val('');
                $('#term-insert-description-input').val('');
                $('#term-insert-start-date-input').val('');
                $('#term-insert-end-date-input').val('');

                return refreshTermsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#term-update-button').on('click', function (e) {
        e.preventDefault();

        if (!selectedTerm) {
            return;
        }

        const id = selectedTerm.id;
        const version = selectedTerm.version;
        const title = $('#term-update-title-input').val() as string;
        const description = $('#term-update-description-input').val() as string;
        const startDate = $('#term-update-start-date-input').val() as string;
        const endDate = $('#term-update-end-date-input').val() as string;

        const termDto: TermDto = {
            version: version,
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        termRequest
            .update(id, termDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedTerm = null;
                $('#term-update-title-input').val('');
                $('#term-update-description-input').val('');
                $('#term-update-start-date-input').val('');
                $('#term-update-end-date-input').val('');

                return refreshTermsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#term-delete-button').on('click', function (e) {
        e.preventDefault();

        if (!selectedTerm) {
            return;
        }

        const id = selectedTerm.id;

        termRequest
            .delete(id)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedTerm = null;
                $('#term-update-title-input').val('');
                $('#term-update-description-input').val('');
                $('#term-update-start-date-input').val('');
                $('#term-update-end-date-input').val('');

                return refreshTermsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
