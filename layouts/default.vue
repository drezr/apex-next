<template>
  <div>
    <div class="bar-frame">
      <div class="bar-content">
        <div>APEX</div>
        <button @click="createRoot()">CreateRoot</button>
        <div>
          {{ loggedUser.name }}
        </div>
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
let loggedUserFetch: User = await _fetch('/api/common/getLoggedUser')

// Used for developement - To be removed
if (!loggedUserFetch) {
  loggedUserFetch = {
    id: 1,
    username: 'ABC123',
    email: 'admin.user@infrabel.be',
    name: 'Admin User',
    role: 'Role',
    rank: 'Rank',
    chosenLanguage: 'fr',
    teams: [],
    attendings: [],
  }
}

const loggedUser = useState<User>('loggedUser', () => loggedUserFetch)

async function createRoot() {
  await _fetch('/api/helpers/createRoot')
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
