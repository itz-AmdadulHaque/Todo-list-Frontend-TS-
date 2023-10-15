import { useState, useEffect } from "react";
import axios from "./config/axios";
import Input from "./components/Input";
import List from "./components/List";
import Nav from "./components/Nav";
import { todoType } from "./type";
import Loading from "./components/Loading";

function App() {
  const [list, setList] = useState<todoType[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/");
        setList(response?.data?.todos);
        console.log(response?.data?.todos);

        setLoading(true)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // add
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/add", { name: name });
      const newTodo = response?.data?.data;
      console.log(response?.data);

      setList((preValue) => {
        return [...preValue, newTodo];
      });
      setName("");
    } catch (error) {
      console.log(error);
    }
  };


  // delete
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      const deletedTodo = response?.data;

      setList((preValue) => {
        return preValue.filter((todo)=>{
          return todo._id !==id;
        })
      });
      console.log(deletedTodo.message)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-600 sm:text-lg text-white h-screen">
      <div className="bg-gray-800 md:w-2/3 lg:w-2/5 md:border-2 border-black mx-auto h-full flex flex-col">
        <Nav />
        <Input name={name} setName={setName} handleAdd={handleAdd} />
        {!loading ? <Loading />:<List todos={list} handleDelete = {handleDelete}/>}
      </div>
    </div>
  );
}

export default App;
