import qs from 'query-string';
import useFetchData from "@/utils/useFetchData";
import React, {useEffect} from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import styles from './index.module.less';
import Netfly from "@/components/Netfly";
import ResultItem, {ResultItemProps} from "@/components/Result/ResultItem";

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
    const results: ResultItemProps[] = [
        {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD+/v41NTUBAQEAAABZWVknJycWFhaZmZmIiIjp6ellZWXMzMzX19eurq54eHhHR0dExXFyAAAAAXRSTlMAQObYZgAAAPtJREFUeAG8kAWOBDAMA9d1Sin+/7XXbpZZdBaURlMrhx28ycGCD/n0bvkBwJf8C+AoIvRAWGtMyHGtCWkfxW+DRopuuIjUtTQJDStevNoXWaRjRSllLd1O8FFhgEZx2BmkAmHC8HwpOUyxSA50VqOjXgAl50URvNWPBRcAnmwnhbcduthqQCO9KYTFBG7eDWoK1T47AZX9DuiUYT/TuhX3MGpnD51kPprSA9Dl+BCKl7jWHHEHmHsLWhNZZMxPQCLTEuy+cYF6D9i8Q5e2Lcyz4AGwKdJbX0p7AegC2qnvxAsAxQRAYH8J6Dg1a/lvpKRJinMW4cxLMPsDAJjSCaG8cPmnAAAAAElFTkSuQmCC",
            url: 'https://t.me/CN_index/49?q=123',
            link: 'https://t.me/CN_index/49',
            title: '123 - 维基百科，自由的百科全书 - Wikipedia',
            content: '命名. 数字, 123. 名称, 123. 小写, 一百二十三. 大写, 壹佰贰拾参. 序数词（英语：Ordinal numeral）, 第一百二十三 one hundred and twenty-third.',
            children: [
                {
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD+/v41NTUBAQEAAABZWVknJycWFhaZmZmIiIjp6ellZWXMzMzX19eurq54eHhHR0dExXFyAAAAAXRSTlMAQObYZgAAAPtJREFUeAG8kAWOBDAMA9d1Sin+/7XXbpZZdBaURlMrhx28ycGCD/n0bvkBwJf8C+AoIvRAWGtMyHGtCWkfxW+DRopuuIjUtTQJDStevNoXWaRjRSllLd1O8FFhgEZx2BmkAmHC8HwpOUyxSA50VqOjXgAl50URvNWPBRcAnmwnhbcduthqQCO9KYTFBG7eDWoK1T47AZX9DuiUYT/TuhX3MGpnD51kPprSA9Dl+BCKl7jWHHEHmHsLWhNZZMxPQCLTEuy+cYF6D9i8Q5e2Lcyz4AGwKdJbX0p7AegC2qnvxAsAxQRAYH8J6Dg1a/lvpKRJinMW4cxLMPsDAJjSCaG8cPmnAAAAAElFTkSuQmCC",
                    url: 'https://netflycn.com/vod/detail/id/108479.html',
                    link: 'https://netflycn.com/vod/detail/id/108479.html',
                    title: '123 - 维基百科，自由的百科全书 - Wikipedia',
                    content: '命名. 数字, 123. 名称, 123. 小写, 一百二十三. 大写, 壹佰贰拾参. 序数词（英语：Ordinal numeral）, 第一百二十三 one hundred and twenty-third.',
                },
                {
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD+/v41NTUBAQEAAABZWVknJycWFhaZmZmIiIjp6ellZWXMzMzX19eurq54eHhHR0dExXFyAAAAAXRSTlMAQObYZgAAAPtJREFUeAG8kAWOBDAMA9d1Sin+/7XXbpZZdBaURlMrhx28ycGCD/n0bvkBwJf8C+AoIvRAWGtMyHGtCWkfxW+DRopuuIjUtTQJDStevNoXWaRjRSllLd1O8FFhgEZx2BmkAmHC8HwpOUyxSA50VqOjXgAl50URvNWPBRcAnmwnhbcduthqQCO9KYTFBG7eDWoK1T47AZX9DuiUYT/TuhX3MGpnD51kPprSA9Dl+BCKl7jWHHEHmHsLWhNZZMxPQCLTEuy+cYF6D9i8Q5e2Lcyz4AGwKdJbX0p7AegC2qnvxAsAxQRAYH8J6Dg1a/lvpKRJinMW4cxLMPsDAJjSCaG8cPmnAAAAAElFTkSuQmCC",
                    url: 'https://t.me/CN_index',
                    link: 'https://t.me/CN_index',
                    title: '123 - 维基百科，自由的百科全书 - Wikipedia',
                    content: '命名. 数字, 123. 名称, 123. 小写, 一百二十三. 大写, 壹佰贰拾参. 序数词（英语：Ordinal numeral）, 第一百二十三 one hundred and twenty-third.',
                },
                {
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD+/v41NTUBAQEAAABZWVknJycWFhaZmZmIiIjp6ellZWXMzMzX19eurq54eHhHR0dExXFyAAAAAXRSTlMAQObYZgAAAPtJREFUeAG8kAWOBDAMA9d1Sin+/7XXbpZZdBaURlMrhx28ycGCD/n0bvkBwJf8C+AoIvRAWGtMyHGtCWkfxW+DRopuuIjUtTQJDStevNoXWaRjRSllLd1O8FFhgEZx2BmkAmHC8HwpOUyxSA50VqOjXgAl50URvNWPBRcAnmwnhbcduthqQCO9KYTFBG7eDWoK1T47AZX9DuiUYT/TuhX3MGpnD51kPprSA9Dl+BCKl7jWHHEHmHsLWhNZZMxPQCLTEuy+cYF6D9i8Q5e2Lcyz4AGwKdJbX0p7AegC2qnvxAsAxQRAYH8J6Dg1a/lvpKRJinMW4cxLMPsDAJjSCaG8cPmnAAAAAElFTkSuQmCC",
                    url: 'https://t.me/CN_index',
                    link: 'https://t.me/CN_index',
                    title: '123 - 维基百科，自由的百科全书 - Wikipedia',
                    content: '命名. 数字, 123. 名称, 123. 小写, 一百二十三. 大写, 壹佰贰拾参. 序数词（英语：Ordinal numeral）, 第一百二十三 one hundred and twenty-third.',
                },
                {
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD+/v41NTUBAQEAAABZWVknJycWFhaZmZmIiIjp6ellZWXMzMzX19eurq54eHhHR0dExXFyAAAAAXRSTlMAQObYZgAAAPtJREFUeAG8kAWOBDAMA9d1Sin+/7XXbpZZdBaURlMrhx28ycGCD/n0bvkBwJf8C+AoIvRAWGtMyHGtCWkfxW+DRopuuIjUtTQJDStevNoXWaRjRSllLd1O8FFhgEZx2BmkAmHC8HwpOUyxSA50VqOjXgAl50URvNWPBRcAnmwnhbcduthqQCO9KYTFBG7eDWoK1T47AZX9DuiUYT/TuhX3MGpnD51kPprSA9Dl+BCKl7jWHHEHmHsLWhNZZMxPQCLTEuy+cYF6D9i8Q5e2Lcyz4AGwKdJbX0p7AegC2qnvxAsAxQRAYH8J6Dg1a/lvpKRJinMW4cxLMPsDAJjSCaG8cPmnAAAAAElFTkSuQmCC",
                    url: 'https://t.me/CN_index',
                    link: 'https://t.me/CN_index',
                    title: '123 - 维基百科，自由的百科全书 - Wikipedia',
                    content: '命名. 数字, 123. 名称, 123. 小写, 一百二十三. 大写, 壹佰贰拾参. 序数词（英语：Ordinal numeral）, 第一百二十三 one hundred and twenty-third.',
                },
            ],
        }
    ];
    // @ts-ignore
    // results[0].children.push(results[0]);
    return  (
        <div className={styles.search}>
            <div className={styles.left}>
                <Netfly query={q} />
                <ResultItem {...results[0]} />
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
                {/*<ResultItem />*/}
            </div>
            <div className={styles.right}></div>
        </div>
    )
}
export default Search;
