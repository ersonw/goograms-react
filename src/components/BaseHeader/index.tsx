import {withRouter} from "react-router-dom";
import {Input, Layout} from "antd";
import React, {useEffect, useState} from "react";
import router from "@/router";
import {RouteConfig} from "react-router-config";
// import Auth from "@/utils/auth";
import styles from "./index.module.less";
import {SearchOutlined} from "@ant-design/icons";
import qs from "query-string";

const BaseHeader = (props: any)=>{
    const title = document.title;
    const {history, location} = props;
    const [text,setText] = useState('');
    const {pathname,search} = location;
    const [hide,setHide] = useState(false);
    const [hideBar,setHideBar] = useState(false);
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
        // if (!Auth.get()&&pathname!=='/user/login'&&pathname!=='/user/forgot-password'){
        //     history.push('/user/login');
        // }else if (Auth.get()&&pathname==='/user/login'){
        //     if (last!==pathname){
        //         history.goBack();
        //     }else {
        //         history.push('/');
        //     }
        // }
        if (pathname!=='/search'){
            setHideBar(true);
        }else {
            setHideBar(false);
        }
    },[pathname,last,history])
    useEffect(() => {
        const query = qs.parse(search);
        const {q} = query;
        if (q!==undefined){
            setText(q as any);
            document.title = `${q} - ${title}`;
        }
    }, [search]);

    const onSearch = ()=>{
        const searchString = qs.stringify({q: text});
        history.push({pathname: "/search", search: searchString})
        history.go()
    }
    if (hide) return (<></>);
    return (
        <Layout.Header>
            <div className={styles.headerSection}>
                {!hideBar&&(
                    <div className={styles.searchBox}>
                        <a href='/' className={styles.logo}>
                            <img  src={'/goograms_logo.png'}  alt='logo'/>
                        </a>
                        <Input
                            className={styles.input_box}
                            placeholder="输入你想搜索的内容"
                            suffix={<SearchOutlined onClick={onSearch} style={{fontWeight: 'bold',color: '#4285f4',marginRight: '0.9vw'}} />}
                            // showCount={true}
                            value={text}
                            onChange={(e)=>{setText(e.target.value)}}
                            onKeyUp={(e)=> {
                                if(e.keyCode === 13) {
                                    onSearch()
                                }
                            }}
                        />
                    </div>
                )}
                <div className={styles.right}></div>
            </div>

        </Layout.Header>
    );
};
export default withRouter(BaseHeader);
