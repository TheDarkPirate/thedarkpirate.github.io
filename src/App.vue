<template>
  <section class="friends hacısakir">
    <div class="dove" v-if="showDove">
      <img src="./assets/dove.svg" alt="Güvercin" />
    </div>
    <a href="https://youtu.be/mGFU4VTQovg?t=47" target="_blank" class="happy-burrito" v-if="showBurrito">
      <img src="./assets/guler-yuzlu-durum.svg" alt="Güler Yüzlü Dürüm" />
    </a>
    <div class="knife" v-if="showKnife">
      <img src="./assets/knife.svg" alt="Bıçak" />
    </div>
    <a href="https://instagram.com/thedarkpirate" target="_blank" class="flag" @mouseenter="flagHovered = true" @mouseleave="flagHovered = false">
      <img :src="showPrideFlag ? prideFlag : pirateFlag" alt="Korsan Bayrağı" />
    </a>
  </section>
  <main class="main">
    <h1 class="title">Karakızan'a Hoş Geldiniz!</h1>
    <p class="question">
      Zahir'in kalbi bugün kırıldı mı?
    </p>
    <div class="heart">
      <Heart />
    </div>
    <div class="counter">Zahir'in kalbi {{ heartData.counter }}</div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import pirateFlag from "./assets/kara-kizan.svg";
import prideFlag from "./assets/gay-kizan.svg";
import Heart from "./components/Heart.vue";
import { useHeartData } from "./firebase";
const heartData = useHeartData();

const showDove = ref(false);
const showBurrito = ref(false);
const showKnife = ref(false);

const flagHovered = ref(false)

const showPrideFlag = computed(() => {
  if(showDove.value || showBurrito.value || showKnife.value) {
    return flagHovered.value;
  }
  return false;
})

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
        showKnife.value = !showKnife.value;
        break;
      case "y":
        showDove.value = !showDove.value;
        break;
      case "s":
        showBurrito.value = !showBurrito.value;
        break;
      default:
        break;
    }
  })
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Arsenal&family=Pirata+One&display=swap');

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  color: #FFF;
  font-family: "Arsenal", sans-serif;
}

body {
  padding: 110px 0px;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
  font-family: "Pirata One", serif;
}

#app {
  width: 100%;
  height: 100%;
}

section.friends {
  > * {
    position: absolute;
  }
  .dove {
    top: 30px;
    left: 30px;
  }
  .happy-burrito {
    top: 30px;
    right: 30px;
  }
  .knife {
    bottom: 30px;
    left: 30px;
  }
  .flag {
    right: 30px;
    bottom: 30px;
  }
}

main.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  h1.title {
    font-size: 50px;
  }
  .question {
    font-size: 40px;
  }
  .heart {
    flex-grow: 1;
  }
  .counter {
    font-size: 30px;
  }
}
</style>