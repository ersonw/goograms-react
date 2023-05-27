import styles from './ResultItem.module.less';
import {GlobalOutlined, MoreOutlined, PlayCircleFilled,} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import Link from 'antd/es/typography/Link';


export type ResultItemProps = {
    query?: string,
    sponsor?: boolean,
    icon: string,
    url?: string,
    link?: string,
    video?: string,
    picture?: string,
    title?: string,
    content: string,
    historyTime?: string,
    children?: any[],
}
const ResultItem = (props: ResultItemProps) => {
    const {url} = props;
    const [baseUrl, setBaseUrl] = useState('');
    const [baseUri, setBaseUri] = useState([] as any);
    const [domain, setDomain] = useState('');
    useEffect(() => {
        if (url){
            // console.log(url)
            let uri = decodeURIComponent(url).replace(/^(ht|f)tp(s?):\/\/((www\.)?)(([0-9a-zA-Z]*\.)?)([0-9a-zA-Z]*\.[a-zA-Z]*)((:[0-9]+)?)\//gi,"/").replace(/\?(.*?)/gi,"");
            setBaseUri(uri.substring(1).split('/'));
            if (uri.length>1){
                setBaseUrl(decodeURIComponent(url).replace(uri,''));
                setDomain(decodeURIComponent(url).replace(uri,'').replace(/^(ht|f)tp(s?):\/\/((www\.)?)/,''));
            }else {
                setBaseUrl(decodeURIComponent(url).substring(0,url.length-1));
                setDomain(decodeURIComponent(url).substring(0,url.length-1).replace(/^(ht|f)tp(s?):\/\/((www\.)?)/,''));
            }
        }
        return () => {
        };
    }, [url]);
    const onClick = (link: any) => {
        // @ts-ignore
        window.document.newWindow(getLink(link));
    };
    const getLink = (link: any) => {
        if (link!==undefined){
            if (`${link}`.indexOf("?")>-1){
                // @ts-ignore
                link = `${link}&cid=${window.document.newWindowId()}`;
            }else{
                // @ts-ignore
                link = `${link}?cid=${window.document.newWindowId()}`;
            }
            return link;
        }
        return '#';
    };
    const contentHandler = (contents: string)=>{
        const q = props.query;
        const content = contents.replace(`${q}`, `<em>${q}</em>`);
        return <div dangerouslySetInnerHTML = {{__html: content}} ></div>
        // const content = contents.split(`${q}`);
        // if (content.length>1){
        //     return <>{content.map((val,index)=>{
        //         return <span key={index}>{val}<em className={styles.searchField}>{q}</em></span>
        //     })}</>
        // }
        // return <>{contents}</>
    }
    const historyHandler = (historyTime : any)=>{
        if (historyTime!==undefined){
            const t = new Date(historyTime);
            if (t.getTime()>0){
                if (t.getTime() < (new Date().setHours(0,0,0,0) - 86400000 * 2)){
                    return <>您 {`${t.getFullYear()} ${t.getMonth()+1}-${t.getDate()}`} 访问过该网页</>
                }else{
                    return <>您 最近 访问过该网页</>
                }
            }
        }
        return <></>
    };
    const resultItemTitle = ({title,url,link,video,content,historyTime}: ResultItemProps)=>{

        const getTitleHead = ()=>{
            if (url){
                let uri = decodeURIComponent(url).replace(/^(ht|f)tp(s?):\/\/((www\.)?)(([0-9a-zA-Z]*\.)?)([0-9a-zA-Z]*\.[a-zA-Z]*)((:[0-9]+)?)\//gi,"/").replace(/\?(.*?)/gi,"");
                setBaseUri(uri.substring(1).split('/'));
                if (uri.length>1){
                    setBaseUrl(decodeURIComponent(url).replace(uri,''));
                    setDomain(decodeURIComponent(url).replace(uri,'').replace(/^(ht|f)tp(s?):\/\/((www\.)?)/,''));
                }else {
                    setBaseUrl(decodeURIComponent(url).substring(0,url.length-1));
                    setDomain(decodeURIComponent(url).substring(0,url.length-1).replace(/^(ht|f)tp(s?):\/\/((www\.)?)/,''));
                }
                const buri = decodeURIComponent(url).replace(/^(ht|f)tp(s?):\/\/((www\.)?)(([0-9a-zA-Z]*\.)?)([0-9a-zA-Z]*\.[a-zA-Z]*)((:[0-9]+)?)\//gi,"/").replace(/\?(.*?)/gi,"");
                let bUri=([]as string[]);
                let bUrl=decodeURIComponent(url).substring(0,url.length-1);
                if (buri.length>1){
                    bUri=  decodeURIComponent(url).substring(0,url.length-1).split('/');
                    bUrl= decodeURIComponent(url).replace(uri,'').replace(/^(ht|f)tp(s?):\/\/((www\.)?)/,'');
                }
                return (<div className={styles.tag}>
                    <div>
                        <div className={styles.url}>
                            <cite>
                                {bUrl}
                                {bUri && bUri.map((val: any, index: number) => {
                                    if (!val) return <span key={`${url}-${index}`}/>
                                    return (<span key={`${url}-${index}`}> {'>'} {(val)}</span>)
                                })}
                            </cite>
                            <MoreOutlined className={styles.more} onClick={()=>onClick((link||props.link)?.replaceAll("result","snapshot"))}/>
                        </div>
                    </div>
                </div>);
            }else{
                return <></>
            }

        }
        return (<>
            {getTitleHead()}
            <div className={styles.title}>
                <Link target={'_blank'} href={getLink(link||props.link)}>
                    <h3>{title}</h3>
                </Link>
                {/*<Button type={'link'}  onClick={()=>onClick(link||props.link)}>*/}
                {/*    <h3>{title}</h3>*/}
                {/*</Button>*/}
            </div>
            <div className={styles.contentBox}>
                {/*{video&&(*/}
                {/*    <div className={styles.videoPicBox}>*/}
                {/*        <div className={styles.videoPic}>*/}
                {/*            <img src={video} alt={'video'}/>*/}
                {/*            <div className={styles.cover} >*/}
                {/*                <PlayCircleFilled onClick={()=>onClick(link||props.link)} />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
                <div className={styles.contentText}>
                    {contentHandler(content)}
                </div>
            </div>
            <div className={styles.history}>{historyHandler(historyTime)}</div>
        </>)
    }
    const containsEncodedComponents = (x: string)=> {
        // ie ?,=,&,/ etc
        return (decodeURI(x) !== decodeURIComponent(x));
    }

    return (
      <div className={styles.resultItem}>
          {props.sponsor&&(<div className={styles.sponsor}>赞助商</div>)}
          <div className={styles.tag}>
              <div className={styles.icon}>
                  {props.icon?(<img src={props.icon} alt={'logo'}/>):(<GlobalOutlined />)}
              </div>
              <div>
                  <span>{domain}</span>
                  <div className={styles.url}>
                      <cite>
                          {baseUrl}
                          {baseUri&&baseUri.map((val: any, index: number)=>{
                              if (!val) return <span key={`${url}-${index}`}/>
                              return (<span key={`${url}-${index}`}> {'>'} {(val)}</span>)
                          })}
                      </cite>
                      <MoreOutlined className={styles.more} onClick={()=>onClick(props.link?.replaceAll("result","snapshot"))}/>
                  </div>
              </div>
          </div>
          <div className={styles.title}>
              {/*<Button type={'link'}   onClick={()=>onClick(props.link)}>*/}
              {/*    <h3>{props.title}</h3>*/}
              {/*</Button>*/}
              <Link target={'_blank'} href={getLink(props.link)}>
                  <h3>{props.title}</h3>
              </Link>
          </div>
          <div className={styles.contentBox}>
              {props.video?(
                  <>
                      <div className={styles.videoPicBox}>
                          <div className={styles.videoPic}>
                              <img src={props.video} alt={'video'} />
                              <div className={styles.cover} >
                                  <PlayCircleFilled onClick={()=>onClick(props.link)} />
                              </div>
                          </div>
                      </div>
                  </>
              ):(
                  <>{props.picture&&(<div className={styles.videoPicBox}>
                      <div className={styles.videoPic}>
                          <img src={props.picture} alt={'picture'} />
                          <div className={styles.cover} >
                              {/*<PlayCircleFilled onClick={()=>onClick(props.link)} />*/}
                          </div>
                      </div>
                  </div>)}</>
              )}
              <div className={props.video||props.picture?styles.content:styles.contentText}>
                  {contentHandler(props.content)}
              </div>
          </div>
          <div className={styles.history}>{historyHandler(props.historyTime)}</div>
          <div className={styles.children}>
              {props.children&&props.children.map((child, index) =>{
                  return (<div key={index}>{resultItemTitle({...child})}</div>)
              })}
          </div>
      </div>
  );
}
export default ResultItem;
