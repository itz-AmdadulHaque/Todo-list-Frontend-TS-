import { FaPlus } from "react-icons/fa";
import { InputPropsType } from "../type";

const Input = ({name, setName, handleAdd}: InputPropsType) => {
  return (
    <>
      <form className="flex gap-2 p-4" onSubmit={handleAdd}>
        <input
          className="p-2 flex-grow bg-gray-500 text-white placeholder-white rounded-md"
          type="text"
          placeholder="Add Item"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button className="p-2 rounded-md bg-black text-xl text-green-500 border-2 border-black hover:border-gray-500">
          <FaPlus />
        </button>
      </form>
    </>
  );
};

export default Input;
