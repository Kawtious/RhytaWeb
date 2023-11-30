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
import '../css/styles.css';
import { CareerRequest } from '../requests/Career.request';
import { CourseRequest } from '../requests/Course.request';
import { ProfessorRequest } from '../requests/Professor.request';
import { ProfessorEventRequest } from '../requests/ProfessorEvent.request';
import { TermRequest } from '../requests/Term.request';
import { setupHeader } from '../utils/HeaderSetup.util';
import { PageUrlConstants } from '../utils/PageUrlConstants.util';
import { refreshAuthToken } from '../utils/cookies/JwtAuth.util';

const careerRequest = new CareerRequest();
const courseRequest = new CourseRequest();
const professorRequest = new ProfessorRequest();
const professorEventRequest = new ProfessorEventRequest();
const termRequest = new TermRequest();

$(async () => {
    await refreshAuthToken();

    await setupHeader();

    const careersCount = $('#careers-count');
    const coursesCount = $('#courses-count');
    const professorsCount = $('#professors-count');
    const professorEventsCount = $('#professor-events-count');
    const termsCount = $('#terms-count');

    const careersDiv = $('#careers-div');
    const coursesDiv = $('#courses-div');
    const professorsDiv = $('#professors-div');
    const termsDiv = $('#terms-div');

    careerRequest.getAll().then((result) => {
        careersCount.text(`${result.data.length.toString()} Careers`);
    });

    courseRequest.getAll().then((result) => {
        coursesCount.text(`${result.data.length.toString()} Courses`);
    });

    professorRequest.getAll().then((result) => {
        professorsCount.text(`${result.data.length.toString()} Professors`);
    });

    professorEventRequest.getAll().then((result) => {
        professorEventsCount.text(`${result.data.length.toString()} Events`);
    });

    termRequest.getAll().then((result) => {
        termsCount.text(`${result.data.length.toString()} Terms`);
    });

    careersDiv.on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.CAREERS_MENU;
    });

    coursesDiv.on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.COURSES_MENU;
    });

    professorsDiv.on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.PROFESSORS_MENU;
    });

    termsDiv.on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.TERMS_MENU;
    });
});
