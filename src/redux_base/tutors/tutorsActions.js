import TYPES from './tutorsTypes';

const setTutors = tutors => ({
  type: TYPES.SET,
  // type: 'tutors/set',
  payload: tutors,
});
const addTutor = tutor => ({
  type: TYPES.ADD,
  // type: 'tutors/tutor_add',
  payload: tutor,
});

export { setTutors, addTutor };
