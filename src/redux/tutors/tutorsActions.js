import { createAction } from '@reduxjs/toolkit';

// const setTutors = createAction('tutors/set');
// const addTutor = createAction('tutors/tutor_add');

const getTutorsRequest = createAction('tutors/getTutorsRequest');
const getTutorsSuccess = createAction('tutors/getTutorsSuccess');
const getTutorsError = createAction('tutors/getTutorsError');

const addTutorRequest = createAction('tutors/addTutorsRequest');
const addTutorSuccess = createAction('tutors/addTutorsSuccess');
const addTutorError = createAction('tutors/addTutorsError');

export {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
};
