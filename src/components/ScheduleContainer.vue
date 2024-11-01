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

function handleButtonClick(index) {
  if (index === -2) {
    schedulerStore.setCurrentPage(0)
  } else if (index === -1) {
    schedulerStore.setCurrentPage(
      schedulerStore.alternativeSchedules.length - 1,
    )
  } else {
    schedulerStore.setCurrentPage(index)
  }
}
</script>

<template>
  <div class="schedule-container">
    <!-- <div class="buttons-container"> -->
    <div
      class="buttons"
      v-if="
        schedulerStore.alternativeSchedules &&
        schedulerStore.alternativeSchedules[0] &&
        schedulerStore.alternativeSchedules[schedulerStore.currentPage]
          .outerHTML
      "
    >
      <div
        class="button go-to-first-page"
        @click="handleButtonClick(-2)"
        :aria-disabled="
          schedulerStore.currentPage === 0 ||
          schedulerStore.alternativeSchedules.length === 1
        "
      >
        <div class="button-content go-to-first-page">
          {{ '<<' }}
        </div>
      </div>
      <div
        class="button prev"
        @click="handlePrev"
        :aria-disabled="
          schedulerStore.currentPage === 0 ||
          schedulerStore.alternativeSchedules.length === 1
        "
      >
        <div class="button-content prev">
          {{ '<' }}
        </div>
      </div>
      <div
        class="middle-buttons"
        v-if="schedulerStore.alternativeSchedules.length > 0"
      >
        <div
          v-for="(
            alternativeSchedule, index
          ) in schedulerStore.alternativeSchedules"
          :key="index"
        >
          <div
            class="button"
            @click="handleButtonClick(index)"
            :aria-disabled="schedulerStore.currentPage === index"
          >
            <div class="button-content">
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="schedulerStore.alternativeSchedules.length === 1">
        <div
          class="button"
          @click="handleButtonClick"
          :aria-disabled="
            schedulerStore.currentPage === 0 ||
            schedulerStore.alternativeSchedules.length === 1
          "
        >
          <div class="button-content prev">
            {{ schedulerStore.alternativeSchedules.length }}
          </div>
        </div>
      </div> -->
      <!-- <div v-else-if="schedulerStore.alternativeSchedules.length > 1"></div> -->
      <div
        class="button next"
        @click="handleNext"
        :aria-disabled="
          schedulerStore.currentPage ===
            schedulerStore.alternativeSchedules.length - 1 ||
          schedulerStore.alternativeSchedules.length === 1
        "
      >
        <div class="button-content next">
          {{ '>' }}
        </div>
      </div>
      <div
        class="button go-to-last-page"
        @click="handleButtonClick(-1)"
        :aria-disabled="
          schedulerStore.currentPage ===
            schedulerStore.alternativeSchedules.length - 1 ||
          schedulerStore.alternativeSchedules.length === 1
        "
      >
        <div class="button-content go-to-last-page">
          {{ '>>' }}
        </div>
      </div>
    </div>
    <!-- </div> -->
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

/* .schedule-container .buttons-container {
  display: flex;
} */

.schedule-container .buttons,
.schedule-container .middle-buttons {
  display: flex;
  gap: 0.25rem;
}

.schedule-container .buttons {
  margin-top: -0.375rem;
  margin-bottom: 0.25rem;
}
.schedule-container .button {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  border-radius: 50%;
  border: 2px solid #eaddca;
  /* background-color: #eaddca; */
  background-color: #ffffff;
  color: #eaddca;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  cursor: pointer;

  padding: 0.875rem;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.schedule-container .middle-buttons .button {
  font-size: 1rem;
}
.schedule-container .middle-buttons .button .button-content {
  margin-top: 0;
}
.schedule-container .button:hover {
  border: 2px solid #ffffff;
  /* background-color: #ffffff; */
  background-color: #eaddca;
  color: white;
}
.schedule-container .button:active {
  transform: translateY(1px);
}

.schedule-container .button.go-to-first-page,
.schedule-container .button.go-to-last-page {
  width: 2.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  border-radius: 30px;
}

.schedule-container .button-content {
  margin-top: -0.25rem;
}

.schedule-container .button-content.prev {
  margin-left: -0.125rem;
}

.schedule-container .button-content.next {
  margin-right: -0.125rem;
}

/* .schedule-container .button:hover {
  background-color: white;
  color: #eaddca;
  border: 1px solid #eaddca;
} */

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
