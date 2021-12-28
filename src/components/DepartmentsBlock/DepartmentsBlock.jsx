import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AbsenceMsg from 'components/common/AbsenceMsg/AbsenceMsg';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal/Modal';
import ItemsList from '../ItemsList/ItemsList';
import { departmentsOperations, departmentsSelectors } from 'redux/departments';
// import * as api from 'services/api';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

// const API_ENDPOINT = 'departments';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

// const departmentsReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'set':
//       return action.payload;

//     case 'add':
//       return [...state, action.payload];

//     case 'edit':
//       return state.map(department =>
//         department.id === action.payload.id ? action.payload : department,
//       );

//     case 'delete':
//       return state.filter(department => department.id !== action.payload);

//     default:
//       console.log('Type is not wright!');
//       break;
//   }
// };

const DepartmentsBlock = () => {
  // const [departments, dispatch] = useReducer(departmentsReducer, []);
  const departments = useSelector(departmentsSelectors.getDepartments);
  const loading = useSelector(departmentsSelectors.getLoading);
  const error = useSelector(departmentsSelectors.getError);
  const dispatch = useDispatch();
  // form / modal
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);
  // actions
  const [action, setAction] = useState(ACTION.NONE);
  const [activeDepartment, setActiveDepartment] = useState(null);
  // api request status
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // GET DEPARTMENTS

  useEffect(() => {
    dispatch(departmentsOperations.getDepartments());
    // const fetchDepartments = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const departments = await api.getData(API_ENDPOINT);
    //     dispatch({ type: 'set', payload: departments });
    //     // setDepartments(departments);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchDepartments();
  }, [dispatch]);

  // ADD DEPARTMENT

  const toggleAddForm = () => setIsAddFormOpen(prevState => !prevState);

  const confirmAdd = departmentName => {
    setActiveDepartment({ name: departmentName });
    setAction(ACTION.ADD);
  };

  useEffect(() => {
    if (action !== ACTION.ADD) return;

    dispatch(departmentsOperations.addDepartment(activeDepartment)).then(() => {
      toast.success(`Факультет ${activeDepartment.name} успешно добавлен!`);
      toggleAddForm();
      setAction(ACTION.NONE);
      setActiveDepartment(null);
    });
    // const addDepartment = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const newDepartment = await api.saveItem(
    //       API_ENDPOINT,
    //       activeDepartment,
    //     );
    //     dispatch({ type: 'add', payload: newDepartment });

    //     toggleAddForm();
    //     toast.success(`Факультет ${newDepartment.name} успешно добавлен!`);
    //   } catch (error) {
    //     setError(error.message);
    //     toast.error('Что-то пошло не так :(');
    //   } finally {
    //     setAction(ACTION.NONE);
    //     setLoading(false);
    //     setActiveDepartment(null);
    //   }
    // };
    // addDepartment();
  }, [action, activeDepartment, dispatch]);

  // EDIT DEPARTMENT

  const handleStartEdit = activeDepartment => {
    setActiveDepartment(activeDepartment);
    setOpenedModal(ACTION.EDIT);
  };

  const confirmEdit = editedDepartmentName => {
    if (editedDepartmentName === activeDepartment.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveDepartment({ ...activeDepartment, name: editedDepartmentName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    dispatch(departmentsOperations.editDepartment(activeDepartment)).then(
      () => {
        setAction(ACTION.NONE);
        closeModal();
        setActiveDepartment(null);
      },
    );
    // const editDepartment = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const updatedDepartment = await api.editItem(
    //       API_ENDPOINT,
    //       activeDepartment,
    //     );
    //     dispatch({ type: 'edit', payload: updatedDepartment });
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setAction(ACTION.NONE);
    //     closeModal();
    //     setLoading(false);
    //     setActiveDepartment(null);
    //   }
    // };
    // editDepartment();
  }, [action, activeDepartment, dispatch]);

  // DELETE DEPARTMENT

  const handleStartDelete = activeDepartment => {
    setActiveDepartment(activeDepartment);
    setOpenedModal(ACTION.DELETE);
  };

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    dispatch(departmentsOperations.deleteDepartment(activeDepartment.id)).then(
      () => {
        setAction(ACTION.NONE);
        closeModal();
        setActiveDepartment(null);
      },
    );

    // const deleteDepartment = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const deletedDepartment = await api.deleteItem(
    //       API_ENDPOINT,
    //       activeDepartment.id,
    //     );
    //     dispatch({ type: 'delete', payload: deletedDepartment.id });

    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setAction(ACTION.NONE);
    //     closeModal();
    //     setLoading(false);
    //     setActiveDepartment(null);
    //   }
    // };
    // deleteDepartment();
  }, [action, activeDepartment, dispatch]);

  const closeModal = () => {
    setOpenedModal(ACTION.NONE);
    setActiveDepartment(null);
  };

  // RENDER

  const noDepartments = !loading && !departments.length;

  return (
    <>
      {loading && <Loader />}

      {!!departments.length && (
        <ItemsList
          items={departments}
          onEditItem={handleStartEdit}
          onDeleteItem={handleStartDelete}
          link="departments"
        />
      )}

      {noDepartments && <AbsenceMsg absentEntity="departments" />}

      {isAddFormOpen && (
        <AddForm
          onSubmit={confirmAdd}
          formName="Добавление филиала"
          placeholder="Филиал"
        />
      )}

      {error && <ErrorMsg message={error} />}

      <BigButton
        text={isAddFormOpen ? 'Отменить добавление' : 'Добавить факультет'}
        icon={!isAddFormOpen && addIcon}
        onClick={toggleAddForm}
        disabled={loading}
      />

      {openedModal === ACTION.EDIT && (
        <Modal
          title="Редактировать информацию о факультете"
          onClose={closeModal}
          icon={pencilIcon}
        >
          <EditCard
            label="Факультет"
            inputValue={activeDepartment.name}
            onSave={confirmEdit}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal
          title="Удаление факультета"
          onClose={closeModal}
          icon={fingerIcon}
        >
          <DeleteCard
            text="Будут удалены все материалы и информация о факультете."
            onDelete={confirmDelete}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default DepartmentsBlock;
