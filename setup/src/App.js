import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'invalid entry');
    } else if (name && isEditing) {
    //edit
    } else {
      showAlert(true, 'success', 'added');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'cleared');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'removed');
    setList(list.filter((item) => item.id !== id));
  };


  return (
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>To-Do List</h3>
        <div className='form-control'>
          <input
            type='text'
            className='todo'
            placeholder='e.g. exam'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='todo-container'>
          <List items={list} removeItem={removeItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
