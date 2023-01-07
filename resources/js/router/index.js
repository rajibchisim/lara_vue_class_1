// import sideNavBarpage from '../components/layouts/sideNavBar'
import userListPage from '../components/pages/userList';
import dashboardPage from '../components/dashboardPage';
// import baseLayouts from "../components/layouts/baseLayouts";
const routes = [
    {
        name : 'dashboard',
        path : '/admin/dashboard',
        component :dashboardPage
    },

    {
        name : 'users',
        path : '/admin/users',
        component :userListPage,
        meta : {dataUrl : 'api/users'}
    }

];

export default routes;
