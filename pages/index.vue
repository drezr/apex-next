<template>
  <div>
    <div
      v-for="work in works"
      class="work-frame"
      :style="_color.pickBG(work.color, 4)"
    >
      <div
        class="work-expand-button"
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
            :style="_color.pickBG(row.color, 4)"
            @click="
              columnConfig.isClickable && onColumnClick(columnConfig, row)
            "
          >
            <div v-html="row.value"></div>
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
    >
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="detailModalLabel">
              {{ _local(['radium', 'detailModal', 'title']) }}
            </h1>

            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              <span
                v-html="_icon('save', 'white', 15)"
                style="position: relative; top: -1px; margin-right: 5px"
              ></span>
              {{ _local(['common', 'save']) }}
            </button>
          </div>

          <div class="work-modal-nav">
            <nav>
              <div
                class="nav nav-pills justify-content-center"
                id="nav-tab"
                role="tablist"
              >
                <button
                  class="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Informations
                </button>
                <button
                  class="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Participations
                </button>
              </div>
            </nav>
          </div>

          <div class="modal-body">
            <div class="tab-content" id="nav-tabContent" v-if="selectedWork">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
                tabindex="0"
              >
                <div class="d-flex justify-content-end">
                  <span
                    style="
                      font-weight: bold;
                      position: relative;
                      top: 7px;
                      left: -5px;
                    "
                  >
                    {{ _local(['radium', 'detailModal', 'workColor']) }}
                  </span>

                  <RadiumColorPicker
                    v-if="selectedWork"
                    :parent="selectedWork"
                    class="mx-2"
                    :top="-20"
                    :left="-105"
                    style="position: relative; top: 10px"
                  />
                </div>

                <div v-for="columnConfig in columnConfigs" class="mb-3">
                  <label
                    class="form-label"
                    style="font-weight: bold; font-size: 18px"
                  >
                    {{ _local(['radium', 'columnTitle', columnConfig.name]) }}
                  </label>

                  <div v-if="columnConfig.name == 'shift'">
                    <div
                      v-for="shift in selectedWork.shifts"
                      class="d-flex"
                      style="align-items: center"
                    >
                      <span
                        v-if="columnConfig.isMultiple"
                        v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                        class="work-modal-drag"
                      ></span>

                      <input
                        class="form-control mb-1"
                        :value="_date.getWeek(shift.date)"
                        disabled
                      />

                      <div
                        class="form-control mb-1 mx-1 work-modal-date"
                        :style="_color.pickBG(shift.color, 5)"
                      >
                        {{ _date.formatDatetimeNoYear(shift.date) }}
                      </div>

                      <input
                        class="form-control mb-1"
                        :value="shift.schedule"
                        @blur="shift.schedule = $event.target.value"
                        :style="_color.pickBG(shift.color, 5)"
                      />

                      <RadiumColorPicker
                        :parent="shift"
                        class="mx-2"
                        :top="-45"
                        :left="-105"
                        style="position: relative; top: -2px"
                      />
                    </div>
                  </div>

                  <div v-else>
                    <div
                      v-for="row in selectedWork.rows.filter(
                        (row) => row.name === columnConfig.name
                      )"
                      class="d-flex"
                      style="align-items: center"
                    >
                      <span
                        v-if="columnConfig.isMultiple"
                        v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                        class="work-modal-drag"
                      ></span>

                      <div
                        class="form-control mb-2"
                        contenteditable="true"
                        v-html="row.value"
                        :style="_color.pickBG(row.color, 5)"
                        @blur="row.value = $event.target.innerHTML"
                      ></div>

                      <RadiumColorPicker
                        :parent="row"
                        class="mx-2"
                        :top="-45"
                        :left="-105"
                        style="position: relative; top: -2px"
                      />
                    </div>
                  </div>

                  <div class="d-grid">
                    <button
                      v-if="columnConfig.isMultiple"
                      type="button"
                      class="btn btn-success btn-sm"
                      style="padding: 0"
                    >
                      <span
                        v-html="_icon('plus', 'white', 20)"
                        style="position: relative; top: -2px"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabindex="0"
              >
                2
              </div>
            </div>
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

for (let work of works) {
  for (let config of columnConfigs) {
    if (!config.isMultiple) {
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

let selectedWork = ref(null)

columnConfigs.sort(
  (a: ColumnConfig, b: ColumnConfig) => a.position - b.position
)

function onColumnClick(columnConfig: ColumnConfig, row: WorkRow) {
  if (columnConfig.clickAction == 'url') {
    window.open(columnConfig.clickValue + row.value, '_blank')
  }
}

function openDetailModal(work) {
  selectedWork.value = work
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

.work-expand-button {
  border-right: 1px solid;
  border-color: $inner-border-color;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  min-height: 100%;
  cursor: pointer;
}

.work-expand-button:hover {
  filter: brightness(1.1);
}

.work-modal-nav {
  padding: 10px;
  border-bottom: 1px solid var(--bs-modal-header-border-color);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
}

.work-modal-date {
  cursor: pointer;
}

.work-modal-date:hover {
  background-color: rgb(250, 250, 250);
}

.work-modal-drag {
  position: relative;
  top: -4px;
  margin-right: 10px;
  cursor: grab;
}

.work-modal-drag:active {
  cursor: grabbing;
}

.modal-header {
  padding: 5px 5px 5px 15px;
}
.work-modal-nav {
  padding: 5px;
}

.modal.fade .modal-dialog {
  transition: transform 0.05s ease-out;
}

.fade {
  transition: opacity 0.05s ease-out;
}
</style>
