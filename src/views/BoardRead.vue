<template>
   <div>
     <div>
      <div class="d-flex">
        <div>
        <p>번호: {{board.bno}}</p>
        <p>제목: {{board.btitle}}</p>
        <p>내용: {{board.bcontent}}</p>
        <p>유저: {{board.mid}}</p>
        <p>날짜: {{new Date(board.bdate).toLocaleDateString()}}</p>
        <p>조회수: {{board.bhitcount}}</p>
        <p>다운로드: {{board.battachoname}}<button @click="downloadBattach" class="btn btn-info btn-sm ml-2">다운로드</button></p>
        </div>   
        <div>
        <img :src="battach" width="300"/>
      </div>  
      </div>
      
      <router-link class="btn btn-info btn-sm mr-2" to="/">목록</router-link>
      <router-link class="btn btn-info btn-sm mr-2" :to="`/boardupdate?bno=${bno}&pageNo=${pageNo}`">수정</router-link>
      <button class="btn btn-info btn-sm mr-2" @click="boardDelete">삭제</button>
     </div>
  
  </div>
</template>

<script setup>
import { useRoute,useRouter } from "vue-router";
import apiBoard from "@/apis/board";
import apiAuth from "@/apis/auth";
import { ref } from "vue";
import { store } from "@/store";

import fileDownload from "js-file-download";
const router = useRouter();
const route = useRoute();
const bno = route.query.bno;
const pageNo = route.query.pageNo;
const hit = route.query.hit;
const board = ref(null);
const battach = ref(null);


async function getBattach() {
  apiBoard.readBoard(bno,hit)
  .then((data)=>{
    board.value=data;
  })
  console.log(bno);
  const blob = await apiBoard.downloadBoardAttach((bno));
  // const battach = ref(null);
  if(blob != null){
    battach.value = URL.createObjectURL(blob);
  }
}
async function downloadBattach(){
  const blob = await apiBoard.downloadBoardAttach(bno);
  if(blob!=null){
    fileDownload(blob,board.value.battachoname);
  }
}
async function boardDelete(){
  const result = await apiBoard.deleteBoard(bno);
  if(result ==="success"){
    router.push("/")
  }
}


getBattach();


</script>

<style scoped>
img{
  border-radius: 20%;
    overflow: hidden;
    margin-top:10;
}
</style>