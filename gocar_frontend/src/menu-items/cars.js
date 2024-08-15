// assets
import { CarOutlined } from '@ant-design/icons';

// icons
const icons = {
    CarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const cars = {
    id: 'group-cars',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Cars',
            type: 'item',
            url: '/cars-list',
            icon: icons.CarOutlined,
            breadcrumbs: false
        }
    ]
};

export default cars;
