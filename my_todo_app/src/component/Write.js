import React from "react";
import { useDispatch } from "react-redux";
import { addPostDB } from "../redux/modules/post";
import axios from "axios";

export const Write = () => {
    const dispatch = useDispatch();
    const url = "http://localhost:3001";
    const handleClickPost = ()=>{
        return async function () {
            await axios
              .post(url + "/todo", {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                window.location.assign("/todo")
                console.log('업로드 중입니다!')
              })
              .catch((error) => {
                console.log(error);
              });
          };
        };

  return (
    <div>
      <label htmlFor="title">일정 제목</label>
      <input id="title" type="text" placeholder="일정 제목을 작성해주세요" />
      <label htmlFor="note">메모</label>
      <input
        id="note"
        type="text"
        placeholder="추가할 메모가 있다면 작성하세요"
      />
      <label htmlFor="date">날짜</label>
      <input id="date" type="text" placeholder="날짜를 작성해주세요" />
      <button onClick={handleClickPost}>완료</button>
    </div>
  );
};
