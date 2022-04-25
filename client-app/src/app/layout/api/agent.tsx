import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../../..";
import { Activity } from "../models/activity";
import { Photo, Profile, UserActivity } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";


const sleep = (delay: number) =>{
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = "http://localhost:5000/api";


axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config;
})

axios.interceptors.response.use(async response => {
 
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
  const{data, status} = error.response!;
  switch(status){
    case 400:
      toast.error('bad request');
      break;
    case 401:
      toast.error('unauthorised')
      break;
    case 404:
      history.push('/not-found');
      break;
    case 500:
      toast.error('server errror')
      break;
  }
  return Promise.reject(error);
})

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

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user),
  verifyEmail: (token: string, email: string) => 
      requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
  resendEmailConfirm: (email: string) => 
      requests.get(`/account/resendEmailConfirmationLink?email=${email}`)
}

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
      let formData = new FormData();
      formData.append('File', file);
      return axios.post<Photo>('photos', formData, {
          headers: { 'Content-type': 'multipart/form-data' }
      })
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
  updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
      requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
      requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}


const agent = {
  Activities,
  Account,
  Profiles
}

export default agent;
