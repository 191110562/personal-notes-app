import React from 'react';
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi/index.esm';

class NewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      }
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      }
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
   return (
    <section className='add-new-page'>
        <div className='add-new-page__input'>
            <input
            className='add-new-page__input__title'
            placeholder='Catatan rahasia'
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            />
            <div
            className="add-new-page__input__body"
            data-placeholder="Sebenarnya saya adalah ...."
            value={this.state.body}
            contentEditable
            onInput={this.onBodyChangeEventHandler}
            />
        </div>
        <div className='add-new-page__action'>
            <button className="action" type="button" title="Simpan" onClick={this.onSubmitEventHandler}><FiSave/></button>
        </div>
    </section>
   )
 }
}

NewNote.propTypes = {
    addNote: PropTypes.func.isRequired,
}

export default NewNote;
