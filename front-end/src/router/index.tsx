import {createBrowserRouter} from "react-router-dom";
import Demo from "../page/demo";

const AppRouter = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Demo/>
            }
        ]
    }
])

export default AppRouter;