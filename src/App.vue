 <template>
  <div id="app" class="d-flex flex-column vh-100">
    <AppHeader/>
      <div class="body">

              <router-view/>   
    </div>
  </div>       
</template>
<script setup>
import AppHeader from "./components/AppHeader.vue";
import {useStore} from "vuex"; //컴포넌트 아니면 쓸 수 없 

const store = useStore();
 store.dispatch("loadAuth");
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
