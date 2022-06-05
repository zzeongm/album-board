<template>
      <div>
       <img class="img" :src="battach" width="250" height="250">
      </div>
</template>

<script setup>
import { defineProps } from "vue";
import { ref, toRaw } from "vue";
import { useRoute } from "vue-router";
import apiBoard from "@/apis/board";

const route = useRoute();
const dno = defineProps(["bno"]); //defineProps에 추가된것은 attrs에선 삭제된다
console.log("dno:",dno);
console.log(JSON.stringify(Object.values(toRaw(dno))));
const cno = JSON.stringify(Object.values(toRaw(dno)));
const bno=cno.replace(/[^0-9]/g,'');
console.log(dno);
const battach = ref(null);
const page = ref(null);
let pageNo = route.query.pageNo;

async function getBattach() {
  const blob = await apiBoard.downloadBoardAttach((bno));
  if(blob != null){
    battach.value = URL.createObjectURL(blob);
  }
  console.log("temp:",battach.value);
}
async function getBoardList(pageNo){
  const result = await apiBoard.getBoardList(pageNo);
  if(result.result ===  "success"){
    page.value = result.data;
  }
  
}

getBattach();

</script>


<style scoped>
.img {
  border-radius: 20%;
    overflow: hidden;
    opacity: 1;transition: all 0.3s ease 0s;overflow: hidden;
}
.img:hover {transform: scale(1.1, 1.1);transition: all .3s ease;opacity: 0.80;}

</style>