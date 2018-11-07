export const getWeather = state => (state && state.weather
  && state.weather.data && state.weather.data.channel) || {}

export const isLoading = state => (state && state.weather
  && state.weather.isFetching) || false
