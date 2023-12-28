<script setup>
import { RouterView } from "vue-router";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { useRoute } from "vue-router";
</script>

<template>
  <div class="">
    <Header></Header>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <KeepAlive>
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </KeepAlive>
      </transition>
    </router-view>
    <Footer></Footer>
  </div>
</template>
