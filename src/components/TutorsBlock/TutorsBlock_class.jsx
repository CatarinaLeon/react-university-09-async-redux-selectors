/** @jsxImportSource @emotion/react */
import { Component } from 'react';
import BigButton from '../common/BigButton/BigButton';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Paper from '../common/Paper/Paper';
import Skeleton from '../common/Skeleton/Skeleton';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorForm/TutorForm';
import * as api from '../../services/api';
import plusImg from '../../images/add.svg';

const API_ENDPOINT = 'tutors';

class TutorsBlock extends Component {
  state = {
    tutors: [],
    isFormOpen: false,
    newTutor: null,
    loading: false,
    error: null,
    firstLoading: false,
  };

  isTutorsMounted = false;
  controller = new AbortController();
  signal = this.controller.signal;

  componentDidMount() {
    this.isTutorsMounted = true;

    this.setState({ firstLoading: true });
    this.fetchTutors().finally(() => this.setState({ firstLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { newTutor } = this.state;
    // если предыдущее состояние не равно null и при этом предыдущее состояние не равно текущему
    if (newTutor && prevState.newTutor !== newTutor) {
      // то вызываем асинхронную функцию( запрос на api)
      this.addTutor();
    }
  }

  componentWillUnmount() {
    this.isTutorsMounted = false;

    if (this.controller) {
      this.controller.abort();
    }
  }

  // // FETCH TUTORS -> ф-ция делает запрос на api и возвращает массив tuturs
  fetchTutors = async () => {
    this.createSignalAndController();
    const signal = { signal: this.signal };

    this.setState({ loading: true, error: null });
    try {
      const tutors = await api.getData(API_ENDPOINT, signal);
      // записываем в стейт
      this.setState({ tutors });
    } catch (error) {
      if (!this.signal.aborted) {
        this.setState({ error: error.message });
      }
    } finally {
      if (!this.signal.aborted) {
        this.setState({ loading: false });
      }
    }
  };

  // ADD TUTOR
  toggleForm = () =>
    this.setState(prevState => ({
      // console.log('prevState', prevState);
      isFormOpen: !prevState.isFormOpen,
      // так плохо! -> this.setState({ isFormOpen: !this.state.isFormOpen });
    }));

  // подтверждение того что добав newTutur в state
  confirmAdd = newTutur => {
    this.setState({ newTutur });
  };

  // Добавить нового преподавателя в массив: распылить старый и добавить новый ->
  addTutor = async () => {
    this.setState({ loading: true, error: null });
    const { newTutor } = this.state;
    try {
      const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
      if (this.isTutorsMounted) {
        this.setState(prevState => ({
          tutors: [...prevState.tutors, savedTutor],
          // закрыть форму
          isFormOpen: false,
          // очистить поле, чтобы можно было добавит нового препод
          newTutor: null,
        }));
      }
    } catch (error) {
      if (this.isTutorsMounted) {
        this.setState({ error: error.message });
      }
    } finally {
      if (this.isTutorsMounted) {
        this.setState({ loading: false });
      }
    }
  };

  // CREATE ABORT CONTROLLER
  createSignalAndController = () => {
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  };

  render() {
    const { tutors, isFormOpen, loading, error, firstLoading } = this.state;
    const noTutors = !firstLoading && !tutors.length;
    return (
      <>
        {firstLoading && <Skeleton />}

        {loading && <Loader />}

        {!!tutors.length && (
          <ul>
            {tutors.map(tutor => (
              <li key={tutor.id} css={{ marginBottom: 24 }}>
                <Paper>
                  <Tutor {...tutor} />
                </Paper>
              </li>
            ))}
          </ul>
        )}

        {noTutors && <h4 className="absence-msg">No tutors yet</h4>}

        {isFormOpen && <TutorForm onSubmit={this.confirmAdd} />}

        {error && <ErrorMsg message={error} />}

        <BigButton
          onClick={this.toggleForm}
          // onClick={this.addTutor}
          icon={!isFormOpen && plusImg}
          text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
          disabled={loading}
        />
      </>
    );
  }
}

export default TutorsBlock;
