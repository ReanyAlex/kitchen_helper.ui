import axios from "axios";

export const kitchenHelper = axios.create({
  baseURL: "https://localhost:5001/api",
});

export function getAsync(route, cancelToken) {
  return kitchenHelper.get(route, {
    params: { PageSize: 100 },
    cancelToken,
  });
}

export function postAsync(route, body, cancelToken) {
  return kitchenHelper.post(route, body, {
    cancelToken,
  });
}
