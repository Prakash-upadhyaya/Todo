import { useEffect, useState } from "react";

function Home() {
  const [todoValue, setTodoValue] = useState("");
  const [data, setData] = useState(getTodo());

  function changeValue(event) {
    setTodoValue(event.target.value);
  }

  function getTodo() {
    const items = JSON.parse(localStorage.getItem("TODO"));
    if (items) {
      return items;
    } else {
      return [];
    }
  }
  function addItem() {
    if (!todoValue) {
      alert("Please add some data");
      return;
    } else {
      const setTodoWithID = {
        id: new Date().getTime().toString(),
        name: todoValue,
      };
      setData([...data, setTodoWithID]);
      setTodoValue("");
    }
  }

  function DeleteVal(id) {
    const del_data = data.filter((item) => {
      return item.id !== id;
    });
    setData(del_data);
  }

  useEffect(() => {
    localStorage.setItem("TODO", JSON.stringify(data));
  }, [data]);

  function Check(event) {
    let element = event.target;
    element.classList.toggle("checked");
  }
  return (
    <>
      <h2 className="App">Todo List</h2>

      <div className="container">
        <lable for="Todo" className="form-lable">
          Add Todo here{" "}
        </lable>
        <input
          type="text"
          value={todoValue}
          placeholder="Add Todo"
          onChange={changeValue}
          className="form-control"
        />
        <br />
        <button onClick={addItem} className="btn btn-success">
          Add
        </button>
      </div>
      <br />
      <div className="container containet-list">
        {data.length > 0 ? "List of ToDos" : "No items to diplay"}

        {data.map((items, index) => {
          return (
            <>
              <ul className="list-group">
                <li className="list-group-item" key={index}>
                  <h4
                    onClick={(event) => Check(event)}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p> {items.name}</p>
                    <span>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          DeleteVal(items.id);
                        }}
                      >
                        X
                      </button>
                    </span>
                  </h4>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}
export default Home;
