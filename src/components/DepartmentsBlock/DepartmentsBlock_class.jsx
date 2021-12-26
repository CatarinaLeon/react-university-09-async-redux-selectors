import { Component } from 'react';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import ItemsList from '../ItemsList/ItemsList';
import Modal from '../common/Modal/Modal';
import Loader from '../common/Loader/Loader';
import * as api from 'services/api';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const API_ENDPOINT = 'departments';

class DepartmentsBlock extends Component {
  state = {
    departments: [],
    isAddFormOpen: false,
    openedModal: ACTION.NONE,
    action: ACTION.NONE,
    activeDepartment: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchDepartments();
  }

  componentDidUpdate(prevProps, prevState) {
    const { action } = this.state;
    if (prevState.action !== action) {
      switch (action) {
        case ACTION.ADD:
          this.addDepartment();
          break;
        case ACTION.EDIT:
          this.editDepartment();
          break;
        case ACTION.DELETE:
          this.deleteDepartment();
          break;
        default:
          return;
      }
    }
  }

  // GET DEPARTMENTS

  fetchDepartments = async () => {
    this.setState({ loading: true, error: null });
    try {
      const departments = await api.getData(API_ENDPOINT);
      this.setState({ departments });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // ADD DEPARTMENT

  toggleAddForm = () =>
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

  confirmAdd = departmentName =>
    this.setState({
      action: ACTION.ADD,
      activeDepartment: { name: departmentName },
    });

  addDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const newDepartment = await api.saveItem(API_ENDPOINT, activeDepartment);
      this.setState(prevState => ({
        departments: [...prevState.departments, newDepartment],
      }));
      toast.success(`Факультет ${newDepartment.name} успешно добавлен!`);
    } catch (error) {
      this.setState({ error: error.message });
      toast.error('Что-то пошло не так :(');
    } finally {
      this.toggleAddForm();
      this.setState({
        activeDepartment: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  // EDIT DEPARTMENT

  handleStartEdit = activeDepartment =>
    this.setState({
      activeDepartment,
      openedModal: ACTION.EDIT,
    });

  confirmEdit = editedDepartmentName => {
    const { activeDepartment } = this.state;
    if (editedDepartmentName === activeDepartment.name) {
      this.setState({ activeDepartment: null });
      this.closeModal();
      return;
    }
    this.setState({
      action: ACTION.EDIT,
      activeDepartment: { ...activeDepartment, name: editedDepartmentName },
    });
  };

  editDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const updatedDepartment = await api.editItem(
        API_ENDPOINT,
        activeDepartment,
      );
      this.setState(prevState => ({
        departments: prevState.departments.map(department =>
          department.id === updatedDepartment.id
            ? updatedDepartment
            : department,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.closeModal();
      this.setState({
        action: ACTION.NONE,
        activeDepartment: null,
        loading: false,
      });
    }
  };

  // DELETE DEPARTMENT

  handleStartDelete = activeDepartment =>
    this.setState({
      activeDepartment,
      openedModal: ACTION.DELETE,
    });

  confirmDelete = () => this.setState({ action: ACTION.DELETE });

  deleteDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const deletedDepartment = await api.deleteItem(
        API_ENDPOINT,
        activeDepartment.id,
      );
      this.setState(prevState => ({
        departments: prevState.departments.filter(
          department => department.id !== deletedDepartment.id,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.closeModal();
      this.setState({
        action: ACTION.NONE,
        activeDepartment: null,
        loading: false,
      });
    }
  };

  closeModal = () =>
    this.setState({
      openedModal: ACTION.NONE,
      activeDepartment: null,
    });

  render() {
    const {
      departments,
      isAddFormOpen,
      activeDepartment,
      openedModal,
      loading,
    } = this.state;

    const noDepartments = !loading && !departments.length;

    return (
      <>
        {loading && <Loader />}

        {!!departments.length && (
          <ItemsList
            items={departments}
            onEditItem={this.handleStartEdit}
            onDeleteItem={this.handleStartDelete}
          />
        )}

        {noDepartments && <h4 className="absence-msg">No departments yet</h4>}

        {isAddFormOpen && (
          <AddForm
            onSubmit={this.confirmAdd}
            formName="Добавление филиала"
            placeholder="Филиал"
          />
        )}

        <BigButton
          text={isAddFormOpen ? 'Отменить добавление' : 'Добавить факультет'}
          icon={!isAddFormOpen && addIcon}
          onClick={this.toggleAddForm}
        />

        {openedModal === ACTION.EDIT && (
          <Modal
            title="Редактировать информацию о факультете"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Факультет"
              inputValue={activeDepartment.name}
              onSave={this.confirmEdit}
            />
          </Modal>
        )}

        {openedModal === ACTION.DELETE && (
          <Modal
            title="Удаление факультета"
            onClose={this.closeModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о факультете."
              onDelete={this.confirmDelete}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default DepartmentsBlock;
