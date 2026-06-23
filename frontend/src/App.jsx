    import { useRoutes } from "react-router-dom";
    import "./index.css";
    import { routes } from "../src/Routes/Routes";

    function App() {
    const elements = useRoutes(routes);
    return elements;
    }

    export default App;