<template>
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="detailModalLabel">
          {{ _local(['radium', 'detailModal', 'title']) }}
        </h1>

        <div class="d-flex">
          <button
            type="button"
            class="btn btn-secondary me-2"
            @click="resetWork()"
          >
            <span
              v-html="_icon('arrow-clockwise', 'white', 15)"
              style="position: relative; top: -1px; margin-right: 5px"
            ></span>
            {{ _local(['common', 'reset']) }}
          </button>

          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="saveWork()"
          >
            <span
              v-html="_icon('save', 'white', 15)"
              style="position: relative; top: -1px; margin-right: 5px"
            ></span>
            {{ _local(['common', 'save']) }}
          </button>
        </div>
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
        <div class="tab-content" id="nav-tabContent" v-if="currentWork">
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

              <ColorPicker
                v-if="currentWork"
                :parent="currentWork"
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
                  v-for="shift in currentWork.shifts"
                  class="d-flex"
                  style="align-items: center"
                >
                  <span
                    v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                    class="work-modal-drag"
                  ></span>

                  <input
                    class="form-control mb-1"
                    :value="_date.getWeek(shift.date)"
                    disabled
                  />

                  <div class="form-control mb-1 mx-1 work-modal-date">
                    {{ _date.formatDatetimeNoYear(shift.date) }}
                  </div>

                  <div
                    class="form-control mb-1"
                    contenteditable="true"
                    v-html="shift.schedule"
                    @blur="setField($event, shift, 'schedule')"
                  ></div>

                  <ColorPicker
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
                  v-for="row in currentWork.rows.filter(
                    (row: WorkRow) => row.name === columnConfig.name
                  )"
                  class="d-flex"
                  style="align-items: center"
                >
                  <span
                    v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                    class="work-modal-drag"
                  ></span>

                  <Tiptap v-model="row.value" class="mb-2 flex-grow-1" />

                  <ColorPicker
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
                  type="button"
                  class="btn btn-success btn-sm"
                  style="padding: 0"
                  @click="addRow(columnConfig.name)"
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
</template>

<script setup lang="ts">
let props = defineProps({
  works: {
    type: Array<Work>,
    default: [],
  },
  selectedWork: {
    type: Object,
    default: {},
  },
  columnConfigs: {
    type: Array<ColumnConfig>,
    default: [],
  },
})

let currentWork = ref<Work>(JSON.parse(JSON.stringify(props.selectedWork)))

function saveWork() {
  for (let work of props.works) {
    if (work.id == currentWork.value.id) {
      Object.assign(work, currentWork.value)
    }
  }
}

function resetWork() {
  let rawWorks = toRaw(props.works)
  const targetedWork = rawWorks.find((w) => w.id == currentWork.value.id)

  currentWork.value = JSON.parse(JSON.stringify(targetedWork))
}

function addRow(rowName: string) {
  if (rowName == 'shift') {
    // create request to server, returns new WorkShift

    const newShift = {} as WorkShift
    newShift.id = 1 // data from server
    newShift.position = currentWork.value.shifts.length + 1

    currentWork.value.shifts.push(newShift)
  } else if (rowName == 'limits') {
    // create request to server, returns new WorkLimit

    const newLimit = {} as WorkLimit
    newLimit.id = 1 // data from server
    newLimit.position = currentWork.value.limits.length + 1

    currentWork.value.limits.push(newLimit)
  } else {
    // create request to server, returns new  WorkRow

    const newRow = {} as WorkRow
    newRow.id = 1 // data from server
    newRow.name = rowName
    newRow.position =
      currentWork.value.rows.filter((r: WorkRow) => r.name == rowName).length +
      1

    currentWork.value.rows.push(newRow)
  }
}

function setField(event: any, parent: any, field: string) {
  parent[field] = event.target.innerHTML
}

watch(
  () => props.selectedWork,
  (newValue, oldValue) => {
    currentWork.value = JSON.parse(JSON.stringify(props.selectedWork))
  }
)
</script>

<style lang="scss" scoped>
.work-modal-nav {
  padding: 10px;
  border-bottom: 1px solid var(--bs-modal-header-border-color);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
}
.work-modal-date {
  cursor: pointer;
  height: 38px;
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
</style>
