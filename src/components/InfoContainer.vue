<script setup>
import UploadContainer from './UploadContainer.vue'
import CoursesContainer from './CoursesContainer.vue'
import DeveloperContainer from './DeveloperContainer.vue'
</script>

<template>
  <div class="info-container">
    <UploadContainer />
    <CoursesContainer />
    <DeveloperContainer />
  </div>
</template>

<style scoped>
.info-container {
  padding: 1rem;
  width: 30%;
  background-color: #eaddca;
  border-radius: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
