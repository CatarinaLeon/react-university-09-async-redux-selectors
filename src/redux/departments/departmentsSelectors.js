const getDepartments = state => state.departments.items;

const getLoading = state => state.departments.loading;

const getError = state => state.departments.error;

export { getDepartments, getLoading, getError };
