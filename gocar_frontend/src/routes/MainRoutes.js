import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
import CarListContainer from '../CarList/CarsListContainer'
import CarProfileContainer from "../CarProfile/CarProfileContainer";
import AddCarContainer from "../AddCar/AddCarContainer";
import LandingPage from "../LandingPage/LandingPage";
import RentAppContainer from "../Rent List/RentCarListContainer";
import RentCarProfileContainer from "../RentCarProfile/RentCarProfileContainer";

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'rent-cars',
            element: <RentAppContainer />
        },
        {
            path: 'add-car',
            element: <AddCarContainer />
        },
        {
            path: 'car-profile/:carId',
            element: <CarProfileContainer />
        },
        {
            path: 'admin-car-profile/:carId',
            element: <RentCarProfileContainer />
        },
        {
            path: 'cars-list',
            element: <CarListContainer />
        },
        {
          path: 'rent-app',
            element: <RentAppContainer />
        },
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
