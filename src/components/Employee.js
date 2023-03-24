import React from "react";
import { useState } from "react";

export const Employee = ({
  name,
  email,
  id,
  username,
  onEdit,
  onDelete,
  phone,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
    alert("Delete successfully");
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(
      id,
      evt.target.name.value,
      evt.target.email.value,
      evt.target.username.value,
      evt.target.phone.value
    );
    setIsEdit(!isEdit);
    alert("Update successfully");
  };

  return (
    <div className="p-4">
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="Name" name="name" defaultValue={name} />
          <input placeholder="Email" name="email" defaultValue={email} />
          <input
            placeholder="Username"
            name="username"
            defaultValue={username}
          />

          <input placeholder="Phone" name="phone" defaultValue={phone} />

          <button
            className="rounded-md px-2 border text-white bg-green-600 hover:bg-white hover:text-green-600"
            onSubmit={handleOnEditSubmit}
          >
            Save
          </button>
        </form>
      ) : (
        <div className="space-x-4 ">
          <span className=" text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-purple-500">
            {name}
          </span>
          <span className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-500 to-pink-700">
            {email}
          </span>
          <span className="text-transparent  bg-clip-text bg-gradient-to-r from-pink-700 to-pink-600">
            {username}
          </span>
          <span className="text-transparent  bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">
            {phone}
          </span>
          <div className="flex justify-end">
            <button
              className="rounded-md px-4  border text-white bg-blue-600 hover:bg-white hover:text-blue-600"
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className="rounded-md px-4 border text-white bg-red-600 hover:bg-white hover:text-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
