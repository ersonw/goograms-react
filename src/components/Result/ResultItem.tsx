import styles from './ResultItem.module.less';
import {MoreOutlined,} from "@ant-design/icons";
import React, {useEffect, useState} from "react";

export type ResultItemProps = {
    icon: string,
    url: string,
    link?: string,
    title?: string,
    content?: string,
    history?: string,
    children?: any[],
}
const ResultItem = (props: ResultItemProps) => {
    const {url} = props;
    const [baseUrl, setBaseUrl] = useState('');
    const [baseUri, setBaseUri] = useState([] as any);
    const [domain, setDomain] = useState('');
    useEffect(() => {
        const uri = url.replace(/(ht|f)tp(s?):\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*((:[0-9]+)?)*(\/?)/gi,"/").replace(/\?[0-9a-zA-Z](.*)?/gi,"");
        setBaseUri(uri.substring(1).split('/'));
        setBaseUrl(url.replace(uri,'').replace(/\?[0-9a-zA-Z](.*)?/gi,""));
        setDomain(url.replace(uri,'').replace(/\?[0-9a-zA-Z](.*)?/gi,"").replace(/(ht|f)tp(s?):\/\//,''));
        return () => {
        };
    }, [url]);

  return (
      <div className={styles.resultItem}>
          <div className={styles.tag}>
              <div className={styles.icon}>
                  <img src={props.icon} />
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
              <a href='' onClick={()=>{
                  // @ts-ignore
                  window.document.newWindow(props.link);
              }}>
                  <h3>{props.title}</h3>
              </a>
          </div>
          <div className={styles.content}>
              <span>{props.content}</span>
          </div>
          <div className={styles.history}></div>
          <div className={styles.children}>
              {props.children&&props.children.map((child, index) =>{
                  return (<ResultItem key={index} {...child}></ResultItem>)
              })}
          </div>
      </div>
  );
}
export default ResultItem;
