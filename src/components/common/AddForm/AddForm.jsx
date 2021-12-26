// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import Timer from '../Timer/Timer';
import Paper from '../Paper/Paper';
import s from './AddForm.module.css';

const AddForm = ({ formName, placeholder, onSubmit }) => {
  const [input, setInput] = useState('');

  // const handleChange = e => setInput( e.target.value); -> перенесли сразу в onChange

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>{formName}</h4>

          <Timer />

          <form onSubmit={handleSubmit}>
            <input
              value={input}
              type="text"
              placeholder={placeholder}
              required
              onChange={e => setInput(e.target.value)}
            />

            <BigButton type="submit" text="Добавить" disabled={!input} />
          </form>
        </div>
      </Paper>
    </div>
  );
};

// class AddForm extends Component {
//   state = { input: '' };

//   handleChange = e => this.setState({ input: e.target.value });

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.input);
//     this.reset();
//   };

//   reset = () => this.setState({ input: '' });

//   render() {
//     const { input } = this.state;
//     const { formName, placeholder } = this.props;

//     return (
//       <div className={s.container}>
//         <Paper>
//           <div className={s.inner}>
//             <h4 className={s.formName}>{formName}</h4>

//             <Timer />

//             <form onSubmit={this.handleSubmit}>
//               <input
//                 value={input}
//                 type="text"
//                 placeholder={placeholder}
//                 required
//                 onChange={this.handleChange}
//               />

//               <BigButton type="submit" text="Добавить" disabled={!input} />
//             </form>
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddForm;
