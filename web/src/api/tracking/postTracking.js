import axiosInstance from '../../config/axiosConfig';

const postTracking = (payload, id) => axiosInstance
  .post(`/users/${id}/tracking`, payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default postTracking;
