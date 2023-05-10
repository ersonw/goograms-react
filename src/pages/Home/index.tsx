import styles from "./index.module.less";
import React, {useState} from 'react';
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import qs from 'query-string';

const Home: React.FC=(props: any)=>{
    const [text,setText] = useState('');
    const {history} = props;
    const onSearch = ()=>{
        // @ts-ignore
        const searchString = qs.stringify({q: text,page: 1,cid: window.document.newWindowId()});
        history.push({pathname: "/search", search: searchString})
        history.go()
    }
    return (
        <div className={styles.home}>
            <div className={styles.logo}>
                <img src={'/goograms_logo.png'} className={styles.img} alt='logo'></img>
            </div>
            <Input
                className={styles.input_box}
                placeholder="输入你想搜索的内容"
                prefix={<SearchOutlined style={{marginLeft: '0.9vw'}} />}
                // showCount={true}
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                onKeyUp={(e)=> {
                    if(e.keyCode === 13) {
                        onSearch();
                    }
                }}
            />
        </div>
    );
};
export default Home;
