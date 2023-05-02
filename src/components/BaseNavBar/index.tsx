import {withRouter} from "react-router-dom";
import React, {useRef, useState} from "react";
import './index.less';
import router from "@/router";
import {Layout} from "antd";
import {RouteConfig} from "react-router-config";

class BaseNavBar extends React.Component<any> {
    state = {left: false, locked: false, onmused: -1}
    ref = React.createRef<HTMLDivElement>();
    resizeWindow = () => {
        if (!this.state.locked) {
            let width = document.body.clientWidth;
            if (width <= 1000) {
                if (!this.state.left) this.setState({left: true});
            } else {
                if (this.state.left) this.setState({left: false});
            }
        }
    }

    changeWindow(left = false) {
        let parent = window.document.querySelector<HTMLElement>(".ant-layout-sider")
        if (left) {
            if (parent) {
                parent.style.height = '';
                parent.style.flex = '';
                parent.style.maxWidth = '';
                parent.style.minWidth = '';
                parent.style.width = '50px';
                // parent.style.color = 'black';
                // parent.style.background = 'rgb(114,110,110)';
            }
        } else {
            if (parent) {
                parent.style.height = '100vh';
                parent.style.flex = '0 0 200px';
                parent.style.maxWidth = '200px';
                parent.style.minWidth = '200px';
                parent.style.width = '200px';
                // parent.style.color = 'black';
                // parent.style.background = 'rgb(114,110,110)';
            }
        }
    }

    componentDidMount() {
        // 在window对象中添加监听事件
        window.addEventListener('resize', this.resizeWindow);
        this.resizeWindow();
        // setTimeout(() => { console.log(this.state)},500)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow);
    }

    isSider(list: RouteConfig[], pathname: string) {
        for (const item of list) {
            if (`${item.path}`.indexOf(":")>-1){
                const start = `${item.path}`.split(':')[0];
                if (`${pathname}`.startsWith(start) && item.navbar) {
                    return true;
                }
            }else if (pathname === item.path && item.navbar) {
                return true;
            }

            if (item.routes && item.routes.length > 0) {
                if (this.isSider(item.routes, pathname)) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        // setTimeout(() => {console.log(this.ref.current)},500)
        const {history, location,} = this.props;
        // console.log(this.props);
        const {pathname} = location;
        if (pathname && this.isSider(router, pathname)) {
            const RenderLeft = ({list}: { list: RouteConfig[] }) => {
                    // console.log(location);
                    // console.log(match);
                    const ref = useRef<HTMLElement>();
                    const [onmused, setOnmused] = useState(-1);
                    if (this.state.left) {
                        return (<>
                            {
                                list.length > 0 && list.map((item, index) => {
                                    return (<div key={index}></div>);
                                })
                            }
                        </>);
                    }
                    return (<>
                        {
                            list.length > 0 && list.map((item, index) => {
                                if (!item.navbar||`${item.path}`.indexOf(":")>-1) return <div key={`${item.path}`}/>;
                                if (!item.navbar&&item.routes && item.routes.length > 0) {
                                    return (<RenderLeft list={item.routes}/>);
                                }
                                return (
                                    <div
                                        key={index}
                                        // path={`${item.path}`}
                                        className={'container'}
                                        // @ts-ignore
                                        ref={ref}
                                    >
                                        <div
                                            onClick={() => {
                                                if (!history) return;
                                                (history as any).push({pathname: item.path});
                                                if (ref.current) {
                                                    // @ts-ignore
                                                    // ref.current.children[1].className = 'children close';
                                                }
                                            }}
                                            onMouseOver={() => {
                                                setOnmused(index);
                                            }}
                                            onMouseOut={() => {
                                                setOnmused(-1);
                                            }}
                                            className={`father ${pathname === item.path ? 'active-color' : ''} ${onmused === index ? 'on-mused' : ''}`}>
                                            {/*{item.icon ? (<item.icon/>) : ((<MenuFoldOutlined/>))}*/}
                                            {item.title}
                                        </div>
                                        <div
                                            className={`children ${pathname.startsWith(`${item.path}`) ? 'open' : 'close'}`}>
                                            {/*className={`children ${pathname.indexOf(item.path) > -1 ? 'open' : 'close'}`}>*/}
                                            {
                                                item.routes && item.routes.length > 0 && (
                                                    <RenderLeft list={item.routes}/>)
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>);
                }
            ;
            return (
                <Layout.Sider
                    // trigger={(<MenuFoldOutlined />)}
                    // theme={'light'}
                    collapsible={true}
                    // collapsible={this.state.left}
                    collapsed={this.state.left}
                    // collapsedWidth={this.state.left?0:80}
                    collapsedWidth={0}
                    onCollapse={(e) => {
                        this.setState({locked: true, left: e,})
                    }}
                >
                    {this.state.left && (
                        <div className="navbar-icon">
                            TG
                        </div>
                    )}
                    {!this.state.left && (
                        <div className="navbar-icon">
                            TG营销管理后台
                        </div>
                    )}
                    <RenderLeft list={router}/>
                </Layout.Sider>
            );
        }
        return (<></>);
    }
}

export default withRouter(BaseNavBar);
