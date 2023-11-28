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
import { CareerDto } from '../../../dto/Career.dto';
import { Career } from '../../../entities/Career.entity';
import { CareerRequest } from '../../../requests/Career.request';
import { refreshAuthToken } from '../../../utils/cookies/JwtAuth.util';
import { PageUrlConstants } from '../../../utils/cookies/PageUrlConstants.util';

const careerRequest = new CareerRequest();

let selectedCareer: Career | null;

async function refreshCareersList() {
    careerRequest.getAll().then((result) => {
        const careersTable = $('#careers-table');

        // Store headers row before removing it
        const careersTableHeadersRow = $('#careers-table-headers-row');

        careersTable.html('');

        // What a funny hack haha!
        careersTable.append(careersTableHeadersRow);

        for (const career of result.data) {
            const careerRow = document.createElement('tr');
            careerRow.style.cursor = 'pointer';
            careerRow.onclick = async function () {
                selectedCareer = career;

                $('#career-update-name-input').val(career.name);
                $('#career-update-description-input').val(career.description);
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

    $('#home-button').attr('href', PageUrlConstants.HOME);

    $('#career-insert-button').on('click', async function (e) {
        e.preventDefault();

        const name = $('#career-insert-name-input').val() as string;
        const description = $(
            '#career-insert-description-input'
        ).val() as string;

        const careerDto: CareerDto = {
            name: name,
            description: description
        };

        careerRequest
            .insert(careerDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                $('#career-insert-name-input').val('');
                $('#career-insert-description-input').val('');

                return refreshCareersList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#career-update-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedCareer) {
            return;
        }

        const id = selectedCareer.id;
        const version = selectedCareer.version;
        const name = $('#career-update-name-input').val() as string;
        const description = $(
            '#career-update-description-input'
        ).val() as string;

        const careerDto: CareerDto = {
            version: version,
            name: name,
            description: description
        };

        careerRequest
            .update(id, careerDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedCareer = null;
                $('#career-update-name-input').val('');
                $('#career-update-description-input').val('');

                return refreshCareersList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#career-delete-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedCareer) {
            return;
        }

        const id = selectedCareer.id;

        careerRequest
            .delete(id)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedCareer = null;
                $('#career-update-name-input').val('');
                $('#career-update-description-input').val('');

                return refreshCareersList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
