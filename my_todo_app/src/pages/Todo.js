import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import axios from "axios";
import { deletePostDB } from "../redux/modules/post";
import { Write } from "../component/Write";


// import { Modal } from "../component/Modal";
// import { Navigate } from "react-router-dom";

export const Todo = () => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const modalRef = useRef();
//   const navigate = useNavigate();
const dispatch = useDispatch();

 // 삭제하기
 const deletePost = (id) => {
    dispatch(deletePostDB(id));
  };

  const showModal = () => {
    setModal((current) => !current);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // 모달외부 클릭 시 모달이 닫히는 기능
      if (modal && modalRef.current && !modalRef.current.contains(e.target)) {
        setModal(false);
        // console.log(e.target) => 유저가 클릭하는 타겟
      }
    };
    // console.log(modalRef.current) => <button>+</button>
    window.addEventListener("click", handleClickOutside);
  }, [modal]);

  const fetchTodo = async () => {
    try {
      setTodo(null);
      setError(null);
      setLoading(true);
      //엔드포인트에 데이터 요청
      const res = await axios.get("http://localhost:3001/todo");
      setTodo(res.data); //성공했을 때
    //   console.log(res.data);
    } catch (err) {
      setError(err); // 에러가 났을 때
      window.alert("일정을 불러올 수 없습니다. 다시 시도해주세요!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!todo) return null;

  return (
    <div>
      <Header />
      <span>✅깜박하지 마세요!</span>
      <p>오늘의 일정</p>
      <div style={{ backgroundColor: "gray" }}>
        <p>todo</p>
        <div>
          {todo.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.note}</p>
              <p>{item.date}</p>
              <button onClick={deletePost}>일정삭제</button>
            </div>
          ))}
        </div>
        <button onClick={showModal} ref={modalRef}>+</button>
        {modal ?(
            <p>일정 추가하기</p>
        ): null }
      </div>
      <button>back</button>
      <button>next</button>
      <div>
       <Write />
      </div>
    </div>
  );
};

