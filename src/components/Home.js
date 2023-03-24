import React, { useEffect, useState } from "react";
import { NewEmployee } from "./NewEmployee";
import { Employee } from "./Employee";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (name, email, username, phone) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        phone: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (id, name, email, username, phone) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        phone: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.email = email;
            user.username = username;
            user.phone = phone;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="pt-4 flex flex-col justify-center items-center  font-bold font-Quicksand">
      <h2 className="  bg-slate-200 pt-4 text-2xl text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Employee List
      </h2>
      <input
        className="w-1/2 my-5 border-gray-600 border-2 rounded-xl p-2"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Type name.."
      />
      <NewEmployee onAdd={onAdd} />
      {users
        .filter((item) => {
          return search.toLocaleLowerCase() === ""
            ? item
            : item.name.toLocaleLowerCase().includes(search);
        })
        .map((user) => (
          <Employee
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}
            username={user.username}
            phone={user.phone}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default Home;
