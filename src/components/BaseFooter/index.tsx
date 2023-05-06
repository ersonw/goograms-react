import {Link, withRouter} from "react-router-dom";
import './index.less';

const BaseFooter = (props: any)=>{
    return (<div className='footer'>
        <div className='leftfooter'>
            <Link to={"/about"}>关于 Goograms</Link>
            <Link to={"/about"}>广告</Link>
            <Link to={"/about"}>商务</Link>
            <a href='https://Goograms.com'>©2018-{new Date().getFullYear()} Goograms.com</a>
        </div>
        <div className='rightfooter'>
            <Link to={"/about"}>隐私</Link>
            <Link to={"/about"}>条款</Link>
        </div>
    </div>);
};
export default withRouter(BaseFooter);
