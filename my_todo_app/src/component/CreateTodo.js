import { CreateTodoInput } from "./CreateTodoInput";

export const CreateTodo = ({
    handleCreateBtnClick,
    isCreateMode,
    renderTodos,
  }) => {
    return (
      <div>
        {isCreateMode && (
          <CreateTodoInput
            // handleCreateBtnClick={handleCreateBtnClick}
            renderTodos={renderTodos}
          />
        )}
        <button onClick={handleCreateBtnClick}>
          일정 추가
        </button>
      </div>
    );
  };