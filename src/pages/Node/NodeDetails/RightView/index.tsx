import {Button, Divider, Drawer, Form, Input, Modal, Space, Spin, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import React, {useCallback, useEffect, useState} from "react";
import Http from "@/utils/http";
import auth from "@/utils/auth";
import AccountLogger from "@/pages/Node/NodeDetails/AccountLogger";
import Commend from "@/pages/Node/NodeDetails/Commend";
const RightView = (props:{onData: (data: any)=>void;onClose: ()=>void;selectionType: string;nodeId:string;data:any;show: boolean;})=>{
    const {onData,onClose,selectionType,nodeId,data,show}= props;
    const [showLog,setShowLog] = useState(false);
    const [spinDetail,setSpinDetail] = useState(false);
    const [showRight,setShowRight] = useState(false);
    const [rightData,setRightData] = useState<any>({});
    const [fileList,setFileList] = useState<any[]>([]);
    const [verifyCode,setVerifyCode] = useState('');
    const [verifyShow,setVerifyShow] = useState(false);
    const [verifyPassword,setVerifyPassword]  = useState('');
    const [passwordShow,setPasswordShow] = useState(false);

    useEffect(()=>{
        setShowRight(show);
        if(data){
            setRightData(data);
            if (show&&data.status === 131){
                if (!verifyShow)setVerifyShow(true);
            }else if (show&&data.status === 132){
                if (!verifyShow)setPasswordShow(true);
            }
        }
    },[data,show,verifyShow]);
    const onRightClose = () =>{
        setShowRight(false);
        setFileList([]);
        setRightData({});
        onClose();
    }
    const onVerifyCodeSubmit = useCallback(async ()=>{
        setSpinDetail(true);
        await Http.put("/admin/account/code",{ id: rightData.id, verifyCode}).catch(()=>{});
        setSpinDetail(false);
        setVerifyShow(false);
        setVerifyCode("");
        onClose();
    },[rightData,verifyCode,onClose]);
    const onVerifyPasswordSubmit = useCallback(async ()=>{
        setSpinDetail(true);
        await Http.put("/admin/account/password",{ id: rightData.id, verifyPassword}).catch(()=>{});
        setSpinDetail(false);
        setPasswordShow(false);
        setVerifyPassword("");
        onClose();
    },[rightData,verifyPassword,onClose]);
    const onRightSubmit = async() =>{
        const data = await Http.post("/admin/account/save",{id: nodeId,data: JSON.stringify(rightData)});
        if (data){
            await setRightData(data);
            onData(data);
        }
    }
    const sendOnlineCommand = async()=>{
        setSpinDetail(true);
        await Http.put("/admin/account/online",{node: nodeId, id: rightData.id}).catch(()=>{});
        setSpinDetail(false);
    }
    const sendOfflineCommand = async()=>{
        setSpinDetail(true);
        await Http.put("/admin/account/offline",{ id: rightData.id}).catch(()=>{});
        setSpinDetail(false);
        setShowRight(false);
    }
    return (
        <>
            <Drawer
                destroyOnClose={true}
                title="账号详情"
                placement={"right"}
                width={500}
                onClose={onRightClose}
                open={showRight}
                extra={
                    <Space>
                        {
                            rightData.id&&(
                                <Button onClick={()=>setShowLog(true)}>查看日志</Button>
                            )
                        }
                        <Button
                            type="primary"
                            danger={true}
                            onClick={()=>{
                            rightData.phone&&setRightData({phone: parseInt(rightData.phone)+1});
                        }}>
                            添加
                        </Button>
                        <Button type="primary" onClick={onRightSubmit}>
                            应用
                        </Button>
                    </Space>
                }
            >
                <AccountLogger {...rightData} show={showLog} onClose={()=>setShowLog(false)}/>
                <Modal
                    title={`客户端正在等待验证码，是否已收到?`}
                    open={verifyShow}
                    destroyOnClose={false}
                    onOk={onVerifyCodeSubmit}
                    onCancel={()=>{
                        setVerifyShow(false);
                    }}
                    okText={'提交'}
                    cancelText={'取消'}
                    // confirmLoading={this.state.showModalLoading}
                    maskClosable={false}
                    style={{
                        // minWidth: '720px',
                        // minHeight: '300px',
                        // maxWidth: '100vw',
                        // maxHeight: '100vh',
                    }}
                >
                    <Form>
                        <Form.Item>
                            <Input value={verifyCode} onChange={(e)=>setVerifyCode(e.target.value)} placeholder={'请输入登录验证码'} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title={`客户端正在等待二次认证，是否已收到?`}
                    open={passwordShow}
                    destroyOnClose={false}
                    onOk={onVerifyPasswordSubmit}
                    onCancel={()=>{
                        setPasswordShow(false);
                    }}
                    okText={'提交'}
                    cancelText={'取消'}
                    // confirmLoading={this.state.showModalLoading}
                    maskClosable={false}
                    style={{
                        // minWidth: '720px',
                        // minHeight: '300px',
                        // maxWidth: '100vw',
                        // maxHeight: '100vh',
                    }}
                >
                    <Form>
                        <Form.Item>
                            <Input value={verifyPassword} onChange={(e)=>setVerifyPassword(e.target.value)} placeholder={'请输入登录二次认证码'} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Spin spinning={spinDetail}>
                    <Form>
                        <Form.Item
                            label={'绑定手机号'}
                            rules={[{ required: true, message: '手机号不能为空!' }]}
                        >
                            <Input
                                value={rightData.phone}
                                onChange={(e)=>{
                                    setRightData({...rightData,phone:e.target.value});
                                }}
                                readOnly={rightData.session!==undefined} />
                        </Form.Item>
                        <Form.Item
                            label={'二次认证密码'}
                        >
                            <Input
                                value={rightData.password}
                                onChange={(e)=>{
                                    setRightData({...rightData,password:e.target.value});
                                }}/>
                        </Form.Item>
                        <Form.Item
                            label={'Session文件'}
                        >
                            <Upload
                                action={'/admin/batch/upload'}
                                headers={{'X-Token': auth.get()||''}}
                                onChange={({file, fileList})=>{
                                    // console.log(file,fileList);
                                    const index = fileList.findIndex(v=>v.uid===file.uid);
                                    if (file.status==='removed'){
                                        if (index>-1){
                                            const list = [...fileList];
                                            list.splice(index,1);
                                            setFileList(list);
                                        }else {
                                            setRightData({...rightData,sessionFile: undefined});
                                        }
                                    }
                                    if (index < 0) return;
                                    if (file.status === 'uploading') setFileList(fileList);
                                    if (file.status==='error'){
                                        // @ts-ignore
                                        window.document.message.error(file.response);
                                    }
                                    if (file.status === 'done') {
                                        const {response} = file;
                                        const {code,data,msg} = response;
                                        if (msg){
                                            if (code===0){
                                                // @ts-ignore
                                                window.document.message.success(msg);
                                            }else{
                                                // @ts-ignore
                                                window.document.message.error(msg);
                                            }
                                        }
                                        if (code===0){
                                            const {list} = data;
                                            if (list&&list.length>0){
                                                setRightData({...rightData,sessionFile: list[0]});
                                                // setFileList([{...fileList[index],url: list[0],}]);
                                                setFileList([]);
                                                return;
                                            }
                                        }
                                        setFileList([{...fileList[index],status: 'error',}]);
                                    }
                                }}
                                fileList={[...fileList,{
                                    uid: "",
                                    name: rightData.sessionFile,
                                    status: 'done',
                                    url: rightData.sessionFile,
                                }]}
                            >
                                <Button icon={<UploadOutlined />}>选择文件</Button>
                            </Upload>

                        </Form.Item>

                        <Form.Item
                            label={'Session字符串'}
                        >
                            <TextArea
                                value={rightData.session}
                                rows={10}
                                cols={30}
                                onChange={(e)=>{
                                    setRightData({...rightData,session:e.target.value});
                                }}
                            />
                        </Form.Item>
                        {
                            rightData.id&&(
                                <>
                                    <Form.Item
                                        label={'切换状态'}
                                    >
                                        {selectionType==='all' &&(
                                            <Button type="primary" onClick={sendOnlineCommand}>上线账号</Button>
                                        )}
                                        {selectionType==='online' &&(
                                            <Button type="primary" onClick={sendOfflineCommand}>下线账号</Button>
                                        )}
                                    </Form.Item>
                                </>
                            )
                        }
                    </Form>
                    <Divider />
                    {
                        selectionType==='online'&&rightData.id&&(
                            <Commend ids={[rightData.id]}/>
                        )
                    }
                </Spin>
            </Drawer>
        </>
    );
}
export default RightView;
