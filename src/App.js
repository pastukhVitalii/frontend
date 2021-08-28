import './App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState([]);

  const inputRef = useRef(null);
  const getUsers = () => {
    axios.get("http://localhost:3333/users" + window.location.search).then(res => {
      setUsers(res.data)
    })
  }

  useEffect(() => {
    getUsers()
  }, [name])

  const createUser = () => {
    axios.post("http://localhost:3333/users", {name: inputRef.current.value})
      .then(res => {
        getUsers()
      })
  }

  const updateUser = (id, name) => {
    console.log(name);
    axios.put("http://localhost:3333/users", {id, name})
      .then(res => {
        getUsers()
      })
  }

  const onChange = (e) => {
    setName(e.currentTarget.value)
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:3333/users/${id}`)
      .then(res => {
        getUsers()
      })
  }

  console.log(users)
  return (
    <div>
      <div>
        <input onChange={onChange} ref={inputRef}/>
        <button onClick={createUser}>Create</button>
      </div>
      {users.map(u => {
        return (
          <>
            <input defaultValue={u.name} key={u._id} onBlur={(e) => {updateUser(u._id, e.currentTarget.value)}}/>
            <button onClick={() => onDelete(u._id)}>x</button>
          </>
        )
      })}
    </div>
  );
}

export default App;
