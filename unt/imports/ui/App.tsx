import React from 'react'
import {Navigate, useRoutes} from "react-router-dom";
import {ParentPage} from "./parent/ParentPage"
import {LoginForm} from "./LoginForm";
import {Header} from "./Header";
import {ProgresssPage} from "../ui/progresss/ProgresssPage";
import {SchoolchildPage} from "./schoolchilds/SchoolchildsPage";
import {InitialRoute} from "./authorization/InitialRoute";
import {IsAuthorization} from "./authorization/IsAuthorization";
import {Registration} from "./registration/Registration";


export const App: React.FC = () => {
    const element = useRoutes([
        {
            element: <InitialRoute />,
            children: [

                {
                    path: "/schoolchilds",
                    element: <SchoolchildPage />,
                },
                {
                    path: '/progresss',
                    element: <ProgresssPage />,
                },
                {
                    path: "/parent",
                    element: <ParentPage />
                },

            ],
        },
        {
            element: <IsAuthorization />,
            children: [
                { path: '/login', element: <LoginForm /> },
                {
                    path: "/register",
                    element: <Registration />,
                },

            ],
        },
        {
            element: <Navigate to={'/login'} />,
            path: '/',
        },

    ])
    return (
        <div>
            <Header/>
            {element}
        </div>

    )
}