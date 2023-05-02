import Home from "@/pages/Home";
import {RouteConfig} from "react-router-config";
import Login from "@/pages/User/Login";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/User/ForgotPassword";
import Info from "@/pages/User/Info";
import NodeList from "@/pages/Node/NodeList";
import NodeDetails from "@/pages/Node/NodeDetails";
import NodeLogger from "@/pages/Node/NodeLogger";

const router: RouteConfig[] = [
    {
        path: "/",
        component: Home,
        title: "Home",
        exact: true,
        navbar: true,
    },
    {
        path: '/node',
        title: "节点管理",
        navbar: true,
        redirect: "/node/list",
        routes: [
            {
                path: "/node/list",
                component: NodeList,
                title: "节点列表",
                exact: true,
                navbar: true,
            },
            {
                path: "/node/details/:id",
                component: NodeDetails,
                title: "节点详情",
                exact: true,
                navbar: true,
            },
            {
                path: "/node/logger/:id",
                component: NodeLogger,
                title: "节点日志",
                exact: true,
                navbar: true,
            },
            {
                path: '*',
                title: '错误404',
                component: NotFound,
            }
        ],
    },
    {
        path: '/user',
        title: "用户管理",
        navbar: true,
        // component: User,
        redirect: "/user/info",
        routes: [
            {
                // path: "/user/login/:id",
                path: "/user/login",
                component: Login,
                title: "登录页面",
                hide: true,
                exact: true,
                // navbar: true,
            },
            {
                path: "/user/info",
                component: Info,
                title: "用户信息",
                exact: true,
                navbar: true,
            },
            {
                path: "/user/forgot-password",
                component: ForgotPassword,
                title: "忘记密码",
                // navbar: true,
            },
            {
                path: '*',
                title: '错误404',
                component: NotFound,
            }
        ]
    },
    {
        path: '*',
        title: '错误404',
        component: NotFound,
    }
];
export default router;
