import axiosClient from "../axios-client";

export const getResources = async () => {
    return await axiosClient.get('resources');
}