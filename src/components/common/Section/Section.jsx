/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';

/**
 * Добавим коммент из документации
 * Перепишем scss стили в переменную sectionStyles
 * в стиле объекта
 * Переменную используем в пропе css у section
 */

//  .section {
//   position: relative;
//   margin-bottom: 32px;

//   & .header {
//     display: flex;
//     align-items: center;
//     margin-bottom: 32px;

//     & .img-wrapper {
//       margin-right: 8px;
//     }
//   }
// }

const sectionStyle = {
  position: 'relative',
  marginBottom: 32,

  '& .header': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',

    '& .img-wrapper': {
      marginRight: 8,
    },
  },
};

const Section = ({ icon, title, children }) => {
  return (
    <section css={sectionStyle}>
      <div className="header">
        <div className="img-wrapper">
          <img src={icon} alt={title} />
        </div>
        <h3 className="heading">{title}</h3>
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
