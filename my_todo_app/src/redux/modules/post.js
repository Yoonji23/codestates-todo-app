import axios from "axios";

////////////
// Action //
////////////

// const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const GET_POST_TODO = "GET_POST_TODO";
const GET_POST_ONE = "GET_POST_ONE";

////////////////////
// Action Creator //
////////////////////
export function deletePost(payload) {
    return { type: DELETE_POST, payload };
  }
  export function getPostTodo(payload) {
    return { type: GET_POST_TODO, payload };
  }
  export function getPostOne(payload) {
    return { type: GET_POST_ONE, payload };
  }


///////////////////
// Initial State //
///////////////////

const initialState = {
    todo
    : [
        {
          "id": "",
          "title": "",
          "note": "",
          "date": ""
        }
    ]
};

////////////////
// Middleware //
////////////////

const url = "http://localhost:3001";

// 게시물 업로드
export const addPostDB = () => {
    return async function (dispatch) {
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
  
  // 게시물 수정
  
//   export const modifyPostDB = (formData, postId) => {
//     return async function (dispatch, getState) {
//       // for (let key of formData.keys()) {
//       //   console.log(key, ":", formData.get(key));
//       // }
//       await axios
//         .put(url + `/posts/${postId}`, formData, {
//           headers: {
//             "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
//             authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         })
//         .then((res) => {
//           console.log(res);
//           dispatch(modifyPost(formData, postId));
//           window.location.assign("/");
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };
//   };
  
  // 게시물 삭제
  export const deletePostDB = (id) => {
    return async function (dispatch) {
      await axios
        .delete(url + `/todo/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(deletePost(id));
          window.location.assign("/");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
  // 게시물 모두 불러오기 | GET
//   export const getPostListDB = () => async (dispatch) => {
//     try {
//       const { data } = await axios.get(url + "/posts");
//       dispatch(getPostList(data.post));
//     } catch (error) {
//       alert("게시물을 불러오는 중에 오류가 발생했습니다.");
//       console.log(error);
//     }
//   };
  
  // 게시글 하나 불러오기 | GET
  export const getPostOneDB = (postId) => async (dispatch) => {
    try {
      const { data } = await axios.get(url + "/posts/" + postId);
      dispatch(getPostOne(data.post));
    } catch (error) {
      alert("게시물을 불러오는 중에 오류가 발생했습니다.");
      console.log(error);
    }
  };

  ///리듀서 함수////
  const itemReducer = (state = initialState, action) => {

    switch (action.type) {
      //장바구니에 추가
      case GET_POST_TODO:
        //TODO
        return {
        ...state,
        cartItems:  [...state.cartItems, action.payload]
      }
        // return Object.assign({}, state, {
        //   cartItems: [...state.cartItems, action.payload]
        // })
        
        break;
        //장바구니 삭제
      case DELETE_POST:
        //TODO
        return {
          ...state,
          todo : state.todo.filter(el=> el.id !== action.payload.id)
        }
        // return Object.assign({},state,{
        //   cartItems:[...state.cartItems.filter(el=> el.itemId !== action.payload.itemId)]
        // })
  
        break;
        //장바구니에 있을 때 개수 변경
      case GET_POST_ONE:
        let targetIdx = state.cartItems.findIndex(el => el.itemId === action.payload.itemId)// 같다는 것은 이미 장바구니에 존재하는 상품!
        return {
          ...state,
          cartItems : state.cartItems.map((el,idx)=> idx === targetIdx? {
            "itemId": action.payload.itemId,
            "quantity": action.payload.quantity
          } : el)
        } 
        //!실패한 방법1
        // if(idx === -1){
        //   return Object.assign({},state, {cartItems: [...state.cartItems, action.payload]})
        // } else {
        //   return Object.assign({}, state, {cartItems :[...state.cartItems[idx].quantity = action.payload.quantity]}) 
        // }
  
        break;
      default:
        return state;
    }
  }
  
  export default itemReducer;