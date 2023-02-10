<template>
  <div>
    <div class="text-center my-4">
      <h5>{{ team.name }}</h5>
    </div>

    <div class="mx-auto my-4 text-center" style="width: 400px">
      <div v-for="app in team.apps">
        <NuxtLink :to="getLink(team, app)">{{
          _local(['common', app.name])
        }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const teamId = Number(route.params.teamId)

const dataFetch = await _fetch('/api/team/getTeam', {
  teamId: teamId,
})

const team = dataFetch.team

function getLink(team: Team, app: App) {
  let link = `/circle/${team.circle.id}/team/${team.id}/${app.name}/${app.id}/`

  if (app.name == 'radium') {
    let date = new Date()

    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      .toLocaleDateString()
      .replaceAll('/', '-')
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toLocaleDateString()
      .replaceAll('/', '-')

    link = link + 'works/' + firstDay + ':' + lastDay
  }

  return link
}
</script>

<style lang="scss" scoped></style>
