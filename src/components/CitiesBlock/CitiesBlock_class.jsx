import { Component } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import Filter from '../common/Filter/Filter';
import Modal from '../common/Modal/Modal';
import Loader from '../common/Loader/Loader';

import * as api from 'services/api';
import ItemsList from '../ItemsList/ItemsList';

import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

const API_ENDPOINT = 'cities';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

class CitiesBlock extends Component {
  state = {
    cities: [],
    filter: '',

    isAddFormOpen: false,
    openedModal: ACTION.NONE,

    action: ACTION.NONE,
    activeCity: null,

    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchCities();
  }

  componentDidUpdate(prevProps, prevState) {
    const { action } = this.state;
    if (prevState.action !== action) {
      switch (action) {
        case ACTION.ADD:
          this.addCity();
          break;
        case ACTION.EDIT:
          this.editCity();
          break;
        case ACTION.DELETE:
          this.deleteCity();
          break;
        default:
          return;
      }
    }
  }

  // ПОЛУЧИТЬ ГОРОДА

  fetchCities = async () => {
    this.setState({ loading: true, error: null });
    try {
      const cities = await api.getData(API_ENDPOINT);
      this.setState({ cities });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // ДОБАВИТЬ ГОРОД

  toggleAddForm = () =>
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

  confirmAdd = cityName => {
    const isDuplicate = this.checkIfDuplicate(cityName);
    if (isDuplicate) {
      toast.warn(`City "${cityName}" is already in list`);
      return;
    }
    this.setState({
      action: ACTION.ADD,
      activeCity: { name: cityName },
    });
  };

  checkIfDuplicate = cityName =>
    this.state.cities.some(({ name }) => name === cityName);

  addCity = async () => {
    this.setState({ loading: true, error: null });
    const { activeCity } = this.state;
    try {
      const newCity = await api.saveItem(API_ENDPOINT, activeCity);
      this.setState(prevState => ({ cities: [...prevState.cities, newCity] }));
      this.toggleAddForm();
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        activeCity: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  // ИЗМЕНИТЬ ГОРОД

  handleStartEdit = activeCity =>
    this.setState({
      openedModal: ACTION.EDIT,
      activeCity,
    });

  confirmEdit = editedCityName => {
    const { activeCity } = this.state;
    if (editedCityName === activeCity.name) {
      this.setState({ openedModal: ACTION.NONE, activeCity: null });
      return;
    }
    this.setState({
      action: ACTION.EDIT,
      activeCity: { ...activeCity, name: editedCityName },
    });
  };

  editCity = async () => {
    this.setState({ loading: true, error: null });
    const { activeCity } = this.state;
    try {
      const updatedCity = await api.editItem(API_ENDPOINT, activeCity);
      this.setState(prevState => ({
        cities: prevState.cities.map(city =>
          city.id === updatedCity.id ? updatedCity : city,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.closeModal();
      this.setState({
        activeCity: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  // УДАЛИТЬ ГОРОД

  handleStartDelete = activeCity =>
    this.setState({
      openedModal: ACTION.DELETE,
      activeCity,
    });

  confirmDelete = () => this.setState({ action: ACTION.DELETE });

  deleteCity = async () => {
    this.setState({ loading: true, error: null });
    const { activeCity } = this.state;
    try {
      const deletedCity = await api.deleteItem(API_ENDPOINT, activeCity.id);
      this.setState(prevState => ({
        cities: prevState.cities.filter(city => city.id !== deletedCity.id),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.closeModal();
      this.setState({
        activeCity: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  closeModal = () =>
    this.setState({ openedModal: ACTION.NONE, activeCity: '' });

  // ФИЛЬТР ГОРОДА

  handleFilterChange = value => this.setState({ filter: value });

  getFilteredCities = () => {
    const { cities, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { cities, isAddFormOpen, openedModal, activeCity, filter, loading } =
      this.state;

    const filteredCities = this.getFilteredCities();
    const noCities = !loading && !cities.length;

    return (
      <>
        {loading && <Loader />}

        {cities.length > 1 && (
          <Filter
            label="Поиск города:"
            value={filter}
            onFilterChange={this.handleFilterChange}
          />
        )}

        {!!filteredCities.length && (
          <ItemsList
            items={filteredCities}
            onEditItem={this.handleStartEdit}
            onDeleteItem={this.handleStartDelete}
          />
        )}

        {noCities && <h4 className="absence-msg">No cities yet</h4>}

        {isAddFormOpen && (
          <AddForm
            onSubmit={this.confirmAdd}
            formName="Добавление города"
            placeholder="Город"
          />
        )}

        <BigButton
          text={isAddFormOpen ? 'Отменить добавление' : 'Добавить город'}
          icon={!isAddFormOpen && addIcon}
          onClick={this.toggleAddForm}
          disabled={loading}
        />

        {openedModal === ACTION.EDIT && (
          <Modal
            title="Редактировать информацию о городе"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Город"
              inputValue={activeCity.name}
              onSave={this.confirmEdit}
            />
          </Modal>
        )}

        {openedModal === ACTION.DELETE && (
          <Modal
            title="Удаление города"
            onClose={this.closeModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о городе."
              onDelete={this.confirmDelete}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

// CitiesBlock.propTypes = {
//   cities: PropTypes.array.isRequired,
// };

export default CitiesBlock;
