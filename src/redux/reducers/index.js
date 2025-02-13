import { combineReducers } from 'redux'
import userReducer from './userReducer'
export * from './userReducer'
import loaddingReducer from './loaddingReducer'
export * from './loaddingReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    loadding: loaddingReducer,
})