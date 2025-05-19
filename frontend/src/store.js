import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from './redux/admin/adminSlice'
import TraineeSlice from "./redux/trainee/traineeSlice";

const store=configureStore({
    reducer:{
    admin:AdminSlice,
    trainee:TraineeSlice
    }
})

export default store;