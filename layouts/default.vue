<template>
  <div>
    <div class="bar-frame">
      <div class="bar-content">
        <div>BAR</div>
        <div>
          {{ profile.name }}
        </div>
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const profile: Profile = await useProfile().value
</script>

<style scoped>
.bar-frame {
  padding: 5px;
  border-bottom: 1px black solid;
}
.bar-content {
  display: flex;
  justify-content: space-between;
}
</style>
