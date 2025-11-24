import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Fetch all bookings for a client
export const getClientBookings = (clientId) => API.get(`/bookings/client/${clientId}`);

// Create Stripe checkout session
export const createCheckoutSession = (bookingId) => API.post("/payment/session", { bookingId });


export default API;
