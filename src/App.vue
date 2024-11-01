<script setup>
import InfoContainer from './components/InfoContainer.vue'
import ScheduleContainer from './components/ScheduleContainer.vue'
</script>

<template>
  <div class="app">
    <InfoContainer />
    <ScheduleContainer />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem;
  width: calc(100vw - 5rem);
  height: calc(100vh - 5rem);
}

.info-container {
  animation-name: toRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  z-index: 10;
}

.schedule-container {
  animation-name: toRightFirst;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes toRight {
  0% {
    left: -460px;
    position: relative;
  }

  99% {
    left: 0;
    position: relative;
  }

  100% {
    left: 0;
    position: sticky;
  }
}

@keyframes toRightFirst {
  0% {
    left: -1520px;
    position: relative;
  }

  99% {
    left: 0;
    position: relative;
  }

  100% {
    left: 0;
    position: sticky;
  }
}
</style>
