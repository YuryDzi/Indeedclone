import axiosInstance from '../../config/axiosConfig';

const getUserTracking = (userId) => axiosInstance
  .get(`/users/${userId}/tracking`)
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default getUserTracking;
