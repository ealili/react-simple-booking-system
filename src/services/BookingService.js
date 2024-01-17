import axiosClient from "../axios-client";

export const getBookings = async () => {
    return await axiosClient.get('bookings');
}

export const createBooking = async (payload) => {
    return await axiosClient.post('bookings', payload);
}