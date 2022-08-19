import { configureStore } from '@reduxjs/toolkit'
import { addtionalInformationFileApi } from './apis/additionalInformationFileApi';
import { fileApi } from './apis/fileApi';

export const store = configureStore({
    reducer: {
        [fileApi.reducerPath]: fileApi.reducer,
        [addtionalInformationFileApi.reducerPath]: addtionalInformationFileApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(fileApi.middleware)
        .concat(addtionalInformationFileApi.middleware)
});
