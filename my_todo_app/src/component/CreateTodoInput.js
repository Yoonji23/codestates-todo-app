import { useState, useRef } from "react";
import axios from "axios";

export const CreateTodoInput = ({renderTodos}) => {
    const [textCreateInput, setTextCreateInput] = useState("");
    const refInput = useRef(null);
  
    const handleCreateInputChange = (e) => {
      setTextCreateInput(e.target.value);
    };
  
    const handleCreateInputSubmit = () => {
      const newDate = new Date();
      const today = `${newDate.getFullYear()}. ${
        newDate.getMonth() + 1
      }. ${newDate.getDate()}`;
      axios.post("http://localhost:3001/todos",
        {
          content: textCreateInput,
          done: false,
          date: today,
        },
      )
        .then(() => {
            refInput.current.value = "";
        //   handleCreateBtnClick();
          renderTodos();
        })
        .catch((err) => {
          console.error("ERROR: ", err);
        });
    };
  
    const handleOnEnterKeyPress = (e) => {
      if (e.key === "Enter") {
        handleCreateInputSubmit();
      }
    };
return(
    <div>
      <label htmlFor="todo_text">일정:</label>
      <input
        type="text"
        id="todo_text"
        placeholder="일정을 작성하세요"
        maxLength={20}
        ref={refInput}
        onChange={(e) => {
          handleCreateInputChange(e);
        }}
        onKeyPress={handleOnEnterKeyPress}
      />
      <button onClick={handleCreateInputSubmit}>
        등록
      </button>
    </div>
)
}