<template>
  <div>
    <div
      class="colorpicker-picker"
      :style="[
        _color.pickBG(parent.color),
        `border-color : ${_color.pick(parent.color, -3)}`,
      ]"
      @mouseover="isMouseOver = true"
    ></div>

    <div
      v-if="isMouseOver"
      class="colorpicker-frame"
      @mouseover="isMouseOver = true"
      @mouseleave="isMouseOver = false"
      :style="[`top: ${top}px`, `left: ${left}px`]"
    >
      <div v-for="(key, color) in _color.colors">
        <div
          class="colorpicker-picker m-1"
          :class="parent.color === color ? 'colorpicker-selected' : ''"
          :style="[
            _color.pickBG(color),
            `border-color : ${_color.pick(color, -3)}`,
          ]"
          @click=";(parent.color = color), (isMouseOver = false)"
        ></div>
      </div>

      <div
        class="colorpicker-picker m-1"
        :class="parent.color === null ? 'colorpicker-selected' : ''"
        :style="_color.pickBG(null)"
        @click=";(parent.color = null), (isMouseOver = false)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  parent: {
    type: Object,
    default: {},
  },
  top: {
    type: Number,
    default: 0,
  },
  left: {
    type: Number,
    default: 0,
  },
})

let isMouseOver = ref(false)
</script>

<style scoped>
.colorpicker-frame {
  width: 142px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 3px 0;
  z-index: 2;
}
.colorpicker-picker {
  position: relative;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid;
  transition: border 0.05s, filter 0.5s;
}
.colorpicker-picker:hover {
  border: 3px solid;
  filter: brightness(1.3);
}
.colorpicker-selected {
  border: 3px solid;
}
</style>
