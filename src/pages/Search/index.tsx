import qs from 'query-string';
import useFetchData from "@/utils/useFetchData";
import React, {useEffect} from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import styles from './index.module.less';
import Netfly from "@/components/Netfly";
import {Divider, Layout} from "antd";
import ResultItem from "@/components/Result/ResultItem";
import BaseFooter from "@/components/BaseFooter";

const Search = (props: any) => {
    // console.log(props)
    const {location} = props;
    let {search} = location;
    const query = qs.parse(search);
    const {q} = query;
    const {error, loading, data } = useFetchData('/complete/search',{},{q});
    useEffect(() => {
        return () => {

        };
    }, [data]);
    if(loading){
        return (<Loading />);
    }
    if (error){
        return <Error />
    }
    return  (
        <div className={styles.search}>
            <div className={styles.left}>
                <Netfly query={q} />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />
            </div>
            <div className={styles.right}></div>
        </div>
    )
}
export default Search;
