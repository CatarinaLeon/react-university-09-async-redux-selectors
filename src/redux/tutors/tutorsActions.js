import { createAction } from '@reduxjs/toolkit';

const setTutors = createAction('tutors/set');
const addTutor = createAction('tutors/tutor_add');

export { setTutors, addTutor };

////////////////////////////////////////////

// ИЗМЕНЯЕМ PAYLOAD ПЕРЕД ТЕМ КАК ЗАПИСАТЬ ЕГО В СТЕЙТ

// import { createAction, nanoid } from '@reduxjs/toolkit';

// const setTutors = createAction('tutors/set', tutor => ({
//   payload: {
//     ...tutor,
//     id: nanoid(),
//   },
// }));

// ____________________________________________________
