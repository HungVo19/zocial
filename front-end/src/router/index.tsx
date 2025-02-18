import {createBrowserRouter} from "react-router-dom";
import Demo from "../page/demo";
import CreateAccount from "../page/create-account";
import Header from "../components/Header";
import UpdateAccount from "../page/edit-account";

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Header />,
        children: [
            {
                index: true,
                element: <Demo/>
            },
            {
                path:'/create-account',
                index: true,
                element: <CreateAccount/>
            },
            {
                path:'/update-account',
                index: true,
                element: <UpdateAccount/>
            }
        ]
    }
])

export default AppRouter;