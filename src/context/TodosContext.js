import { createContext, useContext, useReducer } from "react";
import todoReducer from "../Reduecers/todoReducer";

export const TodosContext = createContext([]);

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodes = () => {
  return useContext(TodosContext);
};
