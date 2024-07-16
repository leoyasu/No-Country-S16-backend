import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import appearanceReducer from './slice/appearanceSlice'
import userReducer from './slice/userSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users' , 'appearance']
};


const rootReducer = combineReducers({
    user: userReducer,
    appearance: appearanceReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store con middleware para ignorar las acciones no serializables
const storeRedux = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas acciones no serializables
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Crear el persistor
const persistor = persistStore(storeRedux);

export { storeRedux, persistor };

