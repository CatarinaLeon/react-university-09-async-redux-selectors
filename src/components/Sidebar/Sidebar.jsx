// import { Component } from 'react';
// import { useState } from 'react';
import useToggle from 'hooks/useToggle';
import Navigation from '../Navigation/Navigation';
import { navConfig } from '../../data/navigation';
import './Sidebar.css';

const defineStyles = isOpen => {
  const finalStales = ['Sidebar'];
  if (!isOpen) {
    finalStales.push('Sidebar-closed');
  }
  return finalStales.join(' ');
};

const Sidebar = () => {
  const [isOpen, toggleSidebar] = useToggle(true);
  // const [isOpen, setIsOpen] = useState(true);
  // const toggleSidebar = () => {
  //   setIsOpen(prevIsOpen => !prevIsOpen);
  // };

  return (
    <div className={defineStyles(isOpen)}>
      <div className="Sidebar-decor"></div>
      <button
        className="toggle-btn"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      ></button>

      <Navigation navConfig={navConfig} />
    </div>
  );
};

// ========================================================
// const defineStyles = isOpen => {
//   const finalStales = ['Sidebar'];
//   if (!isOpen) {
//     finalStales.push('Sidebar-closed');
//   }
//   return finalStales.join(' ');
// };

// class Sidebar extends Component {
//   state = { isOpen: true };

//   toggleSidebar = () => {
//     this.setState(prevState => ({ isOpen: !prevState.isOpen }));
//   };

//   render() {
//     return (
//       <div className={defineStyles(this.state.isOpen)}>
//         <div className="Sidebar-decor"></div>
//         <button
//           className="toggle-btn"
//           aria-label="Toggle sidebar"
//           onClick={this.toggleSidebar}
//         ></button>

//         <Navigation navConfig={navConfig} />
//       </div>
//     );
//   }
// }

export default Sidebar;
