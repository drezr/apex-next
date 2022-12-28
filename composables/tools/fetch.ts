export const useFetchWrapper = async (url: string) => {
  /**
   * Wrapper of useFetch().
   * Return base item without having to go for .data.value and receive a Proxy of that item.
   *
   * @param {string} url url to fetch
   *
   */

  let fetchedItem = await useFetch(url)

  return JSON.parse(JSON.stringify(fetchedItem.data.value))
}
