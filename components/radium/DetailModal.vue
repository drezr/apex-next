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
              <span class="work-modal-work-color">
                {{ _local(['radium', 'detailModal', 'workColor']) }}
              </span>

              <ColorPicker
                v-if="currentWork"
                :parent="currentWork"
                class="mx-2"
                :top="-10"
                :left="-105"
                style="position: relative; top: 3px"
              />
            </div>

            <div v-for="columnConfig in columnConfigs" class="mb-5">
              <div class="d-flex align-items-center">
                <button
                  type="button"
                  class="btn btn-success btn-sm mx-2 work-modal-add-row"
                  @click="addRow(columnConfig.name)"
                >
                  <span
                    v-html="_icon('plus', 'white', 20)"
                    style="position: relative; top: -3px"
                  ></span>
                </button>

                <span
                  v-html="_icon('stickies', _color.pick('grey'), 23)"
                  class="work-modal-paste"
                  style="position: relative; top: -4px"
                  :class="false ? '' : 'work-modal-paste-disabled'"
                ></span>

                <label
                  class="form-label"
                  style="font-weight: bold; font-size: 18px"
                >
                  {{ _local(['radium', 'columnTitle', columnConfig.name]) }}
                </label>
              </div>

              <div v-if="columnConfig.name == 'shift'">
                <div
                  class="work-column-subtitles-frame"
                  v-if="currentWork.shifts.length > 0"
                >
                  <div
                    v-for="subColumn in columnConfig.subColumns"
                    class="work-modal-subtitle"
                    :style="`width: ${subColumn.width}%;`"
                  >
                    {{ _local(['radium', 'columnTitle', subColumn.name]) }}
                  </div>
                </div>

                <div
                  v-for="shift in currentWork.shifts"
                  class="d-flex mb-2"
                  style="align-items: center"
                >
                  <span
                    v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                    class="work-modal-drag"
                  ></span>

                  <input
                    class="form-control text-center"
                    :value="_date.getWeek(shift.date)"
                    disabled
                  />

                  <Datepicker
                    v-model="shift.date"
                    auto-apply
                    :locale="chosenLanguage"
                    :clearable="false"
                    model-type="yyyy-MM-dd"
                    week-numbers
                    week-num-name=""
                    :enable-time-picker="false"
                    style="width: 100%; margin-right: 8px"
                  >
                    <template #trigger>
                      <div
                        class="form-control mx-1 work-modal-date text-center"
                      >
                        {{ _date.formatDatetimeDayNameNoYear(shift.date) }}
                      </div>
                    </template>
                  </Datepicker>

                  <div
                    class="form-control text-center"
                    contenteditable="true"
                    v-html="shift.schedule"
                    @blur="setField($event, shift, 'schedule')"
                  ></div>

                  <ColorPicker
                    :parent="shift"
                    class="mx-2"
                    :top="-45"
                    :left="-60"
                    style="position: relative; top: 2px"
                  />

                  <span
                    v-html="_icon('clipboard', _color.pick('indigo'), 20)"
                    class="work-modal-command-button work-modal-copy"
                  ></span>

                  <span
                    v-html="_icon('trash', _color.pick('red'), 20)"
                    class="work-modal-command-button work-modal-copy"
                    @click="deleteRow(shift, 'shift')"
                  ></span>
                </div>
              </div>

              <div v-if="columnConfig.name == 'limit'">
                <div
                  class="work-column-subtitles-frame"
                  v-if="currentWork.limits.length > 0"
                >
                  <div
                    v-for="subColumn in columnConfig.subColumns.slice(0, 5)"
                    class="work-modal-subtitle"
                    :style="`width: ${subColumn.width * 2}%;`"
                  >
                    {{ _local(['radium', 'columnTitle', subColumn.name]) }}
                  </div>
                </div>

                <div
                  v-for="(limit, i) in currentWork.limits"
                  class="d-flex"
                  style="align-items: center"
                  :style="
                    i != currentWork.limits.length - 1
                      ? 'border-bottom: 1px grey dashed; margin-bottom: 8px; padding-bottom: 4px;'
                      : ''
                  "
                >
                  <span
                    v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                    class="work-modal-drag"
                  ></span>

                  <div class="flex-grow-1">
                    <div class="d-flex">
                      <div
                        v-for="(subColumn, i) in columnConfig.subColumns.slice(
                          0,
                          5
                        )"
                        class="mb-1"
                        :style="`width: ${subColumn.width * 2}%;`"
                        :class="i < 4 ? 'me-1' : ''"
                      >
                        <div
                          class="form-control p-1 text-center"
                          style="font-size: 13px"
                          contenteditable="true"
                          v-html="limit[subColumn.name as keyof WorkLimit]"
                          @blur="setField($event, limit, subColumn.name)"
                        ></div>
                      </div>
                    </div>

                    <div class="d-flex">
                      <div
                        v-for="(subColumn, i) in columnConfig.subColumns.slice(
                          5,
                          10
                        )"
                        class="mb-1"
                        :style="`width: ${subColumn.width * 2}%;`"
                        :class="i < 4 ? 'me-1' : ''"
                      >
                        <div
                          class="form-control p-1 text-center"
                          style="font-size: 13px"
                          contenteditable="true"
                          v-html="limit[subColumn.name as keyof WorkLimit]"
                          @blur="setField($event, limit, subColumn.name)"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex" style="position: relative; top: -2px">
                    <ColorPicker
                      :parent="limit"
                      class="mx-2"
                      :top="-45"
                      :left="-60"
                      style="position: relative; top: 2px"
                    />

                    <span
                      v-html="_icon('clipboard', _color.pick('indigo'), 20)"
                      class="work-modal-command-button work-modal-copy"
                    ></span>

                    <span
                      v-html="_icon('trash', _color.pick('red'), 20)"
                      class="work-modal-command-button work-modal-copy"
                      @click="deleteRow(limit, 'limit')"
                    ></span>
                  </div>
                </div>
              </div>

              <div v-else>
                <div
                  v-for="row in currentWork.rows.filter(
                    (row: WorkRow) => row.name === columnConfig.name
                  )"
                  class="d-flex mb-2"
                  style="align-items: center"
                >
                  <span
                    v-html="_icon('arrows-expand', _color.pick('pink'), 25)"
                    class="work-modal-drag"
                  ></span>

                  <Tiptap v-model="row.value" class="flex-grow-1" />

                  <ColorPicker
                    :parent="row"
                    class="mx-2"
                    :top="-45"
                    :left="-60"
                    style="position: relative; top: 2px"
                  />

                  <span
                    v-html="_icon('clipboard', _color.pick('indigo'), 20)"
                    class="work-modal-command-button work-modal-copy"
                  ></span>

                  <span
                    v-html="_icon('trash', _color.pick('red'), 20)"
                    class="work-modal-command-button work-modal-copy"
                    @click="deleteRow(row, 'row')"
                  ></span>
                </div>
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
            <div v-for="shift in currentWork.shifts">
              <div class="d-flex flex-wrap">
                <div v-for="part in shift.parts" class="work-modal-part-frame">
                  <div class="work-modal-part-team-name">
                    {{ part.team.name }}
                  </div>

                  <div
                    v-for="participant in part.participants"
                    class="work-modal-part-profile"
                  >
                    <span
                      class="work-modal-part-available"
                      :class="
                        participant.partParticipant.isAvailable
                          ? 'work-modal-part-available-true'
                          : 'work-modal-part-available-false'
                      "
                    ></span>

                    <div>
                      {{ participant.profile.name }}

                      <span
                        v-if="participant.profile.role"
                        class="work-modal-part-profile-role"
                      >
                        {{ participant.profile.role }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

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

const profile: Profile = useState<Profile>('profile').value
const chosenLanguage: string = profile.chosenLanguage

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
    const newShift = {} as WorkShift

    newShift.position = currentWork.value.shifts.length + 1

    currentWork.value.shifts.push(newShift)
  } else if (rowName == 'limit') {
    const newLimit = {} as WorkLimit

    newLimit.position = currentWork.value.limits.length + 1

    currentWork.value.limits.push(newLimit)
  } else {
    const newRow = {} as WorkRow

    newRow.name = rowName
    newRow.position =
      currentWork.value.rows.filter((r: WorkRow) => r.name == rowName).length +
      1

    currentWork.value.rows.push(newRow)
  }
}

function deleteRow(row: WorkRow | WorkShift | WorkLimit, type: string) {
  if (type == 'row') {
    currentWork.value.rows = currentWork.value.rows.filter((r) => r != row)
  } else if (type == 'shift') {
    currentWork.value.shifts = currentWork.value.shifts.filter((r) => r != row)
  } else if (type == 'limit') {
    currentWork.value.limits = currentWork.value.limits.filter((r) => r != row)
  }
}

function setField(event: any, parent: any, field: string) {
  parent[field] = event.target.innerHTML
}

watch(
  () => props.selectedWork,
  () => {
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

.work-modal-work-color {
  font-weight: bold;
  position: relative;
  left: -5px;
}

.work-modal-add-row {
  --bs-btn-padding-y: 0.1rem;
  --bs-btn-padding-x: 0.3rem;
  height: 25px;
  position: relative;
  top: -3px;
}
.work-modal-date {
  cursor: pointer;
  height: 38px;
}
.work-modal-date:hover {
  background-color: rgb(250, 250, 250);
}
.work-modal-drag {
  margin-right: 10px;
  cursor: grab;
}
.work-modal-drag:active {
  cursor: grabbing;
}

.work-modal-command-button {
  transition: filter 0.3s;
}

.work-modal-command-button:hover {
  filter: brightness(2);
}
.work-modal-delete {
  cursor: pointer;
}
.work-modal-copy {
  cursor: pointer;
  margin-right: 4px;
}
.work-modal-paste {
  cursor: pointer;
  margin-right: 10px;
}
.work-modal-paste-disabled {
  cursor: default;
}
.modal-header {
  padding: 5px 5px 5px 15px;
}
.work-modal-nav {
  padding: 5px;
}

.work-column-subtitles-frame {
  margin-left: 35px;
  margin-right: 80px;
  display: flex;
}
.work-modal-subtitle {
  font-size: 10px;
  font-weight: bold;
  text-align: center;
}

.work-modal-part-frame {
  padding: 5px;
  margin: 5px;
  border: 1px rgb(202, 202, 202) solid;
  border-radius: 3px;
  box-shadow: 1px 2px 10px rgb(214, 214, 214);
  width: calc(50% - 10px);
}

.work-modal-part-team-name {
  font-weight: bold;
  font-size: 20px;
  margin-left: 5px;
  margin-bottom: 10px;
}

.work-modal-part-profile {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.work-modal-part-available {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin: 0 10px 0 5px;
}

.work-modal-part-available-true {
  background-color: rgb(24, 185, 21);
}

.work-modal-part-available-false {
  background-color: rgb(255, 3, 3);
}

.work-modal-part-profile-role {
  font-size: 11px;
  display: inline-block;
  color: white;
  background-color: rgb(134, 134, 134);
  margin-left: 5px;
  padding: 0 7px;
  border-radius: 10px;
  position: relative;
  top: -1px;
}
</style>
