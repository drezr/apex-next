<template>
  <div>
    <div v-for="work in works" class="work-frame">
      <div
        v-for="columnConfig in columnConfigs"
        class="work-column-frame"
        :style="`width: ${columnConfig.width}px;`"
      >
        <div class="work-column-title">
          {{ getLocal(['radium', 'columnTitle', columnConfig.name]) }}
        </div>
        <div
          class="work-column-subtitles-frame"
          v-if="columnConfig.subColumns.length > 0"
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
                1
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

        <div v-else>
          <div
            v-for="row in work.rows.filter(
              (row) => row.name === columnConfig.name
            )"
            class="work-row-frame"
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
</script>

<style scoped>
.work-frame {
  border: 1px black solid;
  display: flex;
  width: fit-content;
  margin: 10px;
}

.work-column-frame {
  padding-bottom: 5px;
}

.work-column-frame:not(:last-child) {
  border-right: 1px black solid;
}

.work-column-title {
  text-align: center;
  border-bottom: 1px black solid;
}

.work-column-subtitles-frame {
  display: flex;
}

.work-column-subtitle-cell {
  text-align: center;
  font-size: 12px;
  border-bottom: 1px black solid;
}
.work-column-subtitle-cell:not(:last-child) {
  border-right: 1px black solid;
}

.work-row-frame {
  text-align: center;
  border-bottom: 1px black solid;
}

.work-shift-frame {
  display: flex;
  font-size: 12px;
  border-bottom: 1px black solid;
}

.work-shift-cell {
  text-align: center;
}

.work-shift-cell:not(:last-child) {
  border-right: 1px black solid;
}
</style>
