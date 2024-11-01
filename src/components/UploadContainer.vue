<script setup>
import RightArrow from './icons/RightArrow.vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { ref } from 'vue'
import { useSchedulerStore } from '../stores/scheduler'
import {
  parseExcelFile,
  bgColors,
  createAlternativeSchedules,
} from '../utils/utils.js'

const selectedCourseCodes = ref([])

const schedulerStore = useSchedulerStore()

async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const jsonData = await parseExcelFile(file)

    const filteredData = jsonData.map(course => ({
      Code: course.Code,
      Lecturer: course.Lecturer,
      Room: course.Room,
      Schedule: course.Schedule,
      Section: course.Section,
      T: course.T,
    }))

    schedulerStore.setAllCourses(filteredData)
    // console.log('JSON Data:', schedulerStore.allCourses)

    const uniqueCodes = [
      ...new Set(schedulerStore.allCourses.map(course => course.Code)),
    ]
    schedulerStore.setMultiSelectOptions(uniqueCodes)
  } catch (error) {
    console.error('Error parsing file:', error)
  }
}

function handleApply() {
  if (!selectedCourseCodes.value.length) return

  const codes = selectedCourseCodes.value.map((course, index) => ({
    code: course,
    bgColor: bgColors[index % bgColors.length], // Cycle through bgColors if there are more codes
  }))

  schedulerStore.setQuery(codes)
  // console.log('Query:', schedulerStore.query)

  const filteredCourses = schedulerStore.allCourses.filter(course =>
    schedulerStore.query.some(query => course.Code === query.code),
  )

  schedulerStore.setQueriedCourses(filteredCourses)

  // console.log('Queried Courses:', schedulerStore.queriedCourses)

  schedulerStore.setAlternativeSchedules(
    createAlternativeSchedules(
      schedulerStore.queriedCourses,
      schedulerStore.query,
    ),
  )
}
</script>

<template>
  <div class="upload-container">
    <h1>Scheduler</h1>

    <div class="inputs">
      <div class="input-container">
        <input type="file" accept=".xls, .xlsx" @change="handleFileUpload" />

        <!-- <div class="button-container">
          <RightArrow class="icon" />
          <button>Upload</button>
        </div> -->
      </div>

      <div class="input-container">
        <div class="multiselect-container">
          <Multiselect
            class="multiselect"
            v-model="selectedCourseCodes"
            :options="schedulerStore.multiSelectOptions"
            placeholder="Select courses"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="true"
            :preserve-search="true"
          />
        </div>

        <div class="button-container">
          <RightArrow class="icon" />
          <button @click="handleApply">Apply</button>
        </div>
      </div>
    </div>

    <div class="selected-courses">
      <h3>Selected Courses</h3>
      <p v-if="selectedCourseCodes.length === 0">No course selected</p>
      <div v-else class="container">
        <div
          v-for="course in selectedCourseCodes"
          :key="course"
          class="course"
          :style="`background-color: ${
            schedulerStore.query.find(query => query.code === course)?.bgColor
          }`"
        >
          {{ course }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
  width: 100%;
  height: 40%;
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

.inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.input-container {
  /* background-color: yellow; */
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  /* align-items: self-start; */
  /* position: relative; */
}

.input-container input,
.input-container .multiselect-container {
  /* background-color: red; */
  width: 75%;
}

/* .input-courses {
  border: none;
  border-bottom: 2px solid #eaddca;
  transition: border-color 0.3s;
}
.input-courses:focus {
  outline: none;
  border-color: #ead0b0;
}
.input-courses {
}
.input-courses {
} */

.button-container {
  width: 20%;
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.125rem;
}

.button-container .icon {
  font-size: 0.75rem;
}

.button-container button {
  font-size: 0.75rem;
  padding: 0.125rem;
  width: 3.5rem;
  /* width: 56px; */
  background-color: #eaddca;
  border: 4px solid white;
  padding: 5px;
  border-radius: 10px;
}
.button-container button:hover {
  background-color: white;
  border: 4px solid #eaddca;
  cursor: pointer;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.button-container button:active {
  transform: translateY(2px);
}

.multiselect-container {
  height: 2rem;
}

.multiselect :deep(.multiselect__tags) {
  font-size: 0.5rem;
  padding: 4px 20px 0 4px;
}
.multiselect :deep(.multiselect__placeholder) {
  font-size: 1rem;
}
.multiselect :deep(.multiselect__tag) {
  padding: 4px 16px 4px 4px;
  margin-right: 4px;
  margin-bottom: 0;
}
.multiselect :deep(.multiselect__tag-icon) {
  margin-left: 0;
  width: 16px;
  line-height: 14px;
}

.selected-courses h3,
.selected-courses p,
.selected-courses .container {
  /* position: absolute; */
  margin: 0 0.625rem;
  width: fit-content;
  /* z-index: 1; */
}
.selected-courses h3 {
  font-weight: 500;
  border-bottom: 2px solid #eaddca;
  margin-bottom: 0.5rem;
}
.selected-courses p {
  font-size: 0.875rem;
}
.selected-courses .container {
  /* width: 80%; */
  display: flex;
  flex-wrap: wrap;
  font-size: 0.625rem;
  gap: 0.25rem;
}

.selected-courses .course {
  background-color: lightgray;
  border-radius: 30px;
  padding: 0.125rem 0.5rem;
  /* box-shadow:
  rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
  rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
  rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
}
.selected-courses .course:hover {
  transform: translateY(-0.125em);
}
</style>
