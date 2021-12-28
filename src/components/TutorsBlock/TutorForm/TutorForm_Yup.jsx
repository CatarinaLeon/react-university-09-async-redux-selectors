import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup
  .object({
    firstName: yup
      .string()
      .min(2, 'В имени должно быть минимум 2 буквы')
      .max(15, 'В имени должно быть максимум 15 букв')
      .required('Обязательное поле'),
    lastName: yup
      .string()
      .min(2, 'В фамилии должно быть минимум 2 буквы')
      .max(20, 'В фамилии должно быть максимум 20 букв')
      .required('Обязательное поле'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Неверный номер телефона')
      .required('Обязательное поле'),
    email: yup.string().email('Неверный email').required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    gender: yup.string().nullable().required('Обязательное поле'),
  })
  .required();

const TutorForm = ({ closeForm, onAddTutor }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  const [newTutor, setNewTutor] = useState(null);
  // api request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = data => {
    setNewTutor(data);
    reset();
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
            <input
              type="text"
              placeholder="Фамилия*"
              {...register('lastName')}
            />
            {errors.lastName && <ErrorMsg message={errors.lastName.message} />}

            <input type="text" placeholder="Имя*" {...register('firstName')} />
            {errors.firstName && (
              <ErrorMsg message={errors.firstName.message} />
            )}

            <input type="tel" placeholder="Телефон*" {...register('phone')} />
            {errors.phone && <ErrorMsg message={errors.phone.message} />}

            <input type="email" placeholder="Email*" {...register('email')} />
            {errors.email && <ErrorMsg message={errors.email.message} />}

            <select className={s.inner} {...register('city')}>
              {citiesOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.city && <ErrorMsg message={errors.city.message} />}

            <section>
              <h5 className={s.inner}>Пол*</h5>
              <label className={s.inner}>Мужчина</label>
              <input type="radio" value={GENDER.MALE} {...register('gender')} />
              <label className={s.inner}>Женщина</label>
              <input
                type="radio"
                value={GENDER.FEMALE}
                {...register('gender')}
              />
            </section>
            {errors.gender && <ErrorMsg message={errors.gender.message} />}

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
