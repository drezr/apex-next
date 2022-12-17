<template>
  <div>
    <div class="bar-frame">
      <div class="bar-content">
        <div>APEX</div>
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
const profileFetch: Profile = await $fetch('/api/common/getProfile')
const profile = useState<Profile>('profile', () => profileFetch)
</script>

<style scoped>
.bar-frame {
  padding: 5px;
  border-bottom: 1px black solid;
  font-weight: bold;
}
.bar-content {
  display: flex;
  justify-content: space-between;
}
</style>

<style>
[data-title]:hover:after {
  opacity: 1;
  transition: all 0.5s;
  visibility: visible;
}
[data-title]:after {
  content: attr(data-title);
  background-color: #2e2e2e;
  color: white;
  position: absolute;
  padding: 1px 5px;
  top: calc(-100% - 3px);
  right: -50%;
  white-space: nowrap;
  opacity: 0;
  border-radius: 3px;
  z-index: 99999;
  visibility: hidden;
}
[data-title] {
  position: relative;
}
</style>
