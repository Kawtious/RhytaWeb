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
import { CourseDto } from '../../../dto/Course.dto';
import { Course } from '../../../entities/Course.entity';
import { CourseRequest } from '../../../requests/Course.request';
import { refreshAuthToken } from '../../../utils/cookies/JwtAuth.util';

const courseRequest = new CourseRequest();

let selectedCourse: Course | null;

async function refreshCoursesList() {
    courseRequest.getAll().then((result) => {
        const coursesTable = $('#courses-table');

        // Store headers row before removing it
        const coursesTableHeadersRow = $('#courses-table-headers-row');

        coursesTable.html('');

        coursesTable.append(coursesTableHeadersRow);

        for (const course of result.data) {
            const courseRow = document.createElement('tr');
            courseRow.style.cursor = 'pointer';
            courseRow.onclick = async function () {
                selectedCourse = course;

                $('#course-update-name-input').val(course.name);
                $('#course-update-description-input').val(course.description);
                $('#course-update-career-id-input').val(course.career.id);
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

    $('#course-insert-button').on('click', async function (e) {
        e.preventDefault();

        const name = $('#course-insert-name-input').val() as string;
        const description = $(
            '#course-insert-description-input'
        ).val() as string;
        const careerId = $('#course-insert-career-id-input').val() as string;

        const courseDto: CourseDto = {
            name: name,
            description: description,
            careerId: parseInt(careerId)
        };

        courseRequest
            .insert(courseDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                $('#course-insert-name-input').val('');
                $('#course-insert-description-input').val('');
                $('#course-insert-career-id-input').val('');

                return refreshCoursesList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#course-update-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedCourse) {
            return;
        }

        const id = selectedCourse.id;
        const version = selectedCourse.version;
        const name = $('#course-update-name-input').val() as string;
        const description = $(
            '#course-update-description-input'
        ).val() as string;
        const careerId = $('#course-update-career-id-input').val() as string;

        const courseDto: CourseDto = {
            version: version,
            name: name,
            description: description,
            careerId: parseInt(careerId)
        };

        courseRequest
            .update(id, courseDto)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedCourse = null;
                $('#course-update-name-input').val('');
                $('#course-update-description-input').val('');
                $('#course-update-career-id-input').val('');

                return refreshCoursesList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });

    $('#course-delete-button').on('click', async function (e) {
        e.preventDefault();

        if (!selectedCourse) {
            return;
        }

        const id = selectedCourse.id;

        courseRequest
            .delete(id)
            .then((result) => {
                $('#response-message').text(JSON.stringify(result.data));

                selectedCourse = null;
                $('#course-update-name-input').val('');
                $('#course-update-description-input').val('');
                $('#course-update-career-id-input').val('');

                return refreshCoursesList();
            })
            .catch((error) => {
                $('#response-message').text(JSON.stringify(error.response));
            });
    });
});
