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
import '../../css/styles.css';
import { TermDto } from '../../dto/Term.dto';
import { Term } from '../../entities/Term.entity';
import { TermRequest } from '../../requests/Term.request';
import { hideElement, showElement } from '../../utils/ElementVisibility.util';
import { setupHeader } from '../../utils/HeaderSetup.util';
import { refreshAuthToken } from '../../utils/cookies/JwtAuth.util';

const termRequest = new TermRequest();

let selectedTerm: Term | null;

async function refreshTermsList() {
    const termsTable = $('#terms-table');

    // Store headers row before removing it
    const termsTableHeadersRow = $('#terms-table-headers-row');

    const termInsertSection = $('#term-insert-section');
    const termUpdateDeleteSection = $('#term-update-delete-section');

    const termInsertTitleInput = $('#term-insert-title-input');
    const termInsertDescriptionInput = $('#term-insert-description-input');
    const termInsertStartDateInput = $('#term-insert-start-date-input');
    const termInsertEndDateInput = $('#term-insert-end-date-input');

    const termUpdateTitleInput = $('#term-update-title-input');
    const termUpdateDescriptionInput = $('#term-update-description-input');
    const termUpdateStartDateInput = $('#term-update-start-date-input');
    const termUpdateEndDateInput = $('#term-update-end-date-input');

    termRequest.getAll().then((result) => {
        termsTable.html('');

        termsTable.append(termsTableHeadersRow);

        for (const term of result.data) {
            const termRow = document.createElement('tr');
            termRow.classList.add('table-row');

            termRow.onclick = async function () {
                if (selectedTerm == term) {
                    termRow.classList.remove('table-row-selected');

                    showElement(termInsertSection);
                    hideElement(termUpdateDeleteSection);

                    selectedTerm = null;
                    termUpdateTitleInput.val('');
                    termUpdateDescriptionInput.val('');
                    termUpdateStartDateInput.val('');
                    termUpdateEndDateInput.val('');

                    return;
                }

                $('.table-row-selected').removeClass('table-row-selected');

                termRow.classList.add('table-row-selected');

                showElement(termUpdateDeleteSection);
                hideElement(termInsertSection);

                termInsertTitleInput.val('');
                termInsertDescriptionInput.val('');
                termInsertStartDateInput.val('');
                termInsertEndDateInput.val('');

                selectedTerm = term;
                termUpdateTitleInput.val(term.title);
                termUpdateDescriptionInput.val(term.description);
                termUpdateStartDateInput.val(
                    new Date(term.startDate).toISOString().slice(0, 10)
                );
                termUpdateEndDateInput.val(
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

    await setupHeader();

    const termInsertSection = $('#term-insert-section');
    const termUpdateDeleteSection = $('#term-update-delete-section');

    const termInsertButton = $('#term-insert-button');
    const termUpdateButton = $('#term-update-button');
    const termDeleteButton = $('#term-delete-button');

    const termInsertTitleInput = $('#term-insert-title-input');
    const termInsertDescriptionInput = $('#term-insert-description-input');
    const termInsertStartDateInput = $('#term-insert-start-date-input');
    const termInsertEndDateInput = $('#term-insert-end-date-input');

    const termUpdateTitleInput = $('#term-update-title-input');
    const termUpdateDescriptionInput = $('#term-update-description-input');
    const termUpdateStartDateInput = $('#term-update-start-date-input');
    const termUpdateEndDateInput = $('#term-update-end-date-input');

    const responseMessage = $('#response-message');

    termInsertButton.on('click', async function (e) {
        e.preventDefault();

        const title = termInsertTitleInput.val() as string;
        const description = termInsertDescriptionInput.val() as string;
        const startDate = termInsertStartDateInput.val() as string;
        const endDate = termInsertEndDateInput.val() as string;

        const termDto: TermDto = {
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        termRequest
            .insert(termDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                termInsertTitleInput.val('');
                termInsertDescriptionInput.val('');
                termInsertStartDateInput.val('');
                termInsertEndDateInput.val('');

                return refreshTermsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    termUpdateButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedTerm) {
            return;
        }

        const id = selectedTerm.id;
        const version = selectedTerm.version;
        const title = termUpdateTitleInput.val() as string;
        const description = termUpdateDescriptionInput.val() as string;
        const startDate = termUpdateStartDateInput.val() as string;
        const endDate = termUpdateEndDateInput.val() as string;

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
                responseMessage.text(JSON.stringify(result.data));

                showElement(termInsertSection);
                hideElement(termUpdateDeleteSection);

                selectedTerm = null;
                termUpdateTitleInput.val('');
                termUpdateDescriptionInput.val('');
                termUpdateStartDateInput.val('');
                termUpdateEndDateInput.val('');

                return refreshTermsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    termDeleteButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedTerm) {
            return;
        }

        const id = selectedTerm.id;

        termRequest
            .delete(id)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(termInsertSection);
                hideElement(termUpdateDeleteSection);

                selectedTerm = null;
                termUpdateTitleInput.val('');
                termUpdateDescriptionInput.val('');
                termUpdateStartDateInput.val('');
                termUpdateEndDateInput.val('');

                return refreshTermsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });
});
