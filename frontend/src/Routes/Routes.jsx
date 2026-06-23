

    import LandingPage from "../pages/LandingPage/LandingPage";
    import Auth from "../pages/Auth/Auth";

    export const routes = [
    {
        path: "/",
        element: <LandingPage />,
    },

    {
        path: "/auth",
        element: <Auth />,
    },
    ];