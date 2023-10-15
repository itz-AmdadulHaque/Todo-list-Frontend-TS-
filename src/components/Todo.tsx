import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { todoPropsType } from "../type";
import axios from "../config/axios";

const Todo = ({ todo, handleDelete }: todoPropsType) => {
  const [edit, setEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(todo?.name);
    setIsChecked(todo?.completed);
    console.log("useEffect ", name, " ", isChecked);
  }, []);

  const handleChange = async (id: string) => {
    console.log(isChecked);
    try {
      const response = await axios.patch(`/completed/${id}`, {
        completed: !isChecked,
      });
      const updateTodo = response?.data;
      console.log(updateTodo);
      setIsChecked((pre) => !pre);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {
    if (edit) {
      try {
        // dont call api if the value not change
        if (todo?.name !== name) {
          const response = await axios.put(`/edit/${id}`, { name });
          const updateTodo = response?.data;
          console.log(updateTodo?.message);
          todo.name = name;
        }
        setEdit((pre) => !pre);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEdit((pre) => !pre);
      focusRef.current?.focus();
      console.log("else", focusRef.current?.value);
    }
  };

  return (
    <>
      <li
        className="flex items-center w-full gap-2 px-4 py-2 bg-gray-700"
        key={todo?._id}
      >
        <input
          type="checkbox"
          id={todo?._id}
          className="w-4 h-4 accent-green-400 "
          checked={isChecked}
          onChange={() => handleChange(todo?._id)}
        />
        <div className="flex-grow break-words">
          {!edit ? (
            <label
              htmlFor={todo?._id}
              style={{ textDecoration: isChecked ? "line-through" : "" }}
              className="block w-full break-words"
            >
              {todo?.name}
            </label>
          ) : (
            <input
              type="text"
              className="bg-inherit px-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-md bg-black text-green-300 text-xl border-2 border-black hover:border-gray-500"
            onClick={() => handleEdit(todo?._id)}
          >
            <BiEdit />
          </button>
          <button
            className="p-2 rounded-md bg-black text-red-300 text-xl border-2 border-black hover:border-gray-500"
            onClick={() => handleDelete(todo._id)}
          >
            <RiDeleteBin5Fill />
          </button>
        </div>
      </li>
    </>
  );
};

export default Todo;
