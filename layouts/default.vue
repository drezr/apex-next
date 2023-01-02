<template>
  <div>
    <div class="bar-frame">
      <div class="bar-content">
        <div>APEX</div>
        <button @click="createRoot()">CreateRoot</button>
        <button @click="createRandomWorks()">CreateRandomWorks</button>
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
const profileFetch: User = await _fetch('/api/common/getProfile')
const profile = useState<User>('profile', () => profileFetch)

async function createRoot() {
  await _fetch('api/radium/createRoot')
}

async function createRandomWorks() {
  await _fetch('api/radium/createRandomWorks')
}
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
