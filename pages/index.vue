<template>
  <div>
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
          v-if="columnConfig.subColumns.length > 0"
          :style="_color.pickBG(work.color, 3)"
        >
          <div
            v-for="subColumn in columnConfig.subColumns"
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
                :style="`width: ${columnConfig.subColumns[0].width}%;`"
              >
                {{ _date.getWeek(shift.date) }}
              </div>
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumns[1].width}%;`"
              >
                {{ _date.formatDatetimeNoYear(shift.date) }}
              </div>
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumns[2].width}%;`"
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
                v-for="subColumn in columnConfig.subColumns"
                class="work-shift-cell"
                :style="`width: ${subColumn.width}%;`"
              >
                {{ limit[subColumn.name as keyof WorkLimit] }}
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
  </div>
</template>

<script setup lang="ts">
let works: Array<Work> = await $fetch('/api/radium/getWorks')
let columnConfigs: Array<ColumnConfig> = await $fetch(
  '/api/radium/getColumnsConfig'
)

const nonGenericRows = ['shift', 'limit']

for (let work of works) {
  for (let config of columnConfigs) {
    if (!nonGenericRows.includes(config.name)) {
      let isRowFound = work.rows.find((row) => config.name == row.name)

      if (!isRowFound) {
        work.rows.push({
          name: config.name,
          value: '',
          color: '',
          position: 0,
        })
      }
    }
  }
}

works = reactive(works)
columnConfigs = reactive(columnConfigs)

let selectedWork: any = ref(null)

columnConfigs.sort(
  (a: ColumnConfig, b: ColumnConfig) => a.position - b.position
)

function onColumnClick(columnConfig: ColumnConfig, row: WorkRow) {
  if (columnConfig.clickAction == 'url') {
    window.open(columnConfig.clickValue + row.value, '_blank')
  }
}

function openDetailModal(work: Work) {
  selectedWork.value = JSON.parse(JSON.stringify(work))
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
