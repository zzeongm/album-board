<template>
   <div>
      <div v-if="page!=null">

            <div class="container">
              <router-link class="item" :to="`/boardread?bno=${board.bno}&pageNo=${page.pager.pageNo}&hit=true`" v-for="board in page.boards" :key="board.bno"><SubAComponent class="SubA mr-5" :bno="board.bno"></SubAComponent></router-link>
            </div>
            
        </div>
        <div> 
          <button @click="changePageNo(1)" class="btn btn-outline-primary btn-sm mr-1">처음</button>
              <button v-if="page.pager.groupNo >1 " @click="changePageNo(page.pager.startPageNo-1)" class="btn btn-outline-info btn-sm mr-1">이전</button>
              
              <button v-for=" pageNo in range(page.pager.startPageNo, page.pager.endPageNo)" :key="pageNo" @click="changePageNo(pageNo)" class="btn btn-sm mr-1" :class="(page.pager.pageNo==pageNo)?'btn-danger':'btn-outline-success'">{{pageNo}}</button>
              <button v-if="page.pager.groupNo < page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)" class="btn btn-outline-info btn-sm mr-1">다음</button>
              <button @click="changePageNo(page.pager.totalPageNo)" class="btn btn-outline-info btn-sm mr-1">맨끝</button>
        </div>
  </div>
</template>

<script setup>
import apiBoard from "@/apis/board";
import { ref,reactive,watch} from "vue";
import { useRoute,useRouter } from "vue-router";


import SubAComponent from "@/components/SubAComponent.vue";
const page = ref(null);
const route = useRoute();
const router = useRouter();

let pageNo = route.query.pageNo;
if(pageNo === 'undefined') {
 pageNo = 1;
}
async function getBoardList(pageNo) {
 const result = await apiBoard.getBoardList(pageNo);
 if(result.result === "success") {
  page.value = result.data;
  
 }
}
getBoardList(pageNo);
function range(start, end) {
const numbers = [];
for (var i=start; i<=end ; i++) {
numbers.push(i);
}
 return numbers;
}

function changePageNo(pageNo){
  router.push(`/?pageNo=${pageNo}`);
}

watch(route, (newUrl,oldUrl)=>{
 
  if(newUrl.path === "/"){
    if(newUrl.query.pageNo){
      getBoardList(newUrl.query.pageNo);
    }else {
      getBoardList(1);
    }
  }
});
</script>

<style scoped>
.container {
  display: grid;
  grid: '. . . .';
  gap: 4px; /* ⬅️ */
  /* row-gap: 16px; */
  /* column-gap: 16px; */
}
.item { 
  padding: 4px;
  background: white; 
}
button{
  border-radius: 80%;
    overflow: hidden;
}

</style>
