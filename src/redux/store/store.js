import { createStore, applyMiddleware } from 'redux'
import rootReducers from '../reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['ProfileReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk),
    window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
)
const persistor = persistStore(store)
export { store, persistor }
