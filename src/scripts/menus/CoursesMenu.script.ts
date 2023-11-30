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
import { CourseDto } from '../../dto/Course.dto';
import { Course } from '../../entities/Course.entity';
import { CourseRequest } from '../../requests/Course.request';
import { hideElement, showElement } from '../../utils/ElementVisibility.util';
import { setupHeader } from '../../utils/HeaderSetup.util';
import { refreshAuthToken } from '../../utils/cookies/JwtAuth.util';

const courseRequest = new CourseRequest();

let selectedCourse: Course | null;

async function refreshCoursesList() {
    courseRequest.getAll().then((result) => {
        const coursesTable = $('#courses-table');

        // Store headers row before removing it
        const coursesTableHeadersRow = $('#courses-table-headers-row');

        const courseInsertSection = $('#course-insert-section');
        const courseUpdateDeleteSection = $('#course-update-delete-section');

        const courseUpdateNameInput = $('#course-update-name-input');
        const courseUpdateDescriptionInput = $(
            '#course-update-description-input'
        );
        const courseUpdateCareerIdInput = $('#course-update-career-id-input');

        coursesTable.html('');

        coursesTable.append(coursesTableHeadersRow);

        for (const course of result.data) {
            const courseRow = document.createElement('tr');
            courseRow.classList.add('table-row');

            courseRow.onclick = async function () {
                if (selectedCourse == course) {
                    courseRow.classList.remove('table-row-selected');

                    showElement(courseInsertSection);
                    hideElement(courseUpdateDeleteSection);

                    selectedCourse = null;
                    courseUpdateNameInput.val('');
                    courseUpdateDescriptionInput.val('');
                    courseUpdateCareerIdInput.val('');

                    return;
                }

                $('.table-row-selected').removeClass('table-row-selected');

                courseRow.classList.add('table-row-selected');

                showElement(courseUpdateDeleteSection);
                hideElement(courseInsertSection);

                selectedCourse = course;
                courseUpdateNameInput.val(course.name);
                courseUpdateDescriptionInput.val(course.description);
                courseUpdateCareerIdInput.val(course.career.id);
            };

            const courseIdColumn = document.createElement('td');
            courseIdColumn.textContent = course.id.toString();

            const courseCreatedDateColumn = document.createElement('td');
            courseCreatedDateColumn.textContent = course.createdDate.toString();

            const courseUpdatedDateColumn = document.createElement('td');
            courseUpdatedDateColumn.textContent = course.updatedDate.toString();

            const courseVersionColumn = document.createElement('td');
            courseVersionColumn.textContent = course.version.toString();

            const courseNameColumn = document.createElement('td');
            courseNameColumn.textContent = course.name;

            const courseDescriptionColumn = document.createElement('td');
            courseDescriptionColumn.textContent = course.description;

            const courseCareerIdColumn = document.createElement('td');
            courseCareerIdColumn.textContent = course.career.id.toString();

            courseRow.appendChild(courseIdColumn);
            courseRow.appendChild(courseCreatedDateColumn);
            courseRow.appendChild(courseUpdatedDateColumn);
            courseRow.appendChild(courseVersionColumn);
            courseRow.appendChild(courseNameColumn);
            courseRow.appendChild(courseDescriptionColumn);
            courseRow.appendChild(courseCareerIdColumn);

            coursesTable.append(courseRow);
        }
    });
}

$(async () => {
    await refreshAuthToken();

    await refreshCoursesList();

    await setupHeader();

    const courseInsertSection = $('#course-insert-section');
    const courseUpdateDeleteSection = $('#course-update-delete-section');

    const courseInsertButton = $('#course-insert-button');
    const courseUpdateButton = $('#course-update-button');
    const courseDeleteButton = $('#course-delete-button');

    const courseInsertNameInput = $('#course-insert-name-input');
    const courseInsertDescriptionInput = $('#course-insert-description-input');
    const courseInsertCareerIdInput = $('#course-insert-career-id-input');

    const courseUpdateNameInput = $('#course-update-name-input');
    const courseUpdateDescriptionInput = $('#course-update-description-input');
    const courseUpdateCareerIdInput = $('#course-update-career-id-input');

    const responseMessage = $('#response-message');

    courseInsertButton.on('click', async function (e) {
        e.preventDefault();

        const name = courseInsertNameInput.val() as string;
        const description = courseInsertDescriptionInput.val() as string;
        const careerId = courseInsertCareerIdInput.val() as string;

        const courseDto: CourseDto = {
            name: name,
            description: description,
            careerId: parseInt(careerId)
        };

        courseRequest
            .insert(courseDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                courseInsertNameInput.val('');
                courseInsertDescriptionInput.val('');
                courseInsertCareerIdInput.val('');

                return refreshCoursesList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    courseUpdateButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedCourse) {
            return;
        }

        const id = selectedCourse.id;
        const version = selectedCourse.version;
        const name = courseUpdateNameInput.val() as string;
        const description = courseUpdateDescriptionInput.val() as string;
        const careerId = courseUpdateCareerIdInput.val() as string;

        const courseDto: CourseDto = {
            version: version,
            name: name,
            description: description,
            careerId: parseInt(careerId)
        };

        courseRequest
            .update(id, courseDto)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(courseInsertSection);
                hideElement(courseUpdateDeleteSection);

                selectedCourse = null;
                courseUpdateNameInput.val('');
                courseUpdateDescriptionInput.val('');
                courseUpdateCareerIdInput.val('');

                return refreshCoursesList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });

    courseDeleteButton.on('click', async function (e) {
        e.preventDefault();

        if (!selectedCourse) {
            return;
        }

        const id = selectedCourse.id;

        courseRequest
            .delete(id)
            .then((result) => {
                responseMessage.text(JSON.stringify(result.data));

                showElement(courseInsertSection);
                hideElement(courseUpdateDeleteSection);

                selectedCourse = null;
                courseUpdateNameInput.val('');
                courseUpdateDescriptionInput.val('');
                courseUpdateCareerIdInput.val('');

                return refreshCoursesList();
            })
            .catch((error) => {
                responseMessage.text(JSON.stringify(error.response));
            });
    });
});
