import useFetchData from "@/utils/useFetchData";
import React, {useEffect, useState} from "react";
import Loading from "@/components/Loading";
import styles from './index.module.less';
import {Button, Divider} from "antd";
import {ArrowRightOutlined, MoreOutlined, PlayCircleFilled, PlaySquareOutlined} from "@ant-design/icons";

const Netfly = ({query}: any) => {
    const {error, loading, data } = useFetchData('https://naifeicn.com/vod/search.html',{},{wd: query});
    if(loading){
        return (<Loading />);
    }
    if (error){
        return (<></>);
    }
    let videos: any[] = [];
    let doc = new DOMParser().parseFromString(data, 'text/html');
    const mainElement = doc.body.getElementsByClassName('main').item(0);
    const items = mainElement!.getElementsByClassName('module-card-item');
    for (let i = 0; i < items.length; i++) {
        const itemTitle = items[i].getElementsByClassName('module-card-item-title').item(0)!.getElementsByTagName('a').item(0);
        let url = itemTitle!.href;
        const title = itemTitle!.getElementsByTagName('strong').item(0)!.innerText;
        url = url.replace(/(ht|f)tp(s?):\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*((:[0-9]+)?)*(\/?)(index\.php\/?)/gi,"https://netflycn.com/");
        const pic = items[i].getElementsByClassName('module-item-pic').item(0)!.getElementsByTagName('img').item(0)!.getAttribute('data-original');
        let resTime = items[i].getElementsByClassName('module-info-item-content').item(0);
        let actor = items[i].getElementsByClassName('module-info-item-content').item(1);
        // @ts-ignore
        actor = actor!.innerText;
            // @ts-ignore
        resTime = resTime!.innerText;

        videos =[...videos,{title, url, pic, actor, resTime}];
        console.log(items[i]);
        console.log(actor);
    }
    return (<div className={styles.netfly}>
        <br />
        <div className={styles.tag}>
            <PlaySquareOutlined />
            <span>视频</span>
            <MoreOutlined />
        </div>
        {videos &&(<div className={styles.video}>
            {videos.length>0&&(
                <>
                    <Divider />
                    <div className={styles.videoItem}>
                        <div className={styles.videoPic}>
                            <img src={videos[0].pic} />
                            <div className={styles.cover} >
                                <PlayCircleFilled onClick={()=>window.location.href=videos[0].url} />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <a href={videos[0].url}>{videos[0].title}</a>
                            </div>
                            <div className={styles.actor}>
                                <span>{videos[0].actor}</span>
                                <span>{videos[0].resTime}</span>
                            </div>
                        </div>
                    </div></>
            )}
            {videos.length>1&&(
                <>
                    <Divider />
                    <div className={styles.videoItem}>
                        <div className={styles.videoPic}>
                            <img src={videos[1].pic} />
                            <div className={styles.cover} >
                                <PlayCircleFilled onClick={()=>window.location.href=videos[1].url} />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <a href={videos[1].url}>{videos[1].title}</a>
                            </div>
                            <div className={styles.actor}>
                                <span>{videos[1].actor}</span>
                                <span>{videos[1].resTime}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {videos.length>2&&(
                <>
                    <Divider />
                    <div className={styles.videoItem}>
                        <div className={styles.videoPic}>
                            <img src={videos[2].pic} />
                            <div className={styles.cover} >
                                <PlayCircleFilled onClick={()=>window.location.href=videos[2].url} />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <a href={videos[2].url}>{videos[2].title}</a>
                            </div>
                            <div className={styles.actor}>
                                <span>{videos[2].actor}</span>
                                <span>{videos[2].resTime}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {videos.length>3&&(<div className={styles.videoItem}>
                <div className={styles.more}>
                    <Divider />
                    <Button icon={<ArrowRightOutlined />} className={styles.button} onClick={()=>window.location.href=`https://naifeicn.com/vod/search.html?wd=${query}`}>查看全部 </Button>
                    <Divider />
                </div>
            </div>)}
            {/*{ videos.map((value: any, index: number) => (<div key={index}>{value.title}</div>))}*/}
        </div>)}
    </div>);
    // return  <div dangerouslySetInnerHTML = {{ __html: mainElement!.innerHTML }}></div>
}
export default Netfly;
