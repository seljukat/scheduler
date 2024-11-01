<script setup>
import { useSchedulerStore } from '../stores/scheduler'
const schedulerStore = useSchedulerStore()
</script>

<template>
  <div class="courses-container">
    <h1>Courses</h1>

    <div class="selected-courses">
      <div
        v-for="course in schedulerStore.coursesToDisplay[
          schedulerStore.currentPage
        ]"
        :key="course.Code"
        class="course"
        :style="`background-color: ${course.bgColor}`"
      >
        <!-- <ul class="divide-y divide-gray-200">
            <li
              class="LectureInfo main-grid-item main-grid-item-2 px-3 py-3 flex items-start"
            > -->
        <!-- <div class="flex-grow">
                <div class="flex items-center"> -->
        <div class="">
          {{ course.Section }}
        </div>
        <div class="">
          {{ course.Room?.slice(0, 4) ?? '' }}
        </div>
        <div
          v-for="(day, dayIndex) in course.SlicedSchedule"
          :key="dayIndex"
          class=""
        >
          {{ day }}
        </div>
        <div class="">
          {{ course.Lecturer?.replace(/([^\s]+)\s(\S).*/, '$1 $2.') }}
        </div>
        <!-- </div>
              </div> -->
        <!-- </li>
          </ul> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.courses-container {
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
  width: 100%;
  height: 52.5%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  background-color: #eaddca;
  border-radius: 30px;
  padding: 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  width: fit-content;
}

.selected-courses {
  width: 100%;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;

  flex-wrap: wrap;
}

.selected-courses .course {
  font-size: 0.625rem;
  width: 110px;
  height: 110px;
  padding: 10px;
  border-radius: 15px;
  border: 5px solid #eaddca;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.selected-courses .course:hover {
  transform: translateY(-0.25em);
}
</style>
