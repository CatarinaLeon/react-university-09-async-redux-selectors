import React from 'react';
import PropTypes from 'prop-types';
import univerBuilding from '../../../images/building.png';
import { ReactComponent as EditIcon } from '../../../images/edit.svg';
import { ReactComponent as DelitIcon } from '../../../images/delete.svg';

import s from './Card.module.css';

const Card = ({ name }) => {
  // const isAdmin = true;         Для закоментированого условия ниже
  const isAdmin = true;
  return (
    <div className={s.card}>
      <div className={s.ingWrapper}>
        <img src={univerBuilding} alt="University" />
      </div>
      <p className={s.text}>университет</p>
      <h3 className={`heading ${s.wrapper}`}>{name}</h3>
      <div className={s.btn_container}>
        {/* {isAdmin && (<button>
                    <EditIcon />
                </button>)}

                {!isAdmin && (<button>
                    <DelitIcon />
                </button>)} */}

        {/* первый вариант - удоюно и понятно */}

        {/* {isAdmin ? (<button>
                    <EditIcon />
                </button>) : (<button>
                    <DelitIcon />
                </button>)} */}

        <button
          disabled={!isAdmin}
          className={isAdmin ? s.active : s.disabled}
          aria-label="Delete"
        >
          <DelitIcon />
        </button>

        <button className={s.active} aria-label="Edit">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Card;
