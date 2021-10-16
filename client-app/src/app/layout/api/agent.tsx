import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";


axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = function <T>(response: AxiosResponse<T>) {
  return response.data;
};

const requests = {
  get: function <T>(url: string) {
    return axios.get<T>(url).then(responseBody);
  },
  post: function <T>(url: string, body: {}) {
    return axios.post<T>(url, body).then(responseBody);
  },
  put: function <T>(url: string, body: {}) {
    return axios.put<T>(url, body).then(responseBody);
  },
  del: function <T>(url: string) {
    return axios.delete<T>(url).then(responseBody);
  },
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};


const agent = {
  Activities,
};

export default agent;
