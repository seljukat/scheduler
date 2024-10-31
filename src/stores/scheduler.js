import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSchedulerStore = defineStore('scheduler', () => {
  const multiSelectOptions = ref([])
  const allCourses = ref([])
  const alternativeSchedules = ref([])
  const query = ref([])
  const queriedCourses = ref([])
  const currentPage = ref(0)
  const coursesToDisplay = ref([])

  function setCoursesToDisplay(data) {
    coursesToDisplay.value = data
  }

  function setMultiSelectOptions(data) {
    multiSelectOptions.value = data
  }

  function setAllCourses(data) {
    allCourses.value = data
  }

  function setAlternativeSchedules(data) {
    alternativeSchedules.value = data
  }

  function setQuery(data) {
    query.value = data
  }

  function setQueriedCourses(data) {
    queriedCourses.value = data
  }

  function setCurrentPage(data) {
    currentPage.value = data
  }

  return {
    allCourses,
    setAllCourses,
    alternativeSchedules,
    setAlternativeSchedules,
    query,
    setQuery,
    queriedCourses,
    setQueriedCourses,
    multiSelectOptions,
    setMultiSelectOptions,
    currentPage,
    setCurrentPage,
    coursesToDisplay,
    setCoursesToDisplay,
  }
})
