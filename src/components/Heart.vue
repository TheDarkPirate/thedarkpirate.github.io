<template>
  <div id="heart">
    <span>{{ heartData.isBroken ? 'EVET' : 'HAYIR' }}</span>
    <img class="heart-svg" :src="heartData.isBroken ? brokenHeartSvg : heartSvg" alt="Heart" @click="updateHeart" />
  </div>
</template>

<script setup lang="ts">
import { useHeartData, updateHeartData } from "../firebase";
import brokenHeartSvg from "../assets/broken-heart.svg";
import heartSvg from "../assets/heart.svg";
import { defineProps } from "vue";

const heartData = useHeartData();

const props = defineProps({
  editMode: { type: Boolean, default: false }
});

function updateHeart() {
  if(!props.editMode) return;

  updateHeartData(heartData.value.id, {
    isBroken: !heartData.value.isBroken
  });
}
</script>

<style lang="scss" scoped>
  #heart {
    position: relative;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 25px;
      transform: translate(-50%, -50%);
    }
    .heart-svg {
      height: 300px;
    }
  }
</style>