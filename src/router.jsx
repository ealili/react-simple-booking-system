import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "./App";
import ListResources from "./pages/ListResources";
import ListBookings from "./pages/ListBookings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Navigate to={"/resources"}/>,
            },
            {
                path: "/resources",
                element: <ListResources />,
            },
            {
                path: "/bookings",
                element: <ListBookings />,
            },
        ]
    }
])

export default router;
