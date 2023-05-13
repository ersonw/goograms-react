import qs from 'query-string';
import useFetchData from "@/utils/useFetchData";
import React, {useEffect,} from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import styles from './index.module.less';
import Netfly from "@/components/Netfly";
import ResultItem from "@/components/Result/ResultItem";
import {Pagination, PaginationProps} from "antd";

const Search = (props: any) => {
    const {location, history} = props;
    let {search} = location;
    const query = qs.parse(search);
    const {q, page, cid } = query;
    const {error, loading, data } = useFetchData('/complete/search',{},{q, page,cid});
    useEffect(() => {
        if (q===undefined||q===''){
            history.push({pathname: "/", })
            history.go()
        }else{
            if (page===undefined || cid === undefined || page==='' || cid === ''){
                // @ts-ignore
                let searchString = qs.stringify({q: q,page,cid: window.document.newWindowId()});
                if (page===undefined || page===''){
                    // @ts-ignore
                    searchString = qs.stringify({q: q,page: 1,cid: window.document.newWindowId()});
                }
                history.push({pathname: "/search", search: searchString})
                history.go()
            }
        }
        return () => {
        };
    }, [q,page,cid,history]);
    if(loading){
        return (<Loading />);
    }
    if (error){
        return <Error />
    }
    const {results, total} = data;
    const onChange: PaginationProps['onChange'] = (page) => {
        // @ts-ignore
        const searchString = qs.stringify({q: q,page,cid: window.document.newWindowId()});
        history.push({pathname: "/search", search: searchString})
        history.go()
    };

    return  (
        <div className={styles.search}>
            <div className={styles.left}>
                {/*<div className={styles.tips}>*/}
                {/*    <span>*/}
                {/*        找到约 {total} 条结果 （用时 0.59 秒）*/}
                {/*    </span>*/}
                {/*</div>*/}
                {page==='1'&&(
                    <Netfly query={q} />
                )}
                {results&&results.map((value: any, index :number) =>{
                    return (<ResultItem key={index} {...value} query={`${q}`} />);
                })}
                <div className={styles.page}>
                    <div className={styles.logo}>
                        <img src={'/goograms_logo.png'} alt={'logo'}/>
                    </div>
                    <Pagination
                        defaultCurrent={parseInt(`${page}`)}
                        onChange={onChange}
                        // current={parseInt(`${page}`)}
                        // hideOnSinglePage={true}
                        pageSize={10}
                        showSizeChanger={false}
                        total={total>2100?2100:total} />
                </div>
            </div>
            <div className={styles.right}>
            </div>
        </div>
    )
}
export default Search;
