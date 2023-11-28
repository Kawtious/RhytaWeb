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
import { ProfessorEventDto } from '../../dto/ProfessorEvent.dto';
import { Professor } from '../../entities/Professor.entity';
import { ProfessorEvent } from '../../entities/ProfessorEvent.entity';
import { ProfessorRequest } from '../../requests/Professor.request';
import { ProfessorEventRequest } from '../../requests/ProfessorEvent.request';
import { refreshAuthToken } from '../../utils/cookies/JwtAuth.util';
import { PageUrlConstants } from '../../utils/cookies/PageUrlConstants.util';

const professorRequest = new ProfessorRequest();
const professorEventRequest = new ProfessorEventRequest();

let selectedProfessor: Professor | null;
let selectedProfessorEvent: ProfessorEvent | null;

async function refreshProfessorsList() {
    professorRequest.getAll().then((result) => {
        const professorsTable = $('#professors-table');

        // Store headers row before removing it
        const professorsTableHeadersRow = $('#professors-table-headers-row');

        professorsTable.html('');

        professorsTable.append(professorsTableHeadersRow);

        for (const professor of result.data) {
            const professorRow = document.createElement('tr');
            professorRow.style.cursor = 'pointer';
            professorRow.onclick = async function () {
                selectedProfessorEvent = null;
                $('#professor-event-insert-title-input').val('');
                $('#professor-event-insert-description-input').val('');
                $('#professor-event-insert-start-date-input').val('');
                $('#professor-event-insert-end-date-input').val('');
                $('#professor-event-update-title-input').val('');
                $('#professor-event-update-description-input').val('');
                $('#professor-event-update-start-date-input').val('');
                $('#professor-event-update-end-date-input').val('');

                const professorUpdateFirstNameInput = $(
                    '#professor-update-first-name-input'
                );
                const professorUpdateLastNameInput = $(
                    '#professor-update-last-name-input'
                );

                if (selectedProfessor == professor) {
                    selectedProfessor = null;
                    professorUpdateFirstNameInput.val('');
                    professorUpdateLastNameInput.val('');

                    await refreshProfessorEventsList();

                    return;
                }

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

    professorEventsTable.html('');

    professorEventsTable.append(professorEventsTableHeadersRow);

    if (!selectedProfessor) {
        return;
    }

    const professorId = selectedProfessor.id;

    professorEventRequest.getAllByProfessorId(professorId).then((result) => {
        for (const professorEvent of result.data) {
            const professorEventRow = document.createElement('tr');
            professorEventRow.style.cursor = 'pointer';
            professorEventRow.onclick = async function () {
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

                if (selectedProfessorEvent == professorEvent) {
                    selectedProfessorEvent = null;
                    professorEventUpdateTitleInput.val('');
                    professorEventUpdateDescriptionInput.val('');
                    professorEventUpdateStartDateInput.val('');
                    professorEventUpdateEndDateInput.val('');

                    return;
                }

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

    $('#home-button').attr('href', PageUrlConstants.HOME);

    $('#professor-insert-button').on('click', async function (e) {
        e.preventDefault();

        const firstName = $(
            '#professor-insert-first-name-input'
        ).val() as string;
        const lastName = $('#professor-insert-last-name-input').val() as string;

        const professorDto: ProfessorDto = {
            firstName: firstName,
            lastName: lastName
        };

        professorRequest
            .insert(professorDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                $('#professor-insert-first-name-input').val('');
                $('#professor-insert-last-name-input').val('');

                return refreshProfessorsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#professor-update-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        const id = selectedProfessor.id;
        const version = selectedProfessor.version;
        const firstName = $(
            '#professor-update-first-name-input'
        ).val() as string;
        const lastName = $('#professor-update-last-name-input').val() as string;

        const professorDto: ProfessorDto = {
            version: version,
            firstName: firstName,
            lastName: lastName
        };

        professorRequest
            .update(id, professorDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedProfessor = null;
                $('#professor-update-first-name-input').val('');
                $('#professor-update-last-name-input').val('');

                return refreshProfessorsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#professor-delete-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        const id = selectedProfessor.id;

        professorRequest
            .delete(id)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedProfessor = null;
                $('#professor-update-first-name-input').val('');
                $('#professor-update-last-name-input').val('');

                return refreshProfessorsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#professor-event-insert-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedProfessor) {
            return;
        }

        const professorId = selectedProfessor.id;
        const title = $('#professor-event-insert-title-input').val() as string;
        const description = $(
            '#professor-event-insert-description-input'
        ).val() as string;
        const startDate = $(
            '#professor-event-insert-start-date-input'
        ).val() as string;
        const endDate = $(
            '#professor-event-insert-end-date-input'
        ).val() as string;

        const professorEventDto: ProfessorEventDto = {
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };

        professorEventRequest
            .insertByProfessorId(professorId, professorEventDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                $('#professor-event-insert-title-input').val('');
                $('#professor-event-insert-description-input').val('');
                $('#professor-event-insert-start-date-input').val('');
                $('#professor-event-insert-end-date-input').val('');

                return refreshProfessorEventsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#professor-event-update-button').on('click', async function (e) {
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
        const title = $('#professor-event-update-title-input').val() as string;
        const description = $(
            '#professor-event-update-description-input'
        ).val() as string;
        const startDate = $(
            '#professor-event-update-start-date-input'
        ).val() as string;
        const endDate = $(
            '#professor-event-update-end-date-input'
        ).val() as string;

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
                $('#response-message').text(JSON.stringify(result.data));

                selectedProfessorEvent = null;
                $('#professor-event-update-title-input').val('');
                $('#professor-event-update-description-input').val('');
                $('#professor-event-update-start-date-input').val('');
                $('#professor-event-update-end-date-input').val('');

                return refreshProfessorEventsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#professor-event-delete-button').on('click', async function (e) {
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
                $('#response-message').text(JSON.stringify(result.data));

                selectedProfessorEvent = null;
                $('#professor-event-update-title-input').val('');
                $('#professor-event-update-description-input').val('');
                $('#professor-event-update-start-date-input').val('');
                $('#professor-event-update-end-date-input').val('');

                return refreshProfessorEventsList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
