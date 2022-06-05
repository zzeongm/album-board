import { createStore } from 'vuex'
import axiosConfig from "@/apis/axiosConfig";

export default createStore({
  state: {
    userId: "",
    authToken: "",
  },
  getters: {
    getUserId(state,getters,rootState,rooorGetters){
      return state.userId;
    },
    getAuthToken(state,getters,rootState,rooorGetters){
      return state.authToken;
    },
  },
  mutations: {
    setUserId(state,payload){
      state.userId = payload;
    },
    setAuthToken(state,payload){
      state.authToken = payload;
    }
  },
  actions: {
    //payload:{userId:"xxx", duration:3000}
    setUserIdByAsync(context, payload){
      console.log("context:",context);
      new Promise((resolve,reject)=>{
        //시간을 요하는 작업
        setTimeout(()=>{
          //성공적으로 응답을 얻었을 경우
          resolve(payload.userId)
        },payload.duration);
        //성공적 처리
      })
      .then((data)=>{
        //resolve가 되었을때 mutation을 이용해서 상태값 변경
        context.commit("setUserId",data);
        console.log("userId 상태 변경 성공")
      })
      //예외가 발생했거나 reject된경우
      .catch((error)=>{
        console.log("userId 상태 변경 실패");
      });
    },
    //payload: {userId:xxxx}
    saveAuth(context, payload){
      context.commit("setUserId", payload.userId);
      context.commit("setAuthToken",payload.authToken);
sessionStorage.setItem("userId", payload.userId);
sessionStorage.setItem("authToken", payload.authToken);

      axiosConfig.addAuthHeader(payload.authToken);


    },
    deleteAuth(context,payload){
      context.commit("setUserId", "");
      context.commit("setAuthToken","");
      sessionStorage.removeItem("userId");
sessionStorage.removeItem("authToken");

      axiosConfig.removeAuthHeader();
    },
    loadAuth(context, payload) {
      context.commit("setUserId", sessionStorage.getItem("userId") || "");  //sessionStorage는 내장된객체
      context.commit("setAuthToken", sessionStorage.getItem("authToken") || "");
      if(context.state.authToken !== "") {
      axiosConfig.addAuthHeader(context.state.authToken);
      }
      },
      
  },
})