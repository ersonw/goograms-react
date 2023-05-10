import styles from './ResultItem.module.less';
import {MoreOutlined, PlayCircleFilled,} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Button} from "antd";

export type ResultItemProps = {
    query?: string,
    sponsor?: boolean,
    icon: string,
    url?: string,
    link?: string,
    video?: string,
    title?: string,
    content: string,
    history?: string,
    children?: any[],
}
const ResultItem = (props: ResultItemProps) => {
    const {url} = props;
    const [baseUrl, setBaseUrl] = useState('');
    const [baseUri, setBaseUri] = useState([] as any);
    const [domain, setDomain] = useState('');
    useEffect(() => {
        if (url){
            const uri = url.replace(/(ht|f)tp(s?):\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*((:[0-9]+)?)*(\/?)/gi,"/").replace(/\?[0-9a-zA-Z](.*)?/gi,"");
            setBaseUri(uri.substring(1).split('/'));
            setBaseUrl(url.replace(uri,'').replace(/\?[0-9a-zA-Z](.*)?/gi,""));
            setDomain(url.replace(uri,'').replace(/\?[0-9a-zA-Z](.*)?/gi,"").replace(/(ht|f)tp(s?):\/\/((www\.)?)/,''));
        }
        return () => {
        };
    }, [url]);
    const contentHandler = (contents: string)=>{
        const q = props.query;
        const content = contents.split(`${q}`);
        if (content.length>1){
            return <>{content.map((val,index)=>{
                return <span key={index}>{val}<em className={styles.searchField}>{q}</em></span>
            })}</>
        }
        return <>{contents}</>
    }
    const resultItemTitle = ({title,url,link,video,content,history}: ResultItemProps)=>{

        const getTitleHead = ()=>{
            if (url){
                const buri = url.replace(/(ht|f)tp(s?):\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*((:[0-9]+)?)*(\/?)/gi,"/").replace(/\?[0-9a-zA-Z](.*)?/gi,"");
                const bUri=(buri.substring(1).split('/'));
                const bUrl=(url.replace(buri,'').replace(/\?[0-9a-zA-Z](.*)?/gi,""));
                return (<div className={styles.tag}>
                    <div>
                        <div className={styles.url}>
                            <cite>
                                {bUrl}
                                {bUri && bUri.map((val: any, index: number) => {
                                    return (<span key={`${url}-${index}`}> {'>'} {val}</span>)
                                })}
                            </cite>
                            <MoreOutlined className={styles.more}/>
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
                <Button type={'link'}  onClick={()=>{
                    // @ts-ignore
                    window.document.newWindow(link||props.link);
                }}>
                    <h3>{title}</h3>
                </Button>
            </div>
            <div className={styles.contentBox}>
                {video&&(
                    <div className={styles.videoPicBox}>
                        <div className={styles.videoPic}>
                            <img src={video} alt={'video'}/>
                            <div className={styles.cover} >
                                <PlayCircleFilled onClick={()=>{
                                    // @ts-ignore
                                    window.document.newWindow(link||props.link);
                                }} />
                            </div>
                        </div>
                    </div>
                )}
                <div className={video?styles.content:styles.contentText}>
                    {contentHandler(content)}
                </div>
            </div>
            <div className={styles.history}></div>
        </>)
    }

  return (
      <div className={styles.resultItem}>
          {props.sponsor&&(<div className={styles.sponsor}>赞助商</div>)}
          <div className={styles.tag}>
              <div className={styles.icon}>
                  <img src={props.icon} alt={'logo'}/>
              </div>
              <div>
                  <span>{domain}</span>
                  <div className={styles.url}>
                      <cite>
                          {baseUrl}
                          {baseUri&&baseUri.map((val: any, index: number)=>{
                              return (<span key={`${url}-${index}`}> {'>'} {val}</span>)
                          })}
                      </cite>
                      <MoreOutlined className={styles.more}/>
                  </div>
              </div>
          </div>
          <div className={styles.title}>
              <Button type={'link'}   onClick={()=>{
                  // @ts-ignore
                  window.document.newWindow(props.link);
              }}>
                  <h3>{props.title}</h3>
              </Button>
          </div>
          <div className={styles.contentBox}>
              {props.video&&(
                  <>
                      <div className={styles.videoPicBox}>
                          <div className={styles.videoPic}>
                              <img src={props.video} alt={'video'} />
                              <div className={styles.cover} >
                                  <PlayCircleFilled onClick={()=>{
                                      // @ts-ignore
                                      window.document.newWindow(props.link);
                                  }} />
                              </div>
                          </div>
                      </div>
                  </>
              )}
              <div className={props.video?styles.content:styles.contentText}>
                  {contentHandler(props.content)}
              </div>
          </div>
          <div className={styles.history}></div>
          <div className={styles.children}>
              {props.children&&props.children.map((child, index) =>{
                  return (<div key={index}>{resultItemTitle({...child})}</div>)
                  // if (props.query&&!child.query){
                  //     child.query = props.query;
                  // }
                  // return (<ResultItem key={index} {...child}></ResultItem>)
              })}
          </div>
      </div>
  );
}
export default ResultItem;
