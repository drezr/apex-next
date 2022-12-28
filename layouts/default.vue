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
const profileFetch: Profile = await _fetch('/api/common/getProfile')
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
