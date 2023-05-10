import React, {useEffect} from 'react';
import '@/App.less';
// import BaseNavBar from "@/components/BaseNavBar";
import {Provider} from "react-redux";
import store from './store';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import router from "@/router";
import {Layout, notification,message} from "antd";
import BaseHeader from "@/components/BaseHeader";
import BaseFooter from "@/components/BaseFooter";
import type {NotificationPlacement} from 'antd/es/notification/interface';
import {Md5} from 'ts-md5';

const Context = React.createContext({ name: 'Default' });
const RouteComment = (props: any) =>{
    const {match,history,route} = props;
    document.title = route.title;
    useEffect(()=>{
        if(match.isExact&&route.redirect){
            history.push({pathname: route.redirect});
        }
    },[match,history,route.redirect]);

    return (<>
        {(match.isExact)&&(route.component?(<route.component {...props} />):(<></>))}
        <Switch>
            {route.routes!==undefined && route.routes.map((item: any, i: number)=>{
                const ite = {...item, title: `${item.title||''}-${route.title||''}`,};
                return (<RouteWithSubRoutes key={`${ite.path}-${i}`} {...ite} />);
            })}
        </Switch>
    </>)
}
const RouteWithSubRoutes = (route: any)=> {
    return (
        <Route
            path={route.path}
            render={(props: any)=>(<RouteComment {...props} route={route} />)}
        />
    );
}
const App = () => {
    const [messageApi,contextHolderMessage] = message.useMessage();
    const [api,contextHolder] = notification.useNotification();
    const notify = ({placement,title,context}:{
        placement: NotificationPlacement | undefined,
        title: string | undefined,
        context: string | undefined,}) => {
        api.info({
            message: title||'',
            description: <Context.Consumer>{() => context||''}</Context.Consumer>,
            placement: placement || 'topRight',
        });
    }
    // @ts-ignore
    window.document.notify = notify;
        // @ts-ignore
    window.document.message = messageApi;
    // @ts-ignore
    window.document.newWindow = (url: string)=>{
        window.open(url,'_blank','width=600,height=400,menubar=no,toolbar=no,status=no,scrollbars=yes')
        // window.open(url,'_blank','menubar=no,toolbar=no,status=no,scrollbars=yes')
    };
    // @ts-ignore
    window.document.newWindowId = ()=>{
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height=200;
        const ctx = canvas.getContext('2d')!;
        var txt = "Goograms,com <canvas> 1.0";
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        const dataURL = canvas.toDataURL();
        return (Md5.hashStr(dataURL));
    };

    return (
        <Provider store={store}>
            <Router>
                <Layout style={{width: '100vw',}}>
                    {contextHolder}
                    {contextHolderMessage}
                    {/*<BaseNavBar />*/}
                    <Layout>
                        <BaseHeader />
                        <Layout.Content>
                            <Switch>
                                {router.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer>
                            <BaseFooter />
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </Router>
        </Provider>

    );
};

export default App;
