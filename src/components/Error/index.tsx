import {Button, Result} from "antd";

const Error = ()=> {
    return (
        <Result
            status="404"
            title={`404-服务器未知错误`}
            subTitle="服务器未知错误!"
            extra={<a href={'/'}>回到首页</a>}
        />
    );
}
export default Error;
