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
import { refreshAuthToken } from '../utils/cookies/JwtAuth.util';
import { PageUrlConstants } from '../utils/cookies/PageUrlConstants.util';

const careerRequest = new CareerRequest();
const courseRequest = new CourseRequest();
const professorRequest = new ProfessorRequest();
const professorEventRequest = new ProfessorEventRequest();
const termRequest = new TermRequest();

$(async () => {
    await refreshAuthToken();

    careerRequest.getAll().then((result) => {
        const careersCount = $('#careers-count');

        careersCount.text(`${result.data.length.toString()} Careers`);
    });

    courseRequest.getAll().then((result) => {
        const coursesCount = $('#courses-count');

        coursesCount.text(`${result.data.length.toString()} Courses`);
    });

    professorRequest.getAll().then((result) => {
        const professorsCount = $('#professors-count');

        professorsCount.text(`${result.data.length.toString()} Professors`);
    });

    professorEventRequest.getAll().then((result) => {
        const professorEventsCount = $('#professor-events-count');

        professorEventsCount.text(`${result.data.length.toString()} Events`);
    });

    termRequest.getAll().then((result) => {
        const termsCount = $('#terms-count');

        termsCount.text(`${result.data.length.toString()} Terms`);
    });

    $('#careers-div').on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.CAREERS_MENU;
    });

    $('#courses-div').on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.COURSES_MENU;
    });

    $('#professors-div').on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.PROFESSORS_MENU;
    });

    $('#terms-div').on('click', async function (e) {
        e.preventDefault();

        window.location.href = PageUrlConstants.TERMS_MENU;
    });

    $('#home-button').on('click', async function () {
        window.location.href = PageUrlConstants.HOME;
    });

    $(document).on('click', async function (e) {
        const profileMenu = $('#profile-menu');
        const profileDropdown = $('#profile-dropdown');

        const isClickInsideProfileMenu = Boolean(
            $(e.target).closest(profileMenu).length
        );
        if (!isClickInsideProfileMenu) {
            profileDropdown.addClass('hidden');
        }
    });

    $('#profile-button').on('click', async function () {
        const profileDropdown = $('#profile-dropdown');
        profileDropdown.toggleClass('hidden');
    });

    $('#profile-logout').attr('href', PageUrlConstants.LOGOUT_USER);
});
