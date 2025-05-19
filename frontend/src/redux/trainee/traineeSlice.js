import { createSlice } from "@reduxjs/toolkit";


const traineeInitialState={
    mail:null,
    mobileNumber:null,
    traineeName:null,
    status:false,
    message:null
}

const TraineeSlice=createSlice(
    {
        name:"trainee",
        initialState:traineeInitialState,
        reducers:{
            postedTrainee:(state,action)=>{
                console.log(action.payload)
                 state.mail=action.payload.trainee.mail,
                state.mobileNumber=action.payload.trainee.mobileNumber,
                state.traineeName=action.payload.trainee.traineeName,
                state.status=action.payload.status,
                 state.message=action.payload.message
            },
             postedTraineeFailed: (state, action) => {
      state.status = false;
      state.message = action.payload.message;
      state.userName = null;
      state.password = null;
    },
        }
    }
)
export const {postedTrainee,postedTraineeFailed} =  TraineeSlice.actions;
export default TraineeSlice.reducer;