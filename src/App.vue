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
</style>
