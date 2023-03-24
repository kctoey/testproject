import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

export function NewEmployee({ onAdd }) {
  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    if (
      !evt.target.name.value ||
      !evt.target.email.value ||
      !evt.target.username.value ||
      !evt.target.phone.value
    ) {
      alert("Some fill are incomplete");
    } else {
      onAdd(
        evt.target.name.value,
        evt.target.email.value,
        evt.target.username.value,
        evt.target.phone.value
      );
      alert("Create successfully");
    }

    evt.target.name.value = "";
    evt.target.email.value = "";
    evt.target.username.value = "";
    evt.target.phone.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3 className="p-2  text-xl text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Add Employee
      </h3>

      <input className="p-2" placeholder="Name" name="name" />
      <input className="p-2" placeholder="Email" name="email" />
      <input className="p-2" placeholder="Username" name="username" />
      <input className="p-2" placeholder="phone" name="phone" />

      <button
        className="rounded-md p-4 border text-white bg-green-600 hover:bg-white hover:text-green-600"
        onSubmit={handleOnSubmit}
      >
        <button>
          <BsPencilSquare />
        </button>
      </button>

      <hr />
    </form>
  );
}

export default NewEmployee;
