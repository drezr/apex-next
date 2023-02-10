<template>
  <div>
    <div class="mx-auto my-4 border" style="width: 400px">
      <div>
        <h5>{{ _local(['home', 'myTeams']) }}</h5>
      </div>

      <div v-for="userTeam in userTeams">
        <NuxtLink :to="`/circle/${userTeam.circle.id}/team/hub/${userTeam.id}`">
          {{ userTeam.name }}
        </NuxtLink>
      </div>
    </div>

    <div class="mx-auto my-4 border" style="width: 400px">
      <div>
        <h5>{{ _local(['home', 'myCircles']) }}</h5>
      </div>

      <div v-for="userCircle in userCircles">
        <b>{{ userCircle.name }}</b>

        <div v-for="team in userCircle.teams">
          <NuxtLink :to="`/circle/${userCircle.id}/team/hub/${team.id}`">
            {{ team.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataFetch = await _fetch('/api/home/getCircles')

const userCircles = dataFetch.loggedUserCircles
const userTeams = dataFetch.loggedUserTeams
</script>

<style lang="scss" scoped></style>
