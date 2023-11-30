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
import { CareerDto } from '../../dto/Career.dto';
import { Career } from '../../entities/Career.entity';
import { CareerRequest } from '../../requests/Career.request';
import { hideElement, showElement } from '../../utils/ElementVisibility.util';
import { setupHeader } from '../../utils/HeaderSetup.util';
import { refreshAuthToken } from '../../utils/cookies/JwtAuth.util';

const careerRequest = new CareerRequest();

let selectedCareer: Career | null;

async function refreshCareersList() {
    careerRequest.getAll().then((result) => {
        const careersTable = $('#careers-table');

        // Store headers row before removing it
        const careersTableHeadersRow = $('#careers-table-headers-row');

        const careerInsertSection = $('#career-insert-section');
        const careerUpdateDeleteSection = $('#career-update-delete-section');

        const careerUpdateNameInput = $('#career-update-name-input');
        const careerUpdateDescriptionInput = $(
            '#career-update-description-input'
        );

        careersTable.html('');

        // What a funny hack haha!
        careersTable.append(careersTableHeadersRow);

        for (const career of result.data) {
            const careerRow = document.createElement('tr');
            careerRow.classList.add('table-row');

            careerRow.onclick = async function () {
                if (selectedCareer == career) {
                    careerRow.classList.remove('table-row-selected');

                    showElement(careerInsertSection);
                    hideElement(careerUpdateDeleteSection);

                    selectedCareer = null;
                    careerUpdateNameInput.val('');
                    careerUpdateDescriptionInput.val('');

                    return;
                }

                $('.table-row-selected').removeClass('table-row-selected');

                careerRow.classList.add('table-row-selected');

                showElement(careerUpdateDeleteSection);
                hideElement(careerInsertSection);

                selectedCareer = career;
                careerUpdateNameInput.val(career.name);
                careerUpdateDescriptionInput.val(career.description);
            };

            const careerIdColumn = document.createElement('td');
            careerIdColumn.textContent = career.id.toString();

            const careerCreatedDateColumn = document.createElement('td');
            careerCreatedDateColumn.textContent = career.createdDate.toString();

            const careerUpdatedDateColumn = document.createElement('td');
            careerUpdatedDateColumn.textContent = career.updatedDate.toString();

            const careerVersionColumn = document.createElement('td');
            careerVersionColumn.textContent = career.version.toString();

            const careerNameColumn = document.createElement('td');
            careerNameColumn.textContent = career.name;

            const careerDescriptionColumn = document.createElement('td');
            careerDescriptionColumn.textContent = career.description;

            careerRow.appendChild(careerIdColumn);
            careerRow.appendChild(careerCreatedDateColumn);
            careerRow.appendChild(careerUpdatedDateColumn);
            careerRow.appendChild(careerVersionColumn);
            careerRow.appendChild(careerNameColumn);
            careerRow.appendChild(careerDescriptionColumn);

            careersTable.append(careerRow);
        }
    });
}

$(async () => {
    await refreshAuthToken();

    await refreshCareersList();

    await setupHeader();

    const careerInsertSection = $('#career-insert-section');
    const careerUpdateDeleteSection = $('#career-update-delete-section');

    const careerInsertButton = $('#career-insert-button');
    const careerUpdateButton = $('#career-update-button');
    const careerDeleteButton = $('#career-delete-button');

    const careerInsertNameInput = $('#career-insert-name-input');
    const careerInsertDescriptionInput = $('#career-insert-description-input');

    const careerUpdateNameInput = $('#career-update-name-input');
    const careerUpdateDescriptionInput = $('#career-update-description-input');

    const responseMessage = $('#response-message');

    careerInsertButton.on('click', async function (e) {
        e.preventDefault();

        const name = careerInsertNameInput.val() as string;
        const description = careerInsertDescriptionInput.val() as string;

        const careerDto: CareerDto = {
            name: name,
            description: description
        };

        careerRequest
            .insert(careerDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                careerInsertNameInput.val('');
                careerInsertDescriptionInput.val('');

                return refreshCareersList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    careerUpdateButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedCareer) {
            return;
        }

        const id = selectedCareer.id;
        const version = selectedCareer.version;
        const name = careerUpdateNameInput.val() as string;
        const description = careerUpdateDescriptionInput.val() as string;

        const careerDto: CareerDto = {
            version: version,
            name: name,
            description: description
        };

        careerRequest
            .update(id, careerDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(careerInsertSection);
                hideElement(careerUpdateDeleteSection);

                selectedCareer = null;
                careerUpdateNameInput.val('');
                careerUpdateDescriptionInput.val('');

                return refreshCareersList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    careerDeleteButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedCareer) {
            return;
        }

        const id = selectedCareer.id;

        careerRequest
            .delete(id)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(careerInsertSection);
                hideElement(careerUpdateDeleteSection);

                selectedCareer = null;
                careerUpdateNameInput.val('');
                careerUpdateDescriptionInput.val('');

                return refreshCareersList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });
});
