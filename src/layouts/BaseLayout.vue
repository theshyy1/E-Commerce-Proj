<script setup>
import { RouterView } from "vue-router";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
</script>

<template>
  <div class="">
    <Header />
    <slot></slot>
    <Footer />
  </div>
</template>
