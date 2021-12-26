// import { Component } from 'react';
import { useEffect } from 'react';
import { useLockBodyScroll } from 'react-use';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ onClose, icon, title, children }) => {
  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscPress);
    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  useLockBodyScroll(true);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.lead}>
            <div className={styles.imageWrapper}>
              <img src={icon} alt={title} />
            </div>
            <h3 className="heading">{title}</h3>
          </div>

          {children}
        </div>
      </div>
    </div>,
    modalRootRef,
  );
};

// class Modal extends Component {
//   // закрытие модалки по Esc
//   componentDidMount() {
//     window.addEventListener('keydown', this.onEscPress);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEscPress);
//   }
//   onEscPress = e => {
//     if (e.code === 'Escape') {
//       // console.log('Escape');
//       this.props.onClose();
//     }
//   };

//   // Метод клик по бекдропу
//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { onClose, icon, title, children } = this.props;

//     return createPortal(
//       <div className={styles.backdrop} onClick={this.handleBackdropClick}>
//         <div className={styles.modal}>
//           <header className={styles.header}>
//             <button
//               className={styles.closeBtn}
//               onClick={onClose}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </header>

//           <div className={styles.content}>
//             <div className={styles.lead}>
//               <div className={styles.imageWrapper}>
//                 <img src={icon} alt={title} />
//               </div>
//               <h3 className="heading">{title}</h3>
//             </div>

//             {children}
//           </div>
//         </div>
//       </div>,
//       modalRootRef,
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
