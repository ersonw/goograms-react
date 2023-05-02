import {withRouter} from "react-router-dom";

const BaseFooter = (props: any)=>{
    return <div>©2018-{new Date().getFullYear()} Telebott.com</div>;
};
export default withRouter(BaseFooter);
