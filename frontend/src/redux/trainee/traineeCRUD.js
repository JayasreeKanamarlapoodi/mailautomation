import axiosInstance from '../../axios';

export const postingTraineeDetails = (data) => {
  console.log("crud trainee data", data);
  const token = sessionStorage.getItem("jwtToken");
  console.log("token in trainee crud", token);

  return axiosInstance.post("api/trainees?key=plainmail", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
