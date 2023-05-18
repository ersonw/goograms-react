import Home from "@/pages/Home";
import {RouteConfig} from "react-router-config";
import Login from "@/pages/User/Login";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/User/ForgotPassword";
import Info from "@/pages/User/Info";
import Search from "@/pages/Search";

const router: RouteConfig[] = [
    {
        path: "/",
        component: Home,
        title: "Goograms 搜索",
        exact: true,
        navbar: true,
    },
    {
        path: "/about",
        redirect: "https://t.me/YLLM8888",
        title: "关于 Goograms",
        exact: true,
        navbar: true,
    },
    {
        path: "/search",
        component: Search,
        title: "Goograms搜索",
        exact: true,
        navbar: true,
    },
    // {
    //     path: '/user',
    //     title: "用户管理",
    //     navbar: true,
    //     // component: User,
    //     redirect: "/user/info",
    //     routes: [
    //         {
    //             // path: "/user/login/:id",
    //             path: "/user/login",
    //             component: Login,
    //             title: "登录页面",
    //             hide: true,
    //             exact: true,
    //             // navbar: true,
    //         },
    //         {
    //             path: "/user/info",
    //             component: Info,
    //             title: "用户信息",
    //             exact: true,
    //             navbar: true,
    //         },
    //         {
    //             path: "/user/forgot-password",
    //             component: ForgotPassword,
    //             title: "忘记密码",
    //             // navbar: true,
    //         },
    //         {
    //             path: '*',
    //             title: '错误404',
    //             component: NotFound,
    //         }
    //     ]
    // },
    {
        path: '*',
        title: '错误404',
        redirect: "/",
    }
];
export default router;
