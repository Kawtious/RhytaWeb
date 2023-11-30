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
import { ProfessorDto } from '../../dto/Professor.dto';
import { ProfessorEventDto } from '../../dto/ProfessorEvent.dto';
import { Professor } from '../../entities/Professor.entity';
import { ProfessorEvent } from '../../entities/ProfessorEvent.entity';
import { ProfessorRequest } from '../../requests/Professor.request';
import { ProfessorEventRequest } from '../../requests/ProfessorEvent.request';
import { hideElement, showElement } from '../../utils/ElementVisibility.util';
import { setupHeader } from '../../utils/HeaderSetup.util';
import { refreshAuthToken } from '../../utils/cookies/JwtAuth.util';

const professorRequest = new ProfessorRequest();
const professorEventRequest = new ProfessorEventRequest();

let selectedProfessor: Professor | null;
let selectedProfessorEvent: ProfessorEvent | null;

async function refreshProfessorsList() {
    const professorsTable = $('#professors-table');
    const professorEventsTable = $('#professor-events-table');

    // Store headers row before removing it
    const professorsTableHeadersRow = $('#professors-table-headers-row');
    const professorEventsTableHeadersRow = $(
        '#professor-events-table-headers-row'
    );

    const professorInsertSection = $('#professor-insert-section');
    const professorUpdateDeleteSection = $('#professor-update-delete-section');

    const professorEventInsertSection = $('#professor-event-insert-section');
    const professorEventUpdateDeleteSection = $(
        '#professor-event-update-delete-section'
    );

    const professorInsertFirstNameInput = $(
        '#professor-insert-first-name-input'
    );
    const professorInsertLastNameInput = $('#professor-insert-last-name-input');

    const professorUpdateFirstNameInput = $(
        '#professor-update-first-name-input'
    );
    const professorUpdateLastNameInput = $('#professor-update-last-name-input');

    const professorEventInsertTitleInput = $(
        '#professor-event-insert-title-input'
    );
    const professorEventInsertDescriptionInput = $(
        '#professor-event-insert-description-input'
    );
    const professorEventInsertStartDateInput = $(
        '#professor-event-insert-start-date-input'
    );
    const professorEventInsertEndDateInput = $(
        '#professor-event-insert-end-date-input'
    );

    const professorEventUpdateTitleInput = $(
        '#professor-event-update-title-input'
    );
    const professorEventUpdateDescriptionInput = $(
        '#professor-event-update-description-input'
    );
    const professorEventUpdateStartDateInput = $(
        '#professor-event-update-start-date-input'
    );
    const professorEventUpdateEndDateInput = $(
        '#professor-event-update-end-date-input'
    );

    professorRequest.getAll().then((result) => {
        professorsTable.html('');
        professorEventsTable.html('');

        professorsTable.append(professorsTableHeadersRow);
        professorEventsTable.append(professorEventsTableHeadersRow);

        for (const professor of result.data) {
            const professorRow = document.createElement('tr');
            professorRow.classList.add('table-row');

            professorRow.onclick = async function () {
                if (selectedProfessor == professor) {
                    professorRow.classList.remove('table-row-selected');

                    showElement(professorsTable);
                    showElement(professorInsertSection);
                    hideElement(professorUpdateDeleteSection);
                    hideElement(professorEventsTable);
                    hideElement(professorEventInsertSection);
                    hideElement(professorEventUpdateDeleteSection);

                    selectedProfessor = null;
                    professorUpdateFirstNameInput.val('');
                    professorUpdateLastNameInput.val('');

                    await refreshProfessorEventsList();

                    return;
                }

                $('.table-row-selected').removeClass('table-row-selected');

                professorRow.classList.add('table-row-selected');

                showElement(professorUpdateDeleteSection);
                showElement(professorEventsTable);
                showElement(professorEventInsertSection);
                hideElement(professorsTable);
                hideElement(professorInsertSection);

                professorInsertFirstNameInput.val('');
                professorInsertLastNameInput.val('');

                selectedProfessorEvent = null;
                professorEventInsertTitleInput.val('');
                professorEventInsertDescriptionInput.val('');
                professorEventInsertStartDateInput.val('');
                professorEventInsertEndDateInput.val('');
                professorEventUpdateTitleInput.val('');
                professorEventUpdateDescriptionInput.val('');
                professorEventUpdateStartDateInput.val('');
                professorEventUpdateEndDateInput.val('');

                selectedProfessor = professor;
                professorUpdateFirstNameInput.val(professor.firstName);
                professorUpdateLastNameInput.val(professor.lastName);

                await refreshProfessorEventsList();
            };

            const professorIdColumn = document.createElement('td');
            professorIdColumn.textContent = professor.id.toString();

            const professorCreatedDateColumn = document.createElement('td');
            professorCreatedDateColumn.textContent =
                professor.createdDate.toString();

            const professorUpdatedDateColumn = document.createElement('td');
            professorUpdatedDateColumn.textContent =
                professor.updatedDate.toString();

            const professorVersionColumn = document.createElement('td');
            professorVersionColumn.textContent = professor.version.toString();

            const professorFirstNameColumn = document.createElement('td');
            professorFirstNameColumn.textContent = professor.firstName;

            const professorLastNameColumn = document.createElement('td');
            professorLastNameColumn.textContent = professor.lastName;

            professorRow.appendChild(professorIdColumn);
            professorRow.appendChild(professorCreatedDateColumn);
            professorRow.appendChild(professorUpdatedDateColumn);
            professorRow.appendChild(professorVersionColumn);
            professorRow.appendChild(professorFirstNameColumn);
            professorRow.appendChild(professorLastNameColumn);

            professorsTable.append(professorRow);
        }
    });
}

async function refreshProfessorEventsList() {
    const professorEventsTable = $('#professor-events-table');

    // Store headers row before removing it
    const professorEventsTableHeadersRow = $(
        '#professor-events-table-headers-row'
    );

    const professorEventInsertSection = $('#professor-event-insert-section');
    const professorEventUpdateDeleteSection = $(
        '#professor-event-update-delete-section'
    );

    const professorEventUpdateTitleInput = $(
        '#professor-event-update-title-input'
    );
    const professorEventUpdateDescriptionInput = $(
        '#professor-event-update-description-input'
    );
    const professorEventUpdateStartDateInput = $(
        '#professor-event-update-start-date-input'
    );
    const professorEventUpdateEndDateInput = $(
        '#professor-event-update-end-date-input'
    );

    professorEventsTable.html('');

    professorEventsTable.append(professorEventsTableHeadersRow);

    if (!selectedProfessor) {
        return;
    }

    const professorId = selectedProfessor.id;

    professorEventRequest.getAllByProfessorId(professorId).then((result) => {
        for (const professorEvent of result.data) {
            const professorEventRow = document.createElement('tr');

            professorEventRow.onclick = async function () {
                if (selectedProfessorEvent == professorEvent) {
                    professorEventRow.classList.remove('table-row-selected');

                    showElement(professorEventInsertSection);
                    hideElement(professorEventUpdateDeleteSection);

                    selectedProfessorEvent = null;
                    professorEventUpdateTitleInput.val('');
                    professorEventUpdateDescriptionInput.val('');
                    professorEventUpdateStartDateInput.val('');
                    professorEventUpdateEndDateInput.val('');

                    return;
                }

                $('.table-row-selected').removeClass('table-row-selected');

                professorEventRow.classList.add('table-row-selected');

                showElement(professorEventUpdateDeleteSection);
                hideElement(professorEventInsertSection);

                selectedProfessorEvent = professorEvent;
                professorEventUpdateTitleInput.val(professorEvent.title);
                professorEventUpdateDescriptionInput.val(
                    professorEvent.description
                );
                professorEventUpdateStartDateInput.val(
                    new Date(professorEvent.startDate)
                        .toISOString()
                        .slice(0, 10)
                );
                professorEventUpdateEndDateInput.val(
                    new Date(professorEvent.endDate).toISOString().slice(0, 10)
                );
            };

            const professorEventIdColumn = document.createElement('td');
            professorEventIdColumn.textContent = professorEvent.id.toString();

            const professorEventCreatedDateColumn =
                document.createElement('td');
            professorEventCreatedDateColumn.textContent =
                professorEvent.createdDate.toString();

            const professorEventUpdatedDateColumn =
                document.createElement('td');
            professorEventUpdatedDateColumn.textContent =
                professorEvent.updatedDate.toString();

            const professorEventVersionColumn = document.createElement('td');
            professorEventVersionColumn.textContent =
                professorEvent.version.toString();

            const professorEventTitleColumn = document.createElement('td');
            professorEventTitleColumn.textContent = professorEvent.title;

            const professorEventDescriptionColumn =
                document.createElement('td');
            professorEventDescriptionColumn.textContent =
                professorEvent.description;

            const professorEventStartDateColumn = document.createElement('td');
            professorEventStartDateColumn.textContent =
                professorEvent.startDate.toString();

            const professorEventEndDateColumn = document.createElement('td');
            professorEventEndDateColumn.textContent =
                professorEvent.endDate.toString();

            professorEventRow.appendChild(professorEventIdColumn);
            professorEventRow.appendChild(professorEventCreatedDateColumn);
            professorEventRow.appendChild(professorEventUpdatedDateColumn);
            professorEventRow.appendChild(professorEventVersionColumn);
            professorEventRow.appendChild(professorEventTitleColumn);
            professorEventRow.appendChild(professorEventDescriptionColumn);
            professorEventRow.appendChild(professorEventStartDateColumn);
            professorEventRow.appendChild(professorEventEndDateColumn);

            professorEventsTable.append(professorEventRow);
        }
    });
}

$(async () => {
    await refreshAuthToken();

    await refreshProfessorsList();

    await refreshProfessorEventsList();

    await setupHeader();

    const professorsTable = $('#professors-table');
    const professorEventsTable = $('#professor-events-table');

    const professorInsertSection = $('#professor-insert-section');
    const professorUpdateDeleteSection = $('#professor-update-delete-section');

    const professorEventInsertSection = $('#professor-event-insert-section');
    const professorEventUpdateDeleteSection = $(
        '#professor-event-update-delete-section'
    );

    const professorInsertButton = $('#professor-insert-button');
    const professorUpdateButton = $('#professor-update-button');
    const professorDeleteButton = $('#professor-delete-button');

    const professorEventInsertButton = $('#professor-event-insert-button');
    const professorEventUpdateButton = $('#professor-event-update-button');
    const professorEventDeleteButton = $('#professor-event-delete-button');

    const professorInsertFirstNameInput = $(
        '#professor-insert-first-name-input'
    );
    const professorInsertLastNameInput = $('#professor-insert-last-name-input');

    const professorUpdateFirstNameInput = $(
        '#professor-update-first-name-input'
    );
    const professorUpdateLastNameInput = $('#professor-update-last-name-input');

    const professorEventInsertTitleInput = $(
        '#professor-event-insert-title-input'
    );
    const professorEventInsertDescriptionInput = $(
        '#professor-event-insert-description-input'
    );
    const professorEventInsertStartDateInput = $(
        '#professor-event-insert-start-date-input'
    );
    const professorEventInsertEndDateInput = $(
        '#professor-event-insert-end-date-input'
    );

    const professorEventUpdateTitleInput = $(
        '#professor-event-update-title-input'
    );
    const professorEventUpdateDescriptionInput = $(
        '#professor-event-update-description-input'
    );
    const professorEventUpdateStartDateInput = $(
        '#professor-event-update-start-date-input'
    );
    const professorEventUpdateEndDateInput = $(
        '#professor-event-update-end-date-input'
    );

    const responseMessage = $('#response-message');

    professorInsertButton.on('click', async function (e) {
        e.preventDefault();

        const firstName = professorInsertFirstNameInput.val() as string;
        const lastName = professorInsertLastNameInput.val() as string;

        const professorDto: ProfessorDto = {
            firstName: firstName,
            lastName: lastName
        };

        professorRequest
            .insert(professorDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                professorInsertFirstNameInput.val('');
                professorInsertLastNameInput.val('');

                return refreshProfessorsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    professorUpdateButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        const id = selectedProfessor.id;
        const version = selectedProfessor.version;
        const firstName = professorUpdateFirstNameInput.val() as string;
        const lastName = professorUpdateLastNameInput.val() as string;

        const professorDto: ProfessorDto = {
            version: version,
            firstName: firstName,
            lastName: lastName
        };

        professorRequest
            .update(id, professorDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(professorsTable);
                showElement(professorInsertSection);
                hideElement(professorUpdateDeleteSection);
                hideElement(professorEventsTable);
                hideElement(professorEventInsertSection);
                hideElement(professorEventUpdateDeleteSection);

                selectedProfessor = null;
                professorUpdateFirstNameInput.val('');
                professorUpdateLastNameInput.val('');

                return refreshProfessorsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    professorDeleteButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        const id = selectedProfessor.id;

        professorRequest
            .delete(id)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(professorsTable);
                showElement(professorInsertSection);
                hideElement(professorUpdateDeleteSection);
                hideElement(professorEventsTable);
                hideElement(professorEventInsertSection);
                hideElement(professorEventUpdateDeleteSection);

                selectedProfessor = null;
                professorUpdateFirstNameInput.val('');
                professorUpdateLastNameInput.val('');

                return refreshProfessorsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    professorEventInsertButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        const professorId = selectedProfessor.id;
        const title = professorEventInsertTitleInput.val() as string;
        const description =
            professorEventInsertDescriptionInput.val() as string;
        const startDate = professorEventInsertStartDateInput.val() as string;
        const endDate = professorEventInsertEndDateInput.val() as string;

        const professorEventDto: ProfessorEventDto = {
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        professorEventRequest
            .insertByProfessorId(professorId, professorEventDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                professorEventInsertTitleInput.val('');
                professorEventInsertDescriptionInput.val('');
                professorEventInsertStartDateInput.val('');
                professorEventInsertEndDateInput.val('');

                return refreshProfessorEventsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    professorEventUpdateButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        if (!selectedProfessorEvent) {
            return;
        }

        const professorId = selectedProfessor.id;
        const eventId = selectedProfessorEvent.id;
        const version = selectedProfessorEvent.version;
        const title = professorEventUpdateTitleInput.val() as string;
        const description =
            professorEventUpdateDescriptionInput.val() as string;
        const startDate = professorEventUpdateStartDateInput.val() as string;
        const endDate = professorEventUpdateEndDateInput.val() as string;

        const professorEventDto: ProfessorEventDto = {
            version: version,
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        professorEventRequest
            .updateByProfessorId(professorId, eventId, professorEventDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(professorEventInsertSection);
                hideElement(professorEventUpdateDeleteSection);

                selectedProfessorEvent = null;
                professorEventUpdateTitleInput.val('');
                professorEventUpdateDescriptionInput.val('');
                professorEventUpdateStartDateInput.val('');
                professorEventUpdateEndDateInput.val('');

                return refreshProfessorEventsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    professorEventDeleteButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        if (!selectedProfessorEvent) {
            return;
        }

        const professorId = selectedProfessor.id;
        const eventId = selectedProfessorEvent.id;

        professorEventRequest
            .deleteByProfessorId(professorId, eventId)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(professorEventInsertSection);
                hideElement(professorEventUpdateDeleteSection);

                selectedProfessorEvent = null;
                professorEventUpdateTitleInput.val('');
                professorEventUpdateDescriptionInput.val('');
                professorEventUpdateStartDateInput.val('');
                professorEventUpdateEndDateInput.val('');

                return refreshProfessorEventsList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });
});
