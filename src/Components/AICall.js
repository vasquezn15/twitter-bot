import axios from "axios";

function axiosRequest(userId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/twitter/bots?user_id=${userId}`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export async function sendToPython(userId) {
  // if array is null return array cannot be null error
  if (!userId) {
    throw new Error("User ID cannot be empty");
  }
  // else
  // send axios request to endpoint
  var response = await axiosRequest(userId);
  // return a promise of key value pairs in a json format
  return response;
}
