import { useSchedulerStore } from '@/stores/scheduler'
import * as XLSX from 'xlsx'
// import { useSchedulerStore } from '../stores/scheduler'

// const schedulerStore = useSchedulerStore()

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const hours = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
]
export const dayToIndex = { 'Mo': 1, 'Tu': 2, 'We': 3, 'Th': 4, 'Fr': 5 }
export const hourToIndex = {
  '09': 1,
  '10': 2,
  '11': 3,
  '12': 4,
  '13': 5,
  '14': 6,
  '15': 7,
  '16': 8,
  '17': 9,
  '18': 10,
  '19': 11,
  '20': 12,
  '21': 13,
}
export const bgColors = [
  '#ADD8E6', // blue
  '#F0E68C', // yellow
  '#F08080', // red
  '#C0C0C0', // grey
  '#90EE90', // green
  '#9370DB', // purple
  '#FFA500', // orange
  '#D8BFD8', // pink
  '#ADD8E680', // blue
  '#F0E68C80', // yellow
  '#F0808080', // red
  '#C0C0C080', // grey
  '#90EE9080', // green
  '#9370DB80', // purple
  '#FFA50080', // orange
  '#D8BFD880', // pink
]

export const dayIndices = [
  [1, 8, 14, 20, 26, 32],
  [2, 9, 15],
  [3, 10, 16],
  [4, 11, 17],
  [5, 12, 18],
]

export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      resolve(jsonData)
    }
    reader.onerror = error => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

// export function createAlternativeSchedules() {

// }

const gridItemInnerHTML = (
  rowIndex,
  colIndex,
  gridItem,
  gridItemNumber,
  gridItemContent,
  alterGridCount,
) => {
  if (gridItemNumber === 1) {
    gridItem.innerHTML = `
          # ${alterGridCount}
      `
    gridItem.style.fontSize = '20px'
    gridItem.style.fontWeight = 'bold'
  } else if (rowIndex === 0) {
    gridItem.innerHTML = days[gridItemNumber - 2]
    gridItem.style.fontSize = '12px'
    gridItem.style.fontWeight = 'bold'
    gridItem.classList.add('day-cell')
  } else if (colIndex === 0) {
    gridItem.innerHTML = hours[rowIndex - 1]
    gridItem.style.fontSize = '12px'
    gridItem.style.fontWeight = 'bold'
    gridItem.classList.add('hour-cell')
  } else {
    if (!gridItem.classList.contains('non-empty-cell')) {
      gridItem.innerHTML = gridItemNumber - 1
      gridItem.classList.add('empty-cell')
    }
    gridItem.innerHTML = gridItemContent
  }
  return gridItem
}

const rowCount = 14
const colCount = 6

const schedulerGridItems = (
  alternativeSchedules,
  alterSchedulesList,
  lecturesToDisplay,
  conflictMeasure,
  query,
  alterGridCount,
  alterSchedulesListCount,
) => {
  // useSchedulerStore().setAlternativeSchedules([])
  if (alterSchedulesList !== undefined && alterSchedulesListCount < 2) {
    let alterGridNumber = 1

    alterSchedulesList.forEach(alterSchedule => {
      let displayList = []

      const schedulerGridContainer = document.createElement('div')
      schedulerGridContainer.classList.add('scheduler-grid-container')

      let rowIndex
      let colIndex

      let gridItem
      let gridItemNumber
      let gridItemName
      let gridItemContent

      let dataItem
      let dataItemPositions

      // const lectureNameColors = new Map()

      // let colorIndex = 0

      for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (colIndex = 0; colIndex < colCount; colIndex++) {
          gridItem = document.createElement('div')
          gridItemNumber = rowIndex * colCount + colIndex + 1
          gridItem.className = `scheduler-grid-item scheduler-grid-item-${gridItemNumber}`

          dataItem = undefined
          alterSchedule.forEach(object => {
            if (object.PositionsOnGrid.includes(gridItemNumber - 1)) {
              dataItem = object
            }
          })

          if (dataItem !== undefined) {
            gridItemName = `<div>${dataItem.Section}<div>`
            gridItemContent = `
                      <div>${dataItem.Section}</div>
                      <div>${dataItem.Room?.slice(0, 4) ?? ''}</div>
                      `
            dataItemPositions = dataItem.PositionsOnGrid
            // if (!lectureNameColors.has(gridItemName)) {
            //   const color = bgColors[colorIndex]
            //   lectureNameColors.set(gridItemName, color)
            //   colorIndex++
            // }
            // const bgClr = lectureNameColors.get(gridItemName)
            const bgClr = query.filter(query => query.code === dataItem.Code)[0]
              .bgColor
            gridItem.style.backgroundColor = bgClr
            gridItem.style.fontSize = '12px'
            gridItem.style.fontWeight = 'bold'
            gridItem.classList.add('non-empty-cell')
            if (!dataItem.hasOwnProperty('bgColor')) {
              Object.defineProperty(dataItem, 'bgColor', {
                value: bgClr,
              })
            }

            const hasDuplicate = displayList.some(
              item => item.Section === dataItem.Section,
            )
            if (!hasDuplicate) {
              const dataItemToPush = {
                ...dataItem,
                bgColor: bgClr,
              }
              displayList.push(dataItemToPush)
            }
          } else {
            gridItemContent = ''
            dataItemPositions = undefined
          }

          gridItem = gridItemInnerHTML(
            rowIndex,
            colIndex,
            gridItem,
            gridItemNumber,
            gridItemContent,
            alterGridCount,
          )
          schedulerGridContainer?.appendChild(gridItem)

          if (dataItemPositions !== undefined) {
            dataItemPositions.forEach(position => {
              gridItem = gridItemInnerHTML(
                rowIndex,
                colIndex,
                gridItem,
                gridItemNumber,
                gridItemContent,
                alterGridCount,
              )
              schedulerGridContainer?.appendChild(gridItem)
            })
          }
        }
      }
      alterGridCount++

      let gridItemCount = 0
      for (
        let index = 0;
        index < schedulerGridContainer.childNodes.length;
        index++
      ) {
        if (
          schedulerGridContainer.childNodes
            .item(index)
            .classList.contains('non-empty-cell')
        ) {
          gridItemCount++
        }
      }

      if (gridItemCount >= conflictMeasure) {
        schedulerGridContainer.childNodes.item(0).innerHTML =
          `${alterGridNumber}`
        alternativeSchedules.push(schedulerGridContainer)
        lecturesToDisplay.push(displayList)
        alterGridNumber++
      }
    })
    alterSchedulesListCount++
  }

  // return alternativeSchedules
}

const groupConsecutivePairs = arr => {
  const result = []
  for (let i = 0; i < arr.length; i += 2) {
    result.push([arr[i], arr[i + 1]])
  }
  return result
}

const calculateAverageAndInsert = arr => {
  const result = []

  if (arr.length > 1) {
    for (let i = 0; i < arr.length - 1; i = i + 2) {
      if (arr[i + 1] - arr[i] === 12) {
        result.push(arr[i])
        result.push(arr[i + 1] - 6)
        result.push(arr[i + 1])
      } else {
        result.push(arr[i])
        result.push(arr[i + 1])
      }
    }
    return result
  }

  result.push(arr[arr.length - 1])
  return result
}

export function createAlternativeSchedules(queriedCourses, query) {
  let gridItemLength = 0

  // console.log('query', query)
  // console.log('queriedCourses', queriedCourses)

  const filteredObjects = queriedCourses.map(
    ({ Code, Lecturer, Room, Schedule, Section, T }) => {
      let slicedSchedule

      switch (Schedule.length) {
        case 10:
          slicedSchedule = [Schedule.slice(0, 10)]
          break
        case 21:
          slicedSchedule = [Schedule.slice(0, 10), Schedule.slice(11, 21)]
          break
        case 32:
          slicedSchedule = [
            Schedule.slice(0, 10),
            Schedule.slice(11, 21),
            Schedule.slice(22, 32),
          ]
          break
        case 43:
          slicedSchedule = [
            Schedule.slice(0, 10),
            Schedule.slice(11, 21),
            Schedule.slice(22, 32),
            Schedule.slice(33, 43),
          ]
          break
        default:
          break
      }

      // console.log('slicedSchedule', slicedSchedule)

      const scheduleGridLike = slicedSchedule
        ?.map(timeSlot =>
          timeSlot.replace(/(\w{2}) (\d{2}) - (\d{2})/, '$1,$2,$1,$3'),
        )
        .join(',')
        .split(',')

      // console.log('scheduleGridLike', scheduleGridLike)

      const mappedScheduleGridLike = scheduleGridLike?.map((value, index) => {
        if (index % 2 === 0) {
          return dayToIndex[value]
        } else {
          return hourToIndex[value]
        }
      })

      // console.log('mappedScheduleGridLike', mappedScheduleGridLike)

      const groupedScheduleGridLike = groupConsecutivePairs(
        mappedScheduleGridLike,
      )

      // console.log('groupedScheduleGridLike', groupedScheduleGridLike)

      const positionsOnGrid = groupedScheduleGridLike?.map(
        coords => coords[1] * 6 + coords[0],
      )

      // console.log('positionsOnGrid', positionsOnGrid)

      const updatedPositionsOnGrid = positionsOnGrid
        ?.map((value, index, array) => {
          if (index % 2 === 1) {
            if (array[index - 1] === array[index] - 6) {
              return undefined
            }
            return value - 6
          } else {
            return value
          }
        })
        .filter(value => value !== undefined)

      // console.log('updatedPositionsOnGrid', updatedPositionsOnGrid)

      const finalPositionsOnGrid = calculateAverageAndInsert(
        updatedPositionsOnGrid,
      )

      // console.log('finalPositionsOnGrid', finalPositionsOnGrid)

      return {
        Code,
        Lecturer,
        Room,
        Schedule,
        Section,
        T,
        SlicedSchedule: slicedSchedule,
        ScheduleGridLike: groupedScheduleGridLike,
        PositionsOnGrid: finalPositionsOnGrid,
      }
    },
  )

  // console.log('filteredObjects', filteredObjects)

  const uniqueCodes = new Set()
  const uniqueObjects = []

  filteredObjects.forEach(obj => {
    if (!uniqueCodes.has(obj.Code)) {
      uniqueCodes.add(obj.Code)
      uniqueObjects.push(obj)
      gridItemLength += obj.PositionsOnGrid?.length
    }
  })

  function getAllCombinations(data, current = [], index = 0, result = []) {
    if (index === data.length) {
      const codes = new Set(current?.map(item => item.Code))
      if (codes.size === current.length) {
        result.push([...current])
      }
      return
    }
    current.push(data[index])
    getAllCombinations(data, current, index + 1, result)
    current.pop()
    getAllCombinations(data, current, index + 1, result)

    return result
  }

  let maxLength = 0

  const comb = getAllCombinations(filteredObjects)
  comb?.pop()
  comb?.forEach(arr => {
    maxLength = Math.max(maxLength, arr.length)
  })
  const combs = comb?.filter(arr => arr.length === maxLength)
  const conflictCoefficient = 1
  const conflictMeasure = Math.floor(gridItemLength * conflictCoefficient)

  // console.log('combs', combs)
  // console.log('query', query)

  let alternativeSchedules = []
  let lecturesToDisplay = []

  let alterGridCount = 1
  let alterSchedulesListCount = 1

  if (combs?.length > 0) {
    schedulerGridItems(
      alternativeSchedules,
      combs,
      lecturesToDisplay,
      conflictMeasure,
      query,
      alterGridCount,
      alterSchedulesListCount,
    )

    // console.log('alternativeSchedules', alternativeSchedules)
    // console.log('lecturesToDisplay', lecturesToDisplay)

    useSchedulerStore().setCoursesToDisplay(lecturesToDisplay)
    return alternativeSchedules
  }
}
