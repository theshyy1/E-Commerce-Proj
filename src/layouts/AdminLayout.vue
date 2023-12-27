<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import { useRoute } from "vue-router";
import AdHeader from "../components/AdHeader.vue";
const route = useRoute();
function key() {
  return route.path;
}
</script>

<template>
  <div class="relative">
    <AdHeader />
    <div class="">
      <Sidebar />
      <router-view class="float-right w-4/5 p-6" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
