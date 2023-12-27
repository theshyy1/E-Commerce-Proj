<script setup>
import { RouterView } from "vue-router";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { useRoute } from "vue-router";
const route = useRoute();
function key() {
  return route.path;
}
</script>

<template>
  <div class="">
    <Header></Header>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </transition>
    </router-view>
    <Footer></Footer>
  </div>
</template>
