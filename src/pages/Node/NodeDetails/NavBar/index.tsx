import {Layout} from "antd";
import React, {useState} from "react";
import styles from "./index.module.less";

const NavBar = (props: any) => {
    const [collapsed,setCollapsed] = useState(false);
    return (
        <Layout.Sider
            collapsible={true}
            collapsed={collapsed}
            collapsedWidth={0}
            onCollapse={(e) => {
                setCollapsed(e);
            }}
            className={styles.NavBar}>
        </Layout.Sider>
    );
}
export default NavBar;
