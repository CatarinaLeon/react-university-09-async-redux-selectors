const getTutors = state => state.tutors.items;
const getLoading = state => state.tutors.loading;
const getFirstLoading = state => state.tutors.firstLoading;
const getError = state => state.tutors.error;

export { getTutors, getLoading, getFirstLoading, getError };
