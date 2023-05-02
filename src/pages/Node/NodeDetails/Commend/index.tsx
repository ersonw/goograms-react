import {Button, Divider, Form, Input, Radio} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import Http from "@/utils/http";

const Commend = (props: {ids: any[];onFinished?: ()=>void | undefined})=>{
    let {ids,onFinished} = props;

    const [link,setLink] = useState("");
    const [loading,setLoading] = useState(false);
    const [bntType,setBntType] = useState('join');

    const onSubmit = useCallback(async ()=>{
        // console.log(type,link)
        if (bntType&&link){
            setLoading(true);
            await Http.put(`/admin/account/commend/${bntType}`,{link,ids}).catch(()=>{});
            setLoading(false);
            if (onFinished){
                onFinished();
            }
        }else{
            // @ts-ignore
            window.document.message.error("群邀请链接不允许为空!");
        }
    },[link,bntType,ids]);
    return (
        <Form>
            <Form.Item
                label={'执行命令'}
            >
                <Radio.Group value={bntType} onChange={(e) => setBntType(e.target.value)}>
                    <Radio.Button value="join">加入群组/频道</Radio.Button>
                    <Radio.Button value="listen">监听频道</Radio.Button>
                    <Radio.Button value="leave">离开群组/频道</Radio.Button>
                    <Radio.Button value="view">频道消息浏览</Radio.Button>
                    <Radio.Button value="like">频道消息点赞</Radio.Button>
                    <Radio.Button value="comment">频道消息评论</Radio.Button>
                    <Radio.Button value="newSession">生成新SESSION</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item
                wrapperCol={{ offset: 2, span: 16 }}>
                <Input value={link} onChange={(e)=>setLink(e.target.value)} placeholder={bntType==='newSession'?'接受验证码API':"群邀请链接"} allowClear={true} readOnly={loading} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" onClick={onSubmit} loading={loading}>
                    提交任务
                </Button>
            </Form.Item>
        </Form>
    );
}
export default Commend;
