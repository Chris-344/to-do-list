import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [listItem, setListItem] = useState({
    body: "",
    id: "",
  });
  const [listArray, setListArray] = useState([]);

  function deleteItem(id) {
    setListArray(
      listArray.filter((item) =>  item.id !== id)
    );
  }
  function handleChange(e) {
    setListItem(() => {
      const { value } = e.target;
      return {
        body: value,
      };
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (listItem.body !== "") {
      setListArray((prevArr) => [...prevArr, { ...listItem, id: nanoid() }]);
      setListItem((prevItem) => {
        return { ...prevItem, body: "" };
      });
    }
  };
  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleChange}
          name='body'
          className='input-box'
          value={listItem.body}
        />
        <button className='btn'>Add item</button>
        {listArray.map(({ id, body }) => {
          return (
            <ul key={id} className='theList'>
              <div>
                <div className='input-text'>{body}</div>
              </div>
              <button
                type='button'
                className='btn-danger'
                onClick={() => deleteItem(id)}
              >
                Delete
              </button>
            </ul>
          );
        })}
      </form>
    </>
  );
}

export default App;
