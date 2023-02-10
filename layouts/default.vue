<template>
  <div>
    <div class="bar-frame">
      <div class="bar-content">
        <div>
          <div>
            <span>
              <NuxtLink to="/">APEX</NuxtLink>
            </span>

            <span v-if="route.path.includes('hub') || route.params.appId">
              >
              <NuxtLink :to="hubLink">HUB</NuxtLink>
            </span>

            <span v-if="route.params.appId">
              >
              <NuxtLink :to="getAppLink()">APP</NuxtLink>
            </span>
          </div>
        </div>

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
const route = useRoute()

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
    isAdmin: true,
    teams: [],
    attendings: [],
  }
}

const loggedUser = useState<User>('loggedUser', () => loggedUserFetch)

const hubLink = `/circle/${route.params.circleId}/team/hub/${route.params.teamId}`

async function createRoot() {
  await _fetch('/api/helpers/createRoot')
}

function getAppLink() {
  return ''
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
