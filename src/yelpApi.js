import qs from 'qs'

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3'
const YELP_API_KEY = 'xvMotjgAKPUXnuH1G4a1V4XPT6d5ncVUKLhPaGp4LRTp_nLqAwatDOAEGBL4GrGRPTItj8TOKFuZYMa0de8HWdU9mphlOaDlHjVTvPTzLkXSlojTbUMHjHY6dthoXHYx'

export const searchBusinesses = async (searchStr, location) => {
  const params = qs.stringify({
    term: searchStr,
    latitude: location.lat,
    longitude: location.lng,
  })

  const headers = new Headers({
    'Authorization': `Bearer ${YELP_API_KEY}`,
  })
  const response = await fetch(`${BASE_URL}/businesses/search?${params}`, { headers })

  if (!response.ok) return []

  const results = await response.json()
  return results.businesses || []
}
