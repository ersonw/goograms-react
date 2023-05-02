import useFetchData from "@/utils/useFetchData";
import {Button, Divider, Radio, Result, Space, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import React, {useCallback, useEffect, useState} from "react";
import {Key} from "antd/lib/table/interface";
import moment from 'moment';
import {Link} from "react-router-dom";
import {ChangeSize} from "@/utils/ChangeSize";
moment.locale('zh-cn');
interface DataType {
    key: React.Key;
    id: string;
    name: string;
    hostname: string;
    accounts: any[];
    ip: string;
    mac: string;
    addTime: number;
    updateTime: number;
}
const columns: ColumnsType<DataType> = [
    {
        title: '节点名称',
        dataIndex: 'name',
        width: 200,
        fixed: 'left',
        render: (text: string,record: any, index: number) => {
            return (
                <Link to={`/node/details/${record.id}`} >{text}</Link>
                /* eslint-disable */
                // <a onClick={()=>{
                //     // @ts-ignore
                //     window.document.newWindow(`/node/details/${record.id}`)
                // }}>{text}</a>
            );
        },
    },
    {
        title: '运行主机名',
        dataIndex: 'hostname',
        width: 200,
        fixed: 'left',
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
        title: '在线账号数量',
        dataIndex: 'accounts',
        width: 200,
        render: (text: any,) => (<a>{text.length}</a>),
    },
    {
        title: '节点IP',
        dataIndex: 'ip',
        width: 200,
    },
    {
        title: '节点MAC',
        dataIndex: 'mac',
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
    {
        title: '操作',
        dataIndex: 'updateTime',
        width: 180,
        render: (text: any, record: any, index: Number) => {
            return (<Link to={`/node/logger/${record.id}`} >查看日志</Link>);
        },
    },
];
const NodeList=(props: any)=>{

    const [selected,setSelected] = useState<Key[]>([]);
    const [current,setCurrent] = useState(1);
    const [pageSize,setPageSize] = useState(20);
    const [listData,setListData] = useState<any[]>([]);
    const [listTotal,setListTotal] = useState(0);
    const size = ChangeSize();

    const {history} = props;
    const [selectionType,setSelectionType] = useState("online");
    const sizeChange = (current: number, size?: number) =>{
        setCurrent(current);
        if (size) setPageSize(size);
    }
    const getUrl = ()=>{
        return '/admin/getNodeList';
    }
    const {data,loading, onReload, error, } = useFetchData(getUrl(),{list:[]},{
        page: current,
        limit: pageSize,
    });
    useEffect(() => {
        if (data){
            const {list,total} = data;
            setListData(list);
            setListTotal(total);
        }
    },[data]);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelected(selectedRowKeys);
        },
        // getCheckboxProps: (record: DataType) => ({
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const onRefresh = useCallback(async ()=>{
        await onReload(getUrl(),{
            page: current,
            limit: pageSize,
        });
    },[current,pageSize,getUrl]);
    if (error){
        return (
            <Result
                status="warning"
                title="获取服务器数据错误，请联系管理员"
                extra={
                    <Button
                        type="primary"
                        key="console"
                        onClick={()=>{
                            history.push(`/`);
                        }}
                    >
                        返回首页
                    </Button>
                }
            />
        );
    }
    const {list} = data;
    return (
        <div style={{padding: '20px'}}>
            <Divider />
            <div>
                <Radio.Group
                    style={{
                        float: 'left',
                    }}
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                    <Radio value="online">在线列表</Radio>
                    <Radio value="all">所有列表</Radio>
                </Radio.Group>
                <Space>
                    <Button
                        danger={true}
                        onClick={onRefresh}
                    >
                        刷新列表
                    </Button>
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
                columns={columns}
                dataSource={listData}
                pagination={{
                    hideOnSinglePage: true,
                    current: current,
                    total: listTotal,
                    pageSize: pageSize,
                    onChange: sizeChange,
                }}
            />
        </div>
    );
}
export default NodeList;
