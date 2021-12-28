/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { usePlainToggle } from '../../hooks/useToggle';
import AddButton from '../common/AddButton';
import DeleteModal from '../common/Modals/DeleteModal';
import EditModal from '../common/Modals/EditModal';
import Error from '../common/Error';
import Loader from '../common/loaders/Loader';
import SingleAddForm from '../common/SingleAddForm';
import CitiesFilter from './CitiesFilter';
import CitiesList from './CitiesList';
import { citiesSelectors } from 'redux/cities';
import * as api from 'RTK/api';
import addIcon from '../../images/add.svg';

const loaderStyles = {
  position: 'absolute',
  top: 0,
  left: '20%',
};

const {
  useGetCitiesQuery,
  useAddCityMutation,
  useEditCityMutation,
  useDeleteCityMutation,
} = api;

const Cities = () => {
  const { t } = useTranslation();

  // Initial data fetch
  // Using a query hook automatically fetches data and returns query values
  const {
    data: cities,
    error: errorFetching,
    isLoading: isFetching,
  } = useGetCitiesQuery();

  const [
    addCity, // This is the mutation trigger
    {
      isLoading: isAdding,
      error: errorAdding,
      isSuccess: isAddSuccess,
      data: addedCity,
    }, // This is the destructured mutation result
  ] = useAddCityMutation();

  const [
    editCity, // This is the mutation trigger
    {
      isLoading: isUpdating,
      error: errorUpdating,
      isSuccess: isUpdateSuccess,
      data: updatedCity,
    }, // This is the destructured mutation result
  ] = useEditCityMutation();

  const [
    deleteCity, // This is the mutation trigger
    {
      isLoading: isDeleting,
      error: errorDeleting,
      isSuccess: isDeleteSuccess,
      data: deletedCity,
    }, // This is the destructured mutation result
  ] = useDeleteCityMutation();

  const filter = useSelector(citiesSelectors.getFilter);

  const [isAddFormOpen, toggleIsAddFormOpen] = usePlainToggle();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cityToEdit, setCityToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDeleteId, setCityToDeleteId] = useState('');

  // Add new city

  const addNewCity = useCallback(
    cityName => addCity({ name: cityName }),
    [addCity],
  );

  useEffect(() => {
    if (isAddSuccess) {
      toggleIsAddFormOpen();
    }
  }, [isAddSuccess, toggleIsAddFormOpen]);

  // Edit city

  const handleEditCity = city => {
    setCityToEdit(city);
    setIsEditModalOpen(true);
  };

  const updateCity = useCallback(
    editedCityName => {
      if (cityToEdit.name === editedCityName) {
        finishEditting();
        return;
      }
      editCity({ id: cityToEdit.id, name: editedCityName });
    },
    [cityToEdit, editCity],
  );

  useEffect(() => {
    if (isUpdateSuccess) {
      finishEditting();
    }
  }, [isUpdateSuccess]);

  const finishEditting = () => {
    setIsEditModalOpen(false);
    setCityToEdit(null);
  };

  // Delete city

  const handleDeleteCity = id => {
    setCityToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const removeCity = useCallback(
    () => deleteCity(cityToDeleteId),
    [cityToDeleteId, deleteCity],
  );

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsDeleteModalOpen(false);
      setCityToDeleteId('');
    }
  }, [isDeleteSuccess]);

  // Helpers

  const closeEditModal = useCallback(() => setIsEditModalOpen(false), []);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const filteredCities = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return cities?.filter(city =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  }, [filter, cities]);

  return (
    <>
      <div css={loaderStyles}>
        <Loader loading={isFetching || isUpdating || isAdding || isDeleting} />
      </div>

      {cities && <CitiesFilter label={t('cities.city-filter')} />}

      {filteredCities && (
        <CitiesList
          cities={filteredCities}
          onEdit={handleEditCity}
          onDelete={handleDeleteCity}
        />
      )}

      {!cities && !isFetching && (
        <p className="absence-msg">{t('cities.no-cities')}</p>
      )}

      {errorFetching && <Error message={errorFetching} />}
      {errorAdding && <Error message={errorAdding} />}
      {errorUpdating && <Error message={errorUpdating} />}
      {errorDeleting && <Error message={errorDeleting} />}

      {isAddFormOpen && (
        <SingleAddForm
          onSubmit={addNewCity}
          formName={t('cities.adding-city')}
          placeholder={t('cities.city')}
        />
      )}

      <AddButton
        text={isAddFormOpen ? t('common.cancel-add') : t('cities.add-city')}
        icon={!isAddFormOpen && addIcon}
        onClick={toggleIsAddFormOpen}
      />

      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          title="Редактировать информацию о городе"
          label={t('cities.city')}
          inputValue={cityToEdit.name}
          onSave={updateCity}
          onClose={closeEditModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          title="Удаление города"
          text="Будут удалены все материалы и информация о городе."
          onDelete={removeCity}
          onClose={closeDeleteModal}
          loading={isDeleting}
        />
      )}
    </>
  );
};

export default Cities;
