<template>
    <nav class="navbar bg-dark navbar-dark text-white font-weight-bold">
    <router-link to="/" class="navbar-brand">
      <img src="../assets/logo.png" alt="" width="30" height="30" class="align-top mr-2"/>앨범게시판
    </router-link>
    <div>
      <!-- <router-link to="/" class="btn btn-success btn-sm">로그인</router-link> -->
      <router-link v-if="$store.state.userId!==''" to="/boardwrite" class="btn btn-info btn-sm mr-2">글 생성</router-link>
      <router-link v-if="$store.state.userId===''" to="/boardjoin" class="btn btn-info btn-sm mr-2">회원가입</router-link>
      <router-link v-if="$store.state.userId===''" to="/boardlogin" class="btn btn-info btn-sm mr-2">로그인</router-link>
      <button v-if="$store.state.userId!==''" class="btn btn-info btn-sm" v-on:click="boardLogout">로그아웃</button>
    </div>
  </nav>
</template>

<script setup>

import { useRouter } from "vue-router";
import apiAuth from "@/apis/auth";

const router = useRouter;

async function boardLogout(){
  await apiAuth.logout();
}
</script>