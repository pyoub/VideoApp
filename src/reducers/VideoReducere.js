import * as Actions from '../actions/ActionsType'

const Videoreducers = (state = {data : {},err:undefined,loading:false,loadingMore:false,randomvideo:false}, action) => {
    switch (action.type) {
        case Actions.SERVICEPENDING:
            return Object.assign({}, state, {
                loading: true,
            });
        case Actions.RANDOM:
            return Object.assign({}, state, {
                randomvideo: true,
            });
        case Actions.SERVICEERREUR:
            return Object.assign({}, state, {
                loading: !state.loading,
               err: action.err,
               loadingMore: false,
               randomvideo: false,
            });
        case Actions.SERVICESUCSCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data,
                loadingMore: false,
                randomvideo: false,
            });
        case Actions.LOADINGMORE:
            return Object.assign({}, state, {
                loadingMore: true
            });    
        default:
            return state
    }
}

export default Videoreducers;