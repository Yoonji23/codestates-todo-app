import axios from "axios";
import { useState } from "react";


export const Todo = ({ todo, renderTodos }) => {
  const { id, content, done, date } = todo;
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [textUpdateInput, setTextUpdateInput] = useState(content);

  // //내용 업데이트
  const handleUpdateSubmitBtnClick = (
    id,
    content,
    isUpdateMode,
    setIsUpdateMode,
    renderTodos
  ) => {
    axios.put(`http://localhost:3001/todos/${id}`,
      {
        content: content,
      },
    )
    .then(() => {
        setIsUpdateMode(!isUpdateMode);
        renderTodos();
      })
    .catch((err) => console.error("ERROR: ", err));
  };
  
  //삭제
  const handleTodoDeleteBtnClick = (id, renderTodos) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        renderTodos();
      })
      .catch((err) => {
        console.error("ERROR: ", err);
      });
  };

  const handleTextUpdateInputChange = (e) => {
    setTextUpdateInput(e.target.value);
  };

  const handleOnKeyPressUpdateForm = (e) => {
    if (e.key === "Enter") {
      handleUpdateSubmitBtnClick(
        id,
        content,
        isUpdateMode,
        setIsUpdateMode,
        renderTodos
      );
    }
  };

  const handleTodoUpdateBtnClick = () => {
    setIsUpdateMode(!isUpdateMode);
  };

  return (
    <div>
      {isUpdateMode ? (
          <>
          <input
            type="text"
            value={textUpdateInput}
            onChange={(e) => {
                handleTextUpdateInputChange(e);
            }}
            onKeyPress={(e) => {
                handleOnKeyPressUpdateForm(e);
            }}
            placeholder="일정을 작성하세요"
            />
          <button
            onClick={() => {
                handleUpdateSubmitBtnClick(
                    id,
                    textUpdateInput,
                    isUpdateMode,
                    setIsUpdateMode,
                    renderTodos
                    );
                }}
                >
            재등록
          </button>
        </>
      ) : (
        <>
         <div>{content}</div>
          <div>{date}</div>
        </>
          )}
      <button onClick={handleTodoUpdateBtnClick}>수정</button>
      <button onClick={() => handleTodoDeleteBtnClick(id, renderTodos)}>
        삭제
      </button>
    </div>
  );
};
