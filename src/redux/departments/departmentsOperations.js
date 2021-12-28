import { actions } from './departmentsActions';
import * as api from 'services/api';

const API_ENDPOINT = 'departments';

const getDepartments = () => async dispatch => {
  dispatch(actions.getDepartmentsPending());
  try {
    const departments = await api.getData(API_ENDPOINT);
    dispatch(actions.getDepartmentsFulfilled(departments));
  } catch (error) {
    dispatch(actions.getDepartmentsRejected(error.message));
  }
};
const addDepartment = newDepartment => async dispatch => {
  dispatch(actions.addDepartmentPending());
  try {
    const savedDepartment = await api.saveItem(API_ENDPOINT, newDepartment);
    dispatch(actions.addDepartmentFulfilled(savedDepartment));
  } catch (error) {
    dispatch(actions.addDepartmentRejected(error.message));
  }
};
const editDepartment = updateDepartment => async dispatch => {
  dispatch(actions.editDepartmentPending());
  try {
    const department = await api.editItem(API_ENDPOINT, updateDepartment);
    dispatch(actions.editDepartmentFulfilled(department));
  } catch (error) {
    dispatch(actions.editDepartmentRejected(error.message));
  }
};
const deleteDepartment = idToDelete => async dispatch => {
  dispatch(actions.deleteDepartmentPending());
  try {
    const deletedDepartment = await api.deleteItem(API_ENDPOINT, idToDelete);
    dispatch(actions.deleteDepartmentFulfilled(deletedDepartment.id));
  } catch (error) {
    dispatch(actions.deleteDepartmentRejected(error.message));
  }
};
export { getDepartments, addDepartment, editDepartment, deleteDepartment };
