import {Divider, Skeleton, Space} from "antd";
import {DotChartOutlined} from "@ant-design/icons";
import React from "react";
import styles from './index.module.less';
const Loading = ()=>{
    return (<div className={styles.loading}>
        <div>
            <Space>
                <Skeleton.Button active={true} size={'default'}   />
                <Skeleton.Avatar active={true} size={'default'}  />
                <Skeleton.Input active={true} size={'default'} />
            </Space>

            <br />
            <Skeleton.Button active={true} size={'default'}  />
            <br />
            <br />
            <Skeleton.Input active={true} size={'default'}  />
            <br />
            <br />
            <Space>
                <Skeleton.Image active={true} />
                <Skeleton.Node active={true}>
                    <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
                </Skeleton.Node>
            </Space>
            <Divider />
        </div>
        <div />
    </div>);
}
export default Loading;
