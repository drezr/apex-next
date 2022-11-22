<template>
  <div>
    <div
      class="colorpicker-frame"
      :style="_color.pickBG(row.color)"
      @mouseover="isMouseOver = true"
    ></div>

    <div
      v-if="isMouseOver"
      class="colorpicker-picker"
      @mouseover="isMouseOver = true"
      @mouseleave="isMouseOver = false"
    >
      <div v-for="(key, color) in _color.colors">
        <div
          class="colorpicker-frame m-1"
          :class="row.color === color ? 'colorpicker-selected' : ''"
          :style="_color.pickBG(color)"
          @click=";(row.color = color), (isMouseOver = false)"
        ></div>
      </div>

      <div
        class="colorpicker-frame m-1"
        :class="row.color === null ? 'colorpicker-selected' : ''"
        :style="_color.pickBG(null)"
        @click=";(row.color = null), (isMouseOver = false)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  row: Object,
})

let isMouseOver = ref(false)
</script>

<style scoped>
.colorpicker-frame {
  position: relative;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px rgb(0, 0, 0) solid;
}
.colorpicker-picker {
  width: 142px;
  position: absolute;
  left: -105px;
  top: -45px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 3px 0;
  z-index: 2;
}
.colorpicker-selected {
  box-shadow: 0 0 0 3px;
}
</style>
