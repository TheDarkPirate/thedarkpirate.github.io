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
      Bugün Zahir'in kalbi kırıldı mı?
    </p>
    <div class="heart">
      <Heart :editMode="editMode" />
    </div>
    <div class="counter">
      <span class="static">Zahir'in kalbi </span>
      <span v-if="!editMode">{{ heartData.counter }}</span>
      <input class="counterInput" type="text" v-model="heartData.counter" @change="updateCounter" v-else />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import pirateFlag from "./assets/kara-kizan.svg";
import prideFlag from "./assets/gay-kizan.svg";
import Heart from "./components/Heart.vue";
import { useHeartData, updateHeartData } from "./firebase";
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
});

const editMode = ref(false);

const counterText = ref(heartData.value.counter);

function updateCounter() {
  if(!editMode.value) return;

  updateHeartData(heartData.value.id, {
    isBroken: heartData.value.isBroken,
    counter: heartData.value.counter
  })
}

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
      case "z":
        editMode.value = !editMode.value;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .counter {
    font-size: 30px;
    .counterInput {
      border: none;
      background-color: transparent;
      color: #FFF;
      font-size: inherit;
      font-family: inherit;
      text-decoration: underline;
    }
  }
}
</style>