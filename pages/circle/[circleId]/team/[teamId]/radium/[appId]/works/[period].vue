<template>
  <div>
    <!-- <Datepicker
      v-model="date"
      month-picker
      auto-apply
      locale="fr"
      :clearable="false"
      :format="format"
      style="width: 200px"
    /> -->

    <div
      v-for="work in works"
      class="work-frame"
      :style="_color.pickBG(work.color, 4)"
    >
      <div
        class="work-edit-button"
        :style="_color.pickBG(work.color, 4)"
        data-bs-toggle="modal"
        data-bs-target="#detailModal"
        @click="openDetailModal(work)"
      >
        <span v-html="_icon('pencil-fill', 'black', 15)"></span>
      </div>

      <div
        v-for="columnConfig in columnConfigs"
        class="work-column-frame"
        :style="`width: ${columnConfig.width}px;`"
      >
        <div class="work-column-title" :style="_color.pickBG(work.color, 2)">
          {{ _local(['radium', 'columnTitle', columnConfig.name]) }}
          <span
            v-if="columnConfig.isClickable && columnConfig.clickAction == 'url'"
            v-html="_icon('box-arrow-up-right', 'black', 10)"
            style="position: relative; top: -2px"
          ></span>
        </div>
        <div
          class="work-column-subtitles-frame"
          v-if="columnConfig.subColumnConfigs.length > 0"
          :style="_color.pickBG(work.color, 3)"
        >
          <div
            v-for="subColumn in columnConfig.subColumnConfigs"
            class="work-column-subtitle-cell"
            :style="`width: ${subColumn.width}%;`"
          >
            {{ _local(['radium', 'columnTitle', subColumn.name]) }}
          </div>
        </div>

        <div v-if="columnConfig.name == 'shift'">
          <div v-for="shift in work.shifts">
            <div
              class="work-shift-frame"
              :style="_color.pickBG(shift.color, 4)"
            >
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumnConfigs[0].width}%;`"
              >
                {{ _date.getWeek(shift.date) }}
              </div>
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumnConfigs[1].width}%;`"
              >
                {{ _date.formatDatetimeNoYear(shift.date) }}
              </div>
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumnConfigs[2].width}%;`"
              >
                {{ shift.schedule }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="columnConfig.name == 'limit'">
          <div v-for="limit in work.limits">
            <div
              class="work-shift-frame"
              :style="_color.pickBG(limit.color, 4)"
            >
              <div
                v-for="subColumn in columnConfig.subColumnConfigs"
                class="work-shift-cell"
                :style="`width: ${subColumn.width}%;`"
              >
                {{ limit[subColumn.name as keyof Limit] }}
              </div>
            </div>
          </div>
        </div>

        <div v-else style="flex-grow: 1">
          <div
            v-for="row in work.rows.filter(
              (row) => row.name === columnConfig.name
            )"
            :class="[
              `work-row-frame-${
                work.rows.filter((row) => row.name === columnConfig.name)
                  .length > 1
                  ? 'multiple'
                  : 'single'
              }`,
              columnConfig.isClickable ? 'work-row-frame-clickable' : '',
            ]"
            :style="_color.pickBG(row.color, 4)"
            @click="
              columnConfig.isClickable && onColumnClick(columnConfig, row)
            "
          >
            <div v-html="row.value" class="work-row-value"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->

    <div
      class="modal fade"
      id="detailModal"
      ref="detailModal"
      tabindex="-1"
      aria-labelledby="detailModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <RadiumDetailModal
        :works="works"
        :selectedWork="selectedWork"
        :columnConfigs="columnConfigs"
      />
    </div>

    <button @click="createRandomWorks()">CreateRandomWorks</button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const appId = Number(route.params.appId)
const period = String(route.params.period)
const fromDate = _date.swapFormat(period.split(':')[0])
const toDate = _date.swapFormat(period.split(':')[1])

const dataFetch = await _fetch('/api/radium/getWorks', {
  appId: 1,
  fromDate: fromDate,
  toDate: toDate,
})

const app: App = dataFetch.app
let works: Work[] = dataFetch.works
let columnConfigs: ColumnConfig[] = dataFetch.columnConfigs

works.sort((a: Work, b: Work) => {
  const aApp = a.apps.find((app) => app.appId == appId)
  const bApp = b.apps.find((app) => app.appId == appId)

  if (aApp && bApp) {
    return aApp.position - bApp.position
  }

  return 0
})

works = reactive(works)
columnConfigs = reactive(columnConfigs)

let selectedWork: any = ref(null)

columnConfigs.sort(
  (a: ColumnConfig, b: ColumnConfig) => a.position - b.position
)

function onColumnClick(columnConfig: ColumnConfig, row: Row) {
  if (columnConfig.clickAction == 'url') {
    window.open(columnConfig.clickValue + row.value, '_blank')
  }
}

async function openDetailModal(work: Work) {
  let fetchedWork: Work = await _fetch('/api/radium/getWork', {
    workId: work.id,
  })

  selectedWork.value = fetchedWork
}
async function createRandomWorks() {
  await _fetch('/api/helpers/createRandomWorks')
}
</script>

<style lang="scss" scoped>
$inner-border-color: rgb(129, 129, 129);

.work-frame {
  border: 1px black solid;
  display: flex;
  width: fit-content;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.work-column-frame {
  display: flex;
  flex-direction: column;
}

.work-column-frame:not(:last-child) {
  border-right: 1px solid;
  border-color: $inner-border-color;
}

.work-column-title {
  text-align: center;
  border-bottom: 1px solid;
  border-color: $inner-border-color;
  font-weight: bold;
  font-size: 12px;
}

.work-column-subtitles-frame {
  display: flex;
}

.work-column-subtitle-cell {
  text-align: center;
  font-size: 11px;
  border-bottom: 1px solid;
  border-color: $inner-border-color;
  font-weight: bold;
}
.work-column-subtitle-cell:not(:last-child) {
  border-right: 1px solid;
  border-color: $inner-border-color;
}

.work-row-frame-multiple {
  text-align: center;
  border-bottom: 1px solid;
  border-color: $inner-border-color;
}

.work-row-frame-single {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.work-row-frame-clickable {
  cursor: pointer;
  transition: filter 0.2s;
}

.work-row-frame-clickable:hover {
  filter: brightness(1.1);
}

.work-row-value {
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 2px 5px;
  min-height: 28px;
}

.work-shift-frame {
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid;
  border-color: $inner-border-color;
}

.work-shift-cell {
  text-align: center;
  min-height: 21px;
}

.work-shift-cell:not(:last-child) {
  border-right: 1px solid;
  border-color: $inner-border-color;
}

.work-edit-button {
  border-right: 1px solid;
  border-color: $inner-border-color;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  min-height: 100%;
  cursor: pointer;
}

.work-edit-button:hover {
  filter: brightness(1.1);
}
.modal.fade .modal-dialog {
  transition: transform 0.05s ease-out;
}
.fade {
  transition: opacity 0.05s ease-out;
}
</style>
