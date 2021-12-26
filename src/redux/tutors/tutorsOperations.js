import { getData, saveItem } from 'services/api';
import {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} from './tutorsActions';

const API_ENDPOINT = 'tutors';

const getTutors = () => async dispatch => {
  dispatch(getTutorsRequest());
  try {
    const tutors = await getData(API_ENDPOINT);
    dispatch(getTutorsSuccess(tutors));
  } catch (error) {
    dispatch(getTutorsError(error.message));
  }
};

const addTutor = tutor => async dispatch => {
  dispatch(addTutorRequest());
  try {
    const newTutor = await saveItem(API_ENDPOINT, tutor);
    dispatch(addTutorSuccess(newTutor));
  } catch (error) {
    dispatch(addTutorError(error.message));
  }
};

export { getTutors, addTutor };
