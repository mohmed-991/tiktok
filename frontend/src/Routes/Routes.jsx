

    import LandingPage from "../pages/LandingPage/LandingPage";
    import Auth from "../pages/Auth/Auth";
    import DriverDashboard from "../pages/DashboardPage/DriverDashboard";
    import CustomerDashboard from "../pages/DashboardPage/CustomerDashboard";

    export const routes = [
    {
        path: "/",
        element: <LandingPage />,
    },

    {
        path: "/auth",
        element: <Auth />,
    },

    {
        path: "/driver",
        element: <DriverDashboard />,
    },

    {
        path: "/customer",
        element: <CustomerDashboard />,
    },
    ];