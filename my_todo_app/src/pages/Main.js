import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { TodoList } from "../component/TodoList";

export const Main =()=>{
    const [isCreateMode, setIsCreateMode] = useState(false);

    const handleCreateBtnClick = () => {
        setIsCreateMode(!isCreateMode);
    };
    return (
      <div>
        <TodoList
          handleCreateBtnClick={handleCreateBtnClick}
          isCreateMode={isCreateMode}
        ></TodoList>
      </div>
    );
}