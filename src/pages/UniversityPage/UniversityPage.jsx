import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import Section from 'components/common/Section/Section';
import Header from 'components/common/Header/Header';
import CitiesBlock from 'components/CitiesBlock/CitiesBlock';
import DepartmentsBlock from 'components/DepartmentsBlock/DepartmentsBlock';
import TutorsBlock from 'components/TutorsBlock/TutorsBlock';
import UniversityBlock from 'components/UniversityBlock/UniversityBlock';
import univerInfo from 'data/univerInfo.json';
import tutorsIcon from 'images/cat.png';
import citiesIcon from 'images/pin.png';
import departmentsIcon from 'images/robot.png';

const { name, description } = univerInfo;

const UniversityPage = () => {
  // const { t } = useTranslation();
  const [showTutots, setShowTutots] = useState(true); // TEMPORARY

  return (
    <>
      <Header title="Информация о университете" />
      {/* <Header title={t('university.info')} /> */}

      <UniversityBlock name={name} descr={description} />

      {/* TEMPORARY BUTTON */}
      <button
        style={{ padding: 10, marginBottom: 20, display: 'none' }}
        onClick={() => setShowTutots(!showTutots)}
      >
        Toggle tutors
      </button>

      {showTutots && (
        <Section icon={tutorsIcon} title="Преподаватели">
          <TutorsBlock />
        </Section>
      )}

      <Section icon={citiesIcon} title="Города">
        <CitiesBlock />
      </Section>

      <Section icon={departmentsIcon} title="Факультеты">
        <DepartmentsBlock />
      </Section>
    </>
  );
};

export default UniversityPage;
