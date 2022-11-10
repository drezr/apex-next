const getProfile = async () => {
  return await $fetch('/api/common/getProfile')
}

const profile: Profile = await getProfile()

export const useProfile = () => {
  return useState<Profile>('profile', () => profile)
}
