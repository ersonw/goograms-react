import styles from "@/pages/Node/NodeDetails/index.module.less";
import {Button, Input, Radio, Space, Spin} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";

const NodeLogger = (props: any) =>{
    const {match,history} = props;
    const {id} = match.params;
    const [filterLoading, setFilterLoading] = React.useState(false);
    const [filterPhone, setFilterPhone] = React.useState("");
    const filterPhoneNumbers = () =>{}
    return (
        <div>
            <div className={styles.topContainer}>
                <Space>
                    <Spin spinning={filterLoading}>
                        <Input
                            style={{
                                float: 'left',
                            }}

                            value={filterPhone}
                            onChange={(e)=>{
                                setFilterPhone(e.target.value);
                            }}
                            placeholder={"筛选手机号"}
                            allowClear={true}
                            onPressEnter={filterPhoneNumbers}
                            suffix={(
                                <SearchOutlined
                                    onClick={filterPhoneNumbers}
                                />
                            )}
                        />
                    </Spin>
                </Space>
            </div>
            {/*<Spin spinning={spinning}>*/}
            {/*    <CodeMirror*/}
            {/*        value={logCode}*/}
            {/*        theme={'dark'}*/}
            {/*        readOnly={true}*/}
            {/*        onChange={(editor, value) => {*/}
            {/*            console.log('controlled', { value });*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Spin>*/}
        </div>
    );
}
export default NodeLogger;
