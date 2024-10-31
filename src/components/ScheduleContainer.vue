<script setup>
import { ref } from 'vue'
import { useSchedulerStore } from '../stores/scheduler'
const schedulerStore = useSchedulerStore()
import { days, hours } from '../utils/utils.js'

// console.log('Alternative Schedules:', schedulerStore.alternativeSchedules)
// console.log(schedulerStore.alternativeSchedules)

function handleNext() {
  if (
    schedulerStore.currentPage <
    schedulerStore.alternativeSchedules.length - 1
  ) {
    schedulerStore.setCurrentPage(schedulerStore.currentPage + 1)
  }
}

function handlePrev() {
  if (schedulerStore.currentPage > 0) {
    schedulerStore.setCurrentPage(schedulerStore.currentPage - 1)
  }
}
</script>

<template>
  <div class="schedule-container">
    <div class="buttons">
      <button @click="handlePrev">Prev</button>
      <button @click="handleNext">Next</button>
    </div>
    <!-- <div v-if="schedulerStore.alternativeSchedules">
      <div
        v-if="schedulerStore.alternativeSchedules[schedulerStore.currentPage]"
      >
        <div
          v-if="
            schedulerStore.alternativeSchedules[schedulerStore.currentPage]
              .outerHTML
          "
        > -->
    <div
      class="scheduler-grid-outer-outer-container"
      v-if="
        schedulerStore.alternativeSchedules &&
        schedulerStore.alternativeSchedules[schedulerStore.currentPage] &&
        schedulerStore.alternativeSchedules[schedulerStore.currentPage]
          .outerHTML
      "
    >
      <div
        class="scheduler-grid-outer-container"
        v-html="
          schedulerStore.alternativeSchedules[schedulerStore.currentPage]
            .outerHTML
        "
      ></div>
    </div>
    <!-- </div>
      </div>
    </div> -->
    <!-- <div v-else>no schedules</div> -->
    <!-- <div v-if="alternativeSchedules">
      <div v-if="alternativeSchedules[0]">
        <div v-if="alternativeSchedules[0].outerHTML">
          <div v-html="alternativeSchedules[0].outerHTML"></div>
        </div>
        <div v-else>no schedules</div>
      </div>
    </div> -->
  </div>
</template>

<style>
.schedule-container {
  width: 65%;
  background-color: #eaddca;
  border-radius: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
  padding: 0.75rem;
}

/* .schedule-container .buttons {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
} */

.scheduler-grid-outer-outer-container,
.scheduler-grid-outer-container,
.scheduler-grid-container {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* width: 100%; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.scheduler-grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(14, 1fr);
  gap: 1px;
  border-radius: 30px;
  /* padding: 10px;
  margin: 10px; */
  /* margin-top: -50px; */
}

.scheduler-grid-item {
  background-color: white;
  border: 1px solid #eaddca;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scheduler-grid-item.non-empty-cell {
  z-index: 5;
}

.scheduler-grid-item-1 {
  border-top-left-radius: 20px;
}

.scheduler-grid-item-6 {
  border-top-right-radius: 20px;
}

.scheduler-grid-item-79 {
  border-bottom-left-radius: 20px;
}

.scheduler-grid-item-84 {
  border-bottom-right-radius: 20px;
}

.scheduler-grid-item.non-empty-cell:hover,
.scheduler-grid-item.non-empty-cell:focus {
  box-shadow: 0 0.5em 0.5em -0.4em black;
  transform: translateY(-0.25em);
}
</style>
