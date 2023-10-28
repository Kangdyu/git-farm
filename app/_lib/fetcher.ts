import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
