import styles from './ResultItem.module.less';
import {MoreOutlined, PlaySquareOutlined} from "@ant-design/icons";
import React from "react";

const ResultItem = () => {
  return (
      <div className={styles.resultItem}>
          <div className={styles.tag}>
              <div className={styles.icon}>
                  <img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD+/v41NTUBAQEAAABZWVknJycWFhaZmZmIiIjp6ellZWXMzMzX19eurq54eHhHR0dExXFyAAAAAXRSTlMAQObYZgAAAPtJREFUeAG8kAWOBDAMA9d1Sin+/7XXbpZZdBaURlMrhx28ycGCD/n0bvkBwJf8C+AoIvRAWGtMyHGtCWkfxW+DRopuuIjUtTQJDStevNoXWaRjRSllLd1O8FFhgEZx2BmkAmHC8HwpOUyxSA50VqOjXgAl50URvNWPBRcAnmwnhbcduthqQCO9KYTFBG7eDWoK1T47AZX9DuiUYT/TuhX3MGpnD51kPprSA9Dl+BCKl7jWHHEHmHsLWhNZZMxPQCLTEuy+cYF6D9i8Q5e2Lcyz4AGwKdJbX0p7AegC2qnvxAsAxQRAYH8J6Dg1a/lvpKRJinMW4cxLMPsDAJjSCaG8cPmnAAAAAElFTkSuQmCC'}/>
              </div>
              <div>
                  <span>t.me</span>
                  <div className={styles.url}>
                      <cite>
                          https://t.me
                          <span> {'>'} CN_index</span>
                      </cite>
                      <MoreOutlined className={styles.more}/>
                  </div>
              </div>
          </div>
          <div className={styles.title}>
              <a >
                  <h3>123 - 维基百科，自由的百科全书 - Wikipedia</h3>
              </a>
          </div>
          <div className={styles.content}>
              <span>命名. 数字, 123. 名称, 123. 小写, 一百二十三. 大写, 壹佰贰拾参. 序数词（英语：Ordinal numeral）, 第一百二十三 one hundred and twenty-third.</span>
          </div>
          <div className={styles.history}></div>
      </div>
  );
}
export default ResultItem;
