import { types } from './departmentsTypes';
const actions = {
  //-----------GET------------------
  getDepartmentsPending: () => ({
    type: types.GET_PENDING,
  }),
  getDepartmentsFulfilled: departments => ({
    type: types.GET_FULFILLED,
    payload: departments,
  }),
  getDepartmentsRejected: error => ({
    type: types.GET_REJECTED,
    payload: error,
  }),
  //-----------ADD------------------
  addDepartmentPending: () => ({
    type: types.ADD_PENDING,
  }),
  addDepartmentFulfilled: newDepartment => ({
    type: types.ADD_FULFILLED,
    payload: newDepartment,
  }),
  addDepartmentRejected: error => ({
    type: types.ADD_REJECTED,
    payload: error,
  }),
  //-----------EDIT------------------
  editDepartmentPending: () => ({
    type: types.EDIT_PENDING,
  }),
  editDepartmentFulfilled: updateDepartment => ({
    type: types.EDIT_FULFILLED,
    payload: updateDepartment,
  }),
  editDepartmentRejected: error => ({
    type: types.EDIT_REJECTED,
    payload: error,
  }),
  //-----------DELETE------------------
  deleteDepartmentPending: () => ({
    type: types.DELETE_PENDING,
  }),
  deleteDepartmentFulfilled: idToDelete => ({
    type: types.DELETE_FULFILLED,
    payload: idToDelete,
  }),
  deleteDepartmentRejected: error => ({
    type: types.DELETE_REJECTED,
    payload: error,
  }),
};

export { actions };
