import {withRouter} from "react-router-dom";
import {Layout} from "antd";
import React, {useEffect, useState} from "react";
import router from "@/router";
import {RouteConfig} from "react-router-config";
import Auth from "@/utils/auth";

const BaseHeader = (props: any)=>{
    const {history, location} = props;
    const {pathname} = location;
    const [hide,setHide] = useState(false);
    const [last,setLast] = useState("/");
    useEffect(()=>{
        const findPath = (list: RouteConfig[]) =>{
            for (const route of list) {
                if (route.path === pathname && route.hide) setHide(true);
                if (route.routes){
                    findPath(route.routes);
                }
            }
        }
        if (last!==pathname) setLast(pathname);
        findPath(router);
        if (!Auth.get()&&pathname!=='/user/login'&&pathname!=='/user/forgot-password'){
            history.push('/user/login');
        }else if (Auth.get()&&pathname==='/user/login'){
            if (last!==pathname){
                history.goBack();
            }else {
                history.push('/');
            }
        }
    },[pathname,last,history,])
    if (hide) return (<></>);
    return (
        <Layout.Header><div>BaseHeader</div></Layout.Header>
    );
};
export default withRouter(BaseHeader);
