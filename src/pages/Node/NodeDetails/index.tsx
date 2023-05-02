import {Button, Divider, Input, Modal, Radio, Result, Space, Spin, Table,} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import styles from "./index.module.less";
import useFetchData from "@/utils/useFetchData";
import moment from 'moment';
import {ColumnsType} from "antd/lib/table";
import {Key} from "antd/lib/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import RightView from "@/pages/Node/NodeDetails/RightView";
import Http from "@/utils/http";
import Commend from "@/pages/Node/NodeDetails/Commend";
import {ChangeSize} from "@/utils/ChangeSize";


moment.locale('zh-cn');

const NodeDetails = (props: any) =>{
    const {match,history} = props;
    const {id} = match.params;
    const [selected,setSelected] = useState<Key[]>([]);
    const [current,setCurrent] = useState(1);
    const [pageSize,setPageSize] = useState(500);
    const [selectionType,setSelectionType] = useState("online");

    const [showRight,setShowRight] = useState(false);
    const [rightData,setRightData] = useState<any>({});

    const [filterPhone,setFilterPhone] = useState("");
    const [filterLoading,setFilterLoading] = useState(false);

    const [listData,setListData] = useState<any[]>([]);
    const [listTotal,setListTotal] = useState(0);

    const [commandShow,setCommandShow] = useState(false);
    const rowSelection = {
        selectedRowKeys: selected,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelected(selectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
            disabled: selectionType==='all'? (record.status !== 0 /*&& record.status !== 91*/):false, // Column configuration not to be checked
            name: record.firstName,
        }),
    };
    const size = ChangeSize();
    const getStatus = (text: number) => {
        switch (text) {
            case 0:
                return "待命";
            case 90:
                return "请求上线";
            case 91:
                return "发送在线数据包";
            case 92:
                return "已完成上线";
            case 100:
                return "正在执行加入群组任务";
            case 101:
                return "正在执行监听群组任务";
            case 102:
                return "正在执行离开群组任务";
            case 103:
                return "正在执行检查群组任务";
            case 104:
                return "正在执行群组自动聊天任务";
            case 105:
                return "正在执行移除监听群组任务";
            case 110:
                return "正在执行频道点赞任务";
            case 111:
                return "正在执行频道浏览任务";
            case 112:
                return "正在执行频道评论任务";
            case 120:
                return "正在记录日志";
            case 121:
                return "程序奔溃";
            case 130:
                return "正在执行登录程序";
            case 131:
                return "正在等待登录验证码";
            case 132:
                return "正在等待登录二次验证";
            default:
                return text;
        }
    };
    const columns: ColumnsType<any> = [
        {
            title: '手机号',
            dataIndex: 'phone',
            width: 200,
            fixed: 'left',
            render: (text: string,record: any, index: number) => {
                return (
                    /* eslint-disable */
                    <a onClick={()=>{
                        setRightData({...record});
                        setShowRight(true);
                    }}>{text}</a>
                );
            },
        },
        {
            title: '性',
            dataIndex: 'lastName',
            width: 100,
            fixed: 'left',
        },
        {
            title: '名',
            dataIndex: 'firstName',
            width: 100,
            fixed: 'left',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            fixed: 'left',
            render: (text: any,) => getStatus(text),
        },
        {
            title: '在线时长',
            dataIndex: 'execution',
            width: 200,
            render: (text: any,) => {
                const t = new Date();
                t.setMonth(1,1);
                t.setHours(0, 0, 0, 0);
                return `${t.getMonth()-1}月${t.getDate()-1}天${moment(t).add(text, 'millisecond').format('HH小时mm分ss秒')}`;
            },
        },
        {
            title: '二次认证',
            dataIndex: 'password',
            width: 200,
        },
        {
            title: '代理IP',
            dataIndex: 'proxy',
            width: 200,
        },
        {
            title: '使用者',
            dataIndex: 'user',
            width: 200,
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            width: 180,
            render: (text: any, record: any, index: Number) => {
                if (text > 0) return moment(text).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: 180,
            render: (text: any, record: any, index: Number) => {
                if (text > 0) return moment(text).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    ];
    const sizeChange = (current: number, size?: number) =>{
        setCurrent(current);
        if (size) setPageSize(size);
    }
    const filterPhoneNumbers = async ()=>{
        setFilterLoading(true);
        if (selectionType==='all'){
            await onReload(getUrl(),{limit: pageSize,id,page: 1, search: filterPhone});
        }else{
            const list = [...listData];
            const result = list.filter((l: any) => l.phone.indexOf(filterPhone) > -1);
            setListData([...result]);
            // console.log(list);
        }
        setFilterLoading(false);
    }
    const getUrl = ()=>{
        return `/admin/getAccounts/${selectionType}`;
    }
    const {data,loading, onReload, error, } = useFetchData(getUrl(),{list:[]},{
        id,
        page: current,
        limit: pageSize,
    });
    const onRefresh = useCallback(async ()=>{
        // setFilterPhone("");
        await onReload(getUrl(),{
            id,
            page: current,
            limit: pageSize,
            search: filterPhone,
        });
    },[id,current,pageSize,getUrl]);
    const sendNewSession = useCallback(async ()=>{
        await Http.put("/admin/accounts/newSession",{node: id, ids: selected});
        setSelected([]);
    },[id,selected]);
    const senOnline = useCallback(async ()=>{
        await Http.put("/admin/accounts/online",{node: id, ids: selected});
        setSelected([]);
    },[id,selected]);
    const senOffline = useCallback(async()=>{
        await Http.put("/admin/accounts/offline",{ids: selected});
        setSelected([]);
        await onReload(getUrl());
    },[selected]);
    const sendJoinCommand = useCallback(async()=>{
    },[selected]);
    const deleteAll = useCallback(async()=>{
        await Http.patch("/admin/accounts/delete",{ids: selected});
        setSelected([]);
        await onReload(getUrl());
    },[selected]);
    const onAddAccountClick = useCallback(async()=>{},[]);
    useEffect(() => {
        if (id&&!loading) onReload(getUrl(),{
            id,
            page: current,
            limit: pageSize,
        }).then(() => {});
    }, [id,current,pageSize]);
    useEffect(() => {
        if (data){
            const {list,total} = data;
            setListData(list);
            setListTotal(total);
        }
    },[data]);

    if (error){
        return (
            <Result
                status="warning"
                title="获取服务器数据错误，请返回上一页"
                extra={
                    <Button
                        type="primary"
                        key="console"
                        onClick={()=>{
                            history.push(`/node/list`);
                        }}
                    >
                        返回上一页
                    </Button>
                }
            />
        );
    }

    return (
        <div className={styles.NodeDetails}>
            <Modal
                title={`所选项目批量提交任务`}
                open={commandShow}
                destroyOnClose={false}
                onOk={()=>setCommandShow(false)}
                onCancel={()=>{
                    setCommandShow(false);
                }}
                okText={'确定'}
                cancelText={'取消'}
                maskClosable={false}
            >
                <Commend ids={selected} onFinished={()=>{
                    setCommandShow(false);
                    setSelected([]);
                }}/>
            </Modal>
            <RightView
                selectionType={selectionType}
                nodeId={id}
                data={rightData}
                onData={(e)=> {
                    setRightData(e);
                    const list = [...listData];
                    const index = list.findIndex((v: any)=>v.id===rightData.id);
                    if (index>-1){
                        list.splice(index,1,e);
                        setListData([...list]);
                    }
                }}
                onClose={()=>setShowRight(false)}
                show={showRight}
             />
            <Divider />
            <div className={styles.topContainer}>
                <Radio.Group
                    style={{
                        float: 'left',
                    }}
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}>
                    <Radio value="online">在线列表</Radio>
                    <Radio value="all">所有列表</Radio>
                </Radio.Group>
                <Space>
                    {
                        selectionType==='online'&&selected.length>0&&(
                            <>
                                <Button
                                    type="primary"
                                    danger={true}
                                    onClick={senOffline}
                                >
                                    批量下线({selected.length})
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={()=>setCommandShow(true)}
                                >
                                    批量命令({selected.length})
                                </Button>
                                {/*<Button*/}
                                {/*    type="primary"*/}
                                {/*    danger={true}*/}
                                {/*    onClick={()=>sendNewSession}*/}
                                {/*>*/}
                                {/*    批量生成新session({selected.length})*/}
                                {/*</Button>*/}
                            </>
                        )
                    }
                    {
                        selectionType==='all'&&selected.length>0&&(
                            <>
                                <Button
                                    type="primary"
                                    danger={true}
                                    onClick={deleteAll}
                                >
                                    批量删除({selected.length})
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={senOnline}
                                >
                                    批量上线({selected.length})
                                </Button>
                            </>
                        )
                    }
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
                    <Button
                        type="primary"
                        onClick={()=>{
                            setShowRight(true);
                            rightData.phone && setRightData({phone: `${rightData.phone}`}) ;
                        }}
                    >
                         添加账号
                    </Button>
                    <Button
                        danger={true}
                        onClick={onRefresh}
                    >
                         刷新列表
                    </Button>
                    <div>总计{listTotal}个账号</div>
                    {/*<Button*/}
                    {/*    type="primary"*/}
                    {/*    onClick={()=>{*/}
                    {/*        setShowRight(true);*/}
                    {/*        setRightData({});*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    批量添加*/}
                    {/*</Button>*/}
                </Space>
            </div>
            <Divider />
            <Table
                loading={loading}
                rowKey={'id'}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                scroll={{  y: size.height - 410}}
                // style={{
                //     maxWidth: size.width - 300,
                // }}
                columns={columns}
                dataSource={listData}
                pagination={{
                    // hideOnSinglePage: true,
                    current: current,
                    total: listTotal,
                    pageSize: pageSize,
                    pageSizeOptions: [10,50,100,500,1000,2000,3000],
                    onChange: sizeChange,
                }}
            />
        </div>
    );
}
export default NodeDetails;
