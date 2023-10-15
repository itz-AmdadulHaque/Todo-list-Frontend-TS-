export type todoType = {
    name: string,
    completed: boolean,
    _id: string,
    _v: number
}

export interface ListPorpsType {
  todos: todoType[],
  handleDelete: (id: string) => Promise<void>
}

export interface todoPropsType {
  todo: todoType,
  handleDelete: (id: string) => Promise<void>
}

export interface InputPropsType{
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  handleAdd: (e: React.FormEvent)=> Promise<void>
}

