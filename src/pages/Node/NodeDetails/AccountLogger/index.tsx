/* eslint-disable */
import {Button, Drawer, Space, Spin} from "antd";
import CodeMirror from "@uiw/react-codemirror";
import React, {useCallback, useEffect, useState} from "react";
import Http from "@/utils/http";
export const AccountLogger = (props: { id: any; show: any; onClose: any;}) => {
    const {id,show,onClose} = props;

    const [logCode,setLogCode] = useState("");
    const [spinning,setSpinning] = useState(true);
    const [showLogger,setShowLogger] = useState(false);

    const [intVal, setIntVal] = useState<any>();
    useEffect(()=>{
        setShowLogger(show);
        // if (show){
        //     onShowLog();
        // }else{
        //     onLogClose();
        // }
    },[show,id]);
    const onCallback = useCallback(async ()=>{
        if (!show) onLogClose();
        await onRefresh({id, spin: spinning});
    },[id,spinning,show,]);
    const onRefresh = async ({id,spin}: any) => {
        if (window.document.hidden)return;
        const d = await Http.get('/admin/getAccount/log', {id}).catch(() => {
        });
        if (spin) setSpinning(false);
        if (d) {
            const {text} = (d as any);
            setLogCode(text);
        }
    };
    const onShowLog = ()=>{
        setIntVal(setInterval(onCallback, 1000 * 10));
        // @ts-ignore
        window.document.message.success("开始自动刷新");
    }
    const onStopAuto =()=>{
        clearInterval(intVal);
        setIntVal(null);
        // @ts-ignore
        window.document.message.info("停止自动刷新成功");
    }
    const onLogClose = ()=>{
        setShowLogger(false);
        if (onClose) onClose();
    }
    return (
        <Drawer
            title="执行日志"
            placement={"bottom"}
            height={'80%'}
            onClose={onLogClose}
            destroyOnClose={true}
            open={showLogger}
            extra={(
                <Space>
                    <Button type="primary" onClick={()=>onRefresh({id,spin:spinning})}>刷新</Button>
                    {
                        intVal?(
                            <Button onClick={onStopAuto}>停止自动刷新</Button>
                        ):(
                            <Button type="primary" onClick={onShowLog}>开启自动刷新</Button>
                        )
                    }
                </Space>
            )}
        >
            <Spin spinning={spinning}>
                <CodeMirror
                    value={logCode}
                    theme={'dark'}
                    readOnly={true}
                    onChange={(editor, value) => {
                        console.log('controlled', { value });
                    }}
                />
            </Spin>
        </Drawer>
    );
}
export default AccountLogger;
