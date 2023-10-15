import { ListPorpsType } from "../type";
import Todo from "./Todo";

const List = ({ todos, handleDelete }: ListPorpsType) => {
  return (
    <>
      {todos?.length === 0 ? (
        <div className="flex flex-grow justify-center items-center">
          <p className="text-2xl font-medium text-green-500">List is Empty</p>
        </div>
      ) : (
        <ul className="grid gap-2 overflow-y-auto">
          {todos.map((todo) => {
            return (
              <Todo todo={todo} handleDelete={handleDelete} key={todo._id} />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default List;
