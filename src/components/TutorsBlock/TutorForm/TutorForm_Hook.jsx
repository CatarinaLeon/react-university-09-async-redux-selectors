import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import BigButton from 'components/common/BigButton/BigButton';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import Loader from 'components/common/Loader/Loader';
import Paper from 'components/common/Paper/Paper';
import { addTutor } from 'redux/tutors/tutorsActions';
import * as api from 'services/api';
import s from './TutorForm.module.css';

const citiesOptions = [
  {
    label: 'Выберите город*',
    value: '',
  },
  {
    label: 'Полтава',
    value: 'Полтава',
  },
  {
    label: 'Киев',
    value: 'Киев',
  },
  {
    label: 'Львов',
    value: 'Львов',
  },
];

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const API_ENDPOINT = 'tutors';

const textValidation = {
  required: 'This field is required',
  minLength: {
    value: 2,
    message: 'Field should have more than 1 letter',
  },
};

const emailValidation = {
  required: 'Email is required',
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Invalid email address',
  },
};

const TutorForm = ({ closeForm, onAddTutor }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [newTutor, setNewTutor] = useState(null);
  // api request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = data => {
    console.log(data);
    // setNewTutor({ ...formData });
    // reset();
  };

  // ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    let isTutorsMounted = true;
    const addTutor = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        if (isTutorsMounted) {
          onAddTutor(savedTutor);
        }
      } catch (error) {
        if (isTutorsMounted) {
          setError(error.message);
        }
      } finally {
        if (isTutorsMounted) {
          setLoading(false);
          setNewTutor(null);
          closeForm();
        }
      }
    };
    addTutor();

    return () => {
      isTutorsMounted = false;
    };
  }, [closeForm, newTutor, onAddTutor]);

  return (
    <div className={s.container}>
      {loading && <Loader />}

      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>Добавление преподавателя</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ИНДИВИДУАЛЬНАЯ ВАЛИДАЦИЯ */}
            <input
              type="text"
              placeholder="Фамилия*"
              {...register('lastName', { required: true, minLength: 2 })}
            />
            {errors.lastName?.type === 'required' && (
              <ErrorMsg message="Last name is required" />
            )}
            {errors.lastName?.type === 'minLength' && (
              <ErrorMsg message="Last name should have more than 1 letter" />
            )}

            {/* ОБЩАЯ ВАЛИДАЦИЯ */}
            <input
              type="text"
              placeholder="Имя*"
              {...register('firstName', textValidation)}
            />
            {errors.firstName && (
              <ErrorMsg message={errors.firstName.message} />
            )}

            <input
              type="tel"
              placeholder="Телефон*"
              {...register('phone', textValidation)}
            />
            {errors.phone && <ErrorMsg message={errors.phone.message} />}

            <input
              type="email"
              placeholder="Email*"
              {...register('email', emailValidation)}
            />
            {errors.email && <ErrorMsg message={errors.email.message} />}

            <select
              className={s.inner}
              {...register('city', { required: true })}
            >
              {citiesOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <section>
              <h5 className={s.inner}>Пол*</h5>
              <label className={s.inner}>Мужчина</label>
              <input
                type="radio"
                value={GENDER.MALE}
                {...register('gender', { required: true })}
              />
              <label className={s.inner}>Женщина</label>
              <input
                type="radio"
                value={GENDER.FEMALE}
                {...register('gender', { required: true })}
              />
            </section>

            <label className={s.inner}>На постоянной основе</label>
            <input type="checkbox" {...register('isFullTime')} />

            <BigButton type="submit" text="Пригласить" />
          </form>
        </div>
      </Paper>

      {error && <ErrorMsg message={error} />}
    </div>
  );
};

TutorForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAddTutor: tutor => dispatch(addTutor(tutor)),
});

export default connect(null, mapDispatchToProps)(TutorForm);
