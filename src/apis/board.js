// import axios from "axios";

// async function getBoardList(pageNo=1) {
// let response = null;
// let blob =null;

//  response = await axios.get("/albumboard/list", { params :{ pageNo } });
//  return { result:"success" , data: response.data};
// } 
// async function getImg(bno) {
//   let blob = null;
//   try{
//   const response = await axios.get(`/albumboard/${bno}`, { responseType:"blob"});
//   console.log(response);
//   blob = response.data;
// }catch(error){
//   console.log(error);
// }
//   console.log("blobbbbbbbbb");
//   console.log(blob);
//   return blob;
// }

// async function boardWrite(multipartFormData){
//   let dbBoard =null;
//   const response = await axios.post("/albumboard/create",multipartFormData);
//   dbBoard = response.data;
//   return dbBoard;
// }


// export default {
// getBoardList,
// getImg,
// boardWrite,
// };
// Rest API와 통신하는 Board 모듈
import axios from "axios";
import store from "@/store";
// 게시물 목록 요청
async function getBoardList(pageNo = 1) {
  let response = null;
  try {
    // 지금부터 백엔드 코드와 함께 보면 됨.
    // 보니까 int pageNo를 넘겨야 하네?
    // 그러니까 params를 담아 보내는 것임.
    // axios가 뱉어내는 객체는, 한번 예쁘게 포장된 response 객체임.
    // 그래서 response.data로 진짜 데이터를 얻어올 수 있는 거임.
    response = await axios.get("/board/list", { params: { pageNo } /* { pageNo: pageNo } */ });
    // console.log("response");
    return {result: "success", data: response.data};
  } catch (error) {
    // if(error.response){
    //   if(error.response.status===403){

    //     if(await apiAuth.refreshToken()){
    //       response = await axios.get("/board/list", { params: { pageNo } /* { pageNo: pageNo } */ });
    //       // console.log("response");
    //       return {result: "success", data: response.data};
    //     }
    //   }
    // }else{
    //   //서버 응답이 없다.-> 네트워크 오류
    //   return {result: "fail-network"};
    // }
  }
}

// 게시물 작성하기(multipart로 구성해서 전달)
async function createBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.post("/board/", multipartFormData);
    dbBoard = response.data;
  } catch (error) {
    console.log(error);
    // if(error.response){
    //   if(error.response.status===403){

    //     if(await apiAuth.refreshToken()){
    //       const response = await axios.post("/board/", multipartFormData);
    //       dbBoard = response.data;
    //     }
    //   }
    // }
  }
  return dbBoard;
}

// 게시물 하나 가져오기
async function readBoard(bno, hit) {
  let board = null;
  try {
    const response = await axios.get(`/board/${bno}?hit=${hit}`); // hit는 쿼리스트링으로 가져올 수 있음.
    board = response.data;
  } catch (error) {
    // if(error.response){
    //   if(error.response.status===403){

    //     if(await apiAuth.refreshToken()){
    //       const response = await axios.get(`/board/${bno}?hit=${hit}`); // hit는 쿼리스트링으로 가져올 수 있음.
    // board = response.data;
    //     }
    //   }
    // }
  }
  return board;
}

// 게시물 수정하기(multipart로 구성해서 전달)
async function updateBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.put(`/board/`, multipartFormData);
    dbBoard = response.data;
  } catch (error) {
    // if(error.response){
    //   if(error.response.status===403){

    //     if(await apiAuth.refreshToken()){
    //       const response = await axios.put(`/board/`, multipartFormData);
    // dbBoard = response.data;
    //     }
    //   }
    // }
  }
  return dbBoard;
}



// 파일 다운로드
async function downloadBoardAttach(bno) {
  let blob = null;

  try {
    const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" }); // 다운로드받는 대상이 정확히 blob타입이라는 걸 명시하는 옵션임.
    blob = response.data; // 그래야 blob타입의 데이터를 넣을 수 있다.
  } catch (error) {
    // if(error.response){
    //   if(error.response.status===403){

    //     if(await apiAuth.refreshToken()){
    //       const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" }); // 다운로드받는 대상이 정확히 blob타입이라는 걸 명시하는 옵션임.
    // blob = response.data; // 그래야 blob타입의 데이터를 넣을 수 있다.
    
    //     }
    //   }
    // }
  }
  return blob;
}

// 게시물 삭제
async function deleteBoard(bno) {
  let result = null;

  try {
    const response = await axios.delete(`/board/${bno}`);
    result = response.data.result; // 백엔드에서 넘겨준 result값. ("success")
  } catch (error) {
    // if(error.response){
    //   if(error.response.status===403){

    //     if(await apiAuth.refreshToken()){
    //       const response = await axios.delete(`/board/${bno}`);
    // result = response.data.result; // 백엔드에서 넘겨준 result값. ("success")
    //     }
    //   }
    // }
  }
  return result;
}


// 내보내기
export default {
  getBoardList,
  createBoard,
  readBoard,
  updateBoard,
  downloadBoardAttach,
  deleteBoard,
};
