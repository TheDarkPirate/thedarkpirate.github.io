<template>
  <img id="heart" :src="heartData.isBroken ? brokenHeartSvg : heartSvg" alt="Heart">
</template>

<script setup lang="ts">
import { useHeartData } from "../firebase";
import brokenHeartSvg from "../assets/broken-heart.svg";
import heartSvg from "../assets/heart.svg";

const heartData = useHeartData();
</script>

<style lang="scss" scoped>
  #heart {
    height: 300px;
  }
</style>