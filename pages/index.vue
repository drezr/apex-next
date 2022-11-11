<template>
  <div>
    <div
      v-for="work in works"
      class="work-frame"
      :style="colorTools.pickBG(work.color, 4)"
    >
      <div
        v-for="columnConfig in columnConfigs"
        class="work-column-frame"
        :style="`width: ${columnConfig.width}px;`"
      >
        <div
          class="work-column-title"
          :style="colorTools.pickBG(work.color, 2)"
        >
          {{ getLocal(['radium', 'columnTitle', columnConfig.name]) }}
        </div>
        <div
          class="work-column-subtitles-frame"
          v-if="columnConfig.subColumns.length > 0"
          :style="colorTools.pickBG(work.color, 3)"
        >
          <div
            v-for="subColumn in columnConfig.subColumns"
            class="work-column-subtitle-cell"
            :style="`width: ${subColumn.width}%;`"
          >
            {{ getLocal(['radium', 'columnTitle', subColumn.name]) }}
          </div>
        </div>

        <div v-if="columnConfig.name == 'shift'">
          <div v-for="shift in work.shifts">
            <div class="work-shift-frame">
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumns[0].width}%;`"
              >
                {{ dateTools.getWeek(shift.date) }}
              </div>
              <div
                class="work-shift-cell"
                :style="`width: ${columnConfig.subColumns[1].width}%;`"
              >
                {{ dateTools.formatDatetimeNoYear(shift.date) }}
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

        <div v-else style="flex-grow: 1">
          <div
            v-for="row in work.rows.filter(
              (row) => row.name === columnConfig.name
            )"
            :class="[
              `work-row-frame-${
                columnConfig.isMultiple ? 'multiple' : 'single'
              }`,
              columnConfig.isClickable ? 'work-row-frame-clickable' : '',
            ]"
            :style="colorTools.pickBG(row.color, 4)"
            @click="
              columnConfig.isClickable && onColumnClick(columnConfig, row)
            "
          >
            <div v-html="row.value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
let works: Array<Work> = await $fetch('/api/radium/getWorks')
let columnConfigs: Array<ColumnConfig> = await $fetch(
  '/api/radium/getColumnsConfig'
)

columnConfigs.sort(
  (a: ColumnConfig, b: ColumnConfig) => a.position - b.position
)

// function findFirstRow(rows: Array<WorkRow>, columnConfig: ColumnConfig) {
//   const firstRow = rows.find((row) => row.name === columnConfig.name)

//   return firstRow ? firstRow.value : ''
// }

function onColumnClick(columnConfig: ColumnConfig, row: WorkRow) {
  if (columnConfig.clickAction == 'url') {
    window.open(columnConfig.clickValue + row.value, '_blank')
  }
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

.work-shift-frame {
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid;
  border-color: $inner-border-color;
}

.work-shift-cell {
  text-align: center;
}

.work-shift-cell:not(:last-child) {
  border-right: 1px solid;
  border-color: $inner-border-color;
}
</style>
