import { useContext, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
import { ThemeContext, themes } from 'context/themeContext';
import s from './Main.module.css';
import Loader from 'components/common/Loader/Loader';
// import UniversityPage from 'pages/UniversityPage/UniversityPage';
// import DepartmentsListPage from 'pages/DepartmentsListPage/DepartmentsListPage';
// import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
// import DepartmentPage from 'pages/DepartmentPage/DepartmentPage';

const DepartmentPage = lazy(() =>
  import(
    '../../pages/DepartmentPage/DepartmentPage' /* webpackChunkName:  "Department__page" */
  ),
);
const DepartmentsListPage = lazy(() =>
  import(
    '../../pages/DepartmentsListPage/DepartmentsListPage' /* webpackChunkName:  "Departments__List__Page" */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    '../../pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "Not__Found___page" */
  ),
);
const UniversityPage = lazy(() =>
  import(
    '../../pages/UniversityPage/UniversityPage' /* webpackChunkName: "University___page" */
  ),
);

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <div className={s.lanquagesWrapper}>
        <Suspense fallback={<Loader />}>
          <LanguageSwitcher />
        </Suspense>
      </div>

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/departments" />} />
          {/* <Route exact path="/">
          <Redirect to='/departments' />
        </Route> */}

          <Route path="/departments/:id">
            <DepartmentPage />
          </Route>

          <Route exact path="/departments">
            <DepartmentsListPage />
          </Route>

          <Route path="/university">
            <UniversityPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};
export default Main;
