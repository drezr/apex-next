<template>
  <div>
    <div v-for="work in works" class="work-frame">
      <div
        v-for="columnConfig in columnConfigs"
        class="work-column"
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
            class="work-column-subtitle"
            :style="`width: ${subColumn.width}%;`"
          >
            {{ getLocal(['radium', 'columnTitle', subColumn.name]) }}
          </div>
        </div>
        <div
          v-for="row in work.rows.filter(
            (row) => row.name === columnConfig.name
          )"
          class="work-row"
        >
          <div v-html="row.value"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
let works: Array<Work> = await $fetch('/api/radium/getWorks')
let columnConfigs: Array<ColumnConfig> = await $fetch('/api/radium/getConfig')

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
.work-column {
  border: 1px black solid;
}

.work-column-title {
  text-align: center;
  border: 1px black solid;
}

.work-column-subtitles-frame {
  display: flex;
}

.work-column-subtitle {
  text-align: center;
  border: 1px black solid;
  font-size: 12px;
}

.work-row {
  text-align: center;
  border: 1px black solid;
}
</style>
