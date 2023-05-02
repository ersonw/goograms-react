import {Button, Result} from "antd";

const NotFound = (props: any) =>{
    const {location,history} = props;
    return (
        <Result
            status="404"
            title={`404-错误URL： ${location.pathname}`}
            subTitle="对不起，您访问的页面暂未开发!"
            extra={<Button
                type="primary"
                onClick={() => history.push("/")}
            >回到首页</Button>}
        />
    );
}
export default NotFound;
