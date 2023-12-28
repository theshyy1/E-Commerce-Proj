<script setup></script>
<template>
  <div class="container">
    <h1 class="text-4xl font-bold text-blue-700 mt-[30px]">Dashboard</h1>
    <div class="flex justify-between items-center mt-[30px]">
      <div
        class="flex justify-center bg-white items-center shadow-sm rounded py-[50px] px-[60px]"
      >
        <span class="text-5xl mr-4 text-purple-400">
          <i class="fa-solid fa-square-poll-vertical"></i>
        </span>
        <div class="space-y-4">
          <h5 class="text-xl">Revenues</h5>
          <p class="text-purple-800 text-xl">$ 3000</p>
        </div>
      </div>
      <div
        class="flex justify-center bg-white items-center shadow-sm rounded py-[50px] px-[60px]"
      >
        <span class="text-5xl mr-4 text-blue-400">
          <i class="fa-brands fa-shopify"></i>
        </span>
        <div class="space-y-4">
          <h5 class="text-xl">Orders</h5>
          <p class="text-purple-800 text-xl">500</p>
        </div>
      </div>
      <div
        class="flex justify-center bg-white items-center shadow-sm rounded py-[50px] px-[60px]"
      >
        <span class="text-5xl mr-4 text-yellow-700">
          <i class="fa-solid fa-chart-column"></i>
        </span>
        <div class="space-y-4">
          <h5 class="text-xl">Sales</h5>
          <p class="text-purple-800 text-xl">1500</p>
        </div>
      </div>
      <div
        class="flex justify-center bg-white items-center shadow-sm rounded py-[50px] px-[60px]"
      >
        <span class="text-5xl mr-4 text-red-400">
          <i class="fa-solid fa-users"></i>
        </span>
        <div class="space-y-4">
          <h5 class="text-xl">Employees</h5>
          <p class="text-purple-800 text-xl">200</p>
        </div>
      </div>
    </div>
    <div class="chart">
      <h3>Bieu do</h3>
    </div>
  </div>
</template>
