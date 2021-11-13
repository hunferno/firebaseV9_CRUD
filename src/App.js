import React, { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase_config";

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const usersCollectionFromDB = collection(db, "users");

  // Fetch data from DB Tjr en async
  useEffect(() => {
    const getUsers = async () => {
      const dataFromDB = await getDocs(usersCollectionFromDB);
      setUsers(dataFromDB.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  //Function for creating a user
  const createUser = async () => {
    await addDoc(usersCollectionFromDB, {
      name: userName,
      age: Number(userAge),
    });
  };

  //Function for updating user info
  const updateUser = async (id, age) => {
    try {
      console.log(id);
      const userDoc = doc(db, "users", id);
      let newAge = prompt("Entrez votre nouvel age");
      alert("beforeupdate");
      // await updateDoc(userDoc, { age: age + 1 });
      await updateDoc(userDoc, { age: Number(newAge) });
    } catch (error) {
      alert("updatefailed");
      alert(error.message);
    }
  };

  //Function for updating user info
  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(e) => setUserAge(e.target.value)}
      />
      <button onClick={createUser}>Add user</button>
      {users.map((user, index) => (
        <div key={index}>
          <h1>Name : {user.name}</h1>
          <h1>Age : {user.age} ans</h1>
          <button onClick={() => updateUser(user.id, user.age)}>
            Update age
          </button>
          <button onClick={() => deleteUser(user.id)}>Delete user</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
