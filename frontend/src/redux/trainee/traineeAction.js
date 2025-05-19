import * as RequestFromServer from './traineeCRUD'
import { postedTrainee, postedTraineeFailed } from './traineeSlice';

export const postingTraineeDetails = (data) => async (dispatch) => {
    console.log("action trainee data", data);

    try {
        const response = await RequestFromServer.postingTraineeDetails(data);
        console.log("Server Response:", response);

        const status = response.status === 200;
        const payload = {
            trainee: response.data?.trainee || null,
            status: status,
            message: response.data?.message || ""
        };

        console.log("Dispatching postedTrainee with payload", payload);
        dispatch(postedTrainee(payload));
    } catch (err) {
        console.error("Error in postingTraineeDetails:", err);
        dispatch(
            postedTraineeFailed({
                status: err.response?.status || 500,
                message: err.response?.data?.message || "Something went wrong",
            })
        );
    }
};
