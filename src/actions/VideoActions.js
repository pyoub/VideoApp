import { SERVICEERREUR, SERVICEPENDING, SERVICESUCSCESS, LOADINGMORE, RANDOM } from './ActionsType'
import axios from 'axios'

export const CallApi = () => {
  return dispatch => {
    dispatch(ServicePending())
    axios.get('https://api.dailymotion.com/videos?fields=id,thumbnail_url,views_total,&search=twerk&shorter_than=6&sort=random&verified=1&limit=10')
      .then(result => {
        dispatch(ServiceSucces(result.data))
      }).catch(err => {
      dispatch(ServiceErreur(err))
    })
  }
}
export const ServicePending = () => ({
  type: SERVICEPENDING
})

export const ServiceErreur = (err) => ({
  type: SERVICEERREUR,
  err: err
})

export const ServiceSucces = (data) => ({
  type: SERVICESUCSCESS,
  data: data
})

export const ServiceLoadingMore = () => ({
  type: LOADINGMORE
})
export const ServiceRandom = () => ({
  type: RANDOM
})
export const MoreVideos = (page) => {
  return dispatch => {
    dispatch(ServiceLoadingMore())
    axios.get('https://api.dailymotion.com/videos?fields=id,thumbnail_url,views_total,&search=hot+twerk&shorter_than=6&sort=random&verified=1&page=' + page + '&limit=8')
      .then(result => {
        console.log('ccccc', result.data.list, page)
        dispatch(ServiceSucces(result.data))
      }).catch(err => {
      console.log('rrrr', err)
      dispatch(ServiceErreur(err))
    })
  }
}

export const RandomVideos = () => {
  return dispatch => {
    dispatch(ServiceRandom())
    axios.get('https://api.dailymotion.com/videos?fields=id,&search=hot+twerk&sort=random&limit=1')
      .then(result => {
        dispatch(ServiceSucces(result.data))
      }).catch(err => {
      dispatch(ServiceErreur(err))
    })
  }
}
