import NavItem from './NavItem/NavItem';
import { HiBookOpen, HiAcademicCap } from 'react-icons/hi';
// import { navConfig } from '../../data/navigation';

const Navigation = () => {
  return (
    <nav style={{ paddingTop: 12 }}>
      <NavItem
        name="Факультеты"
        icon={<HiBookOpen color="#ff6b0a" size="24" />}
        path="/departments"
      />

      <NavItem
        name="Университет"
        icon={<HiAcademicCap color="#ff6b0a" size="24" />}
        path="/university"
      />
    </nav>
  );
};

export default Navigation;
