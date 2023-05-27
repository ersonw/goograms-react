import { useEffect, useReducer} from 'react';
import Http from "@/utils/http";
// 初始状态
let initialState = {
    loading: true,
    error: false,
    data: [],
};
// 定义reducer，统一管理状态
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                loading: true,
                error: false,
                refreshing: false,
            };
        case 'success':
            return {
                ...state,
                error: false,
                data: action.payload,
            };
        case 'failure':
            return {
                ...state,
                error: true,
            };
        case 'done':
            return {
                ...state,
                loading: false,
                refreshing: false,
            };
        default:
            throw new Error();
    }
};
const useFetchStream = (url: string, data?: any,method='GET') => {
    // 如果有传过来的initData，设置到initialState里
    initialState = {
        ...initialState,
    };

    // 使用useReducer初始化数据
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        try {
            let result: any = [];
            const response: Response = await Http.fetch(url,data);
            const reader = response.body!.getReader();
            const textDecoder = new TextDecoder();
            let str = "";
            while (true) {
                const {value, done} = await reader.read();
                if (done) {
                    break;
                }
                str += textDecoder.decode(value);
                if (str.indexOf("\\\\b")>-1){
                    // let temp = str.substring(0,str.lastIndexOf("\\\\b")-1);
                    const temps = str.split("\\\\b");
                    str="";
                    for(let i=0;i<temps.length;i++){
                        if (temps[i]){
                            try {
                                const temp = JSON.parse(temps[i]);
                                result.push(temp);
                                // console.log(temp);
                                dispatch({ type: 'success', payload: result });
                            }catch (e) {
                                // console.log(e);
                                // console.log(temps);
                                str += temps[i];
                            }
                        }
                    }
                }
            }
        } catch (error) {
            dispatch({ type: 'failure' });
        } finally {
            dispatch({ type: 'done' });
        }
    };


    // 监听 url 参数，也就说当接口地址变化后，会重新请求接口
    useEffect(() => {
        fetchData().then(()=>{});
    }, [url]);

    // 返回这些内容，在调用的页面中可以读取、调用，或再次进行设置
    return { ...state };
};
export default useFetchStream;
// export const FetchStream = (url:string, data?:any) =>{
//     const [result,setResult] = useState([]as any);
//     const onLoad = useCallback(()=>{
//         Http.fetch(url,data).then(async (response: Response)=>{
//             const reader = response.body!.getReader();
//             const textDecoder = new TextDecoder();
//             let str = "";
//             while (true) {
//                 const {value, done} = await reader.read();
//                 if (done) {
//                     break;
//                 }
//                 str += textDecoder.decode(value);
//                 if (str.indexOf("\\\\b")>-1){
//                     // let temp = str.substring(0,str.lastIndexOf("\\\\b")-1);
//                     const temps = str.split("\\\\b");
//                     try {
//                         const temp = JSON.parse(temps[0]);
//                         str = temps[1];
//                         console.log(temp);
//                         setResult(result.concat(temp));
//                     }catch (e) {
//                         //
//                     }
//                 }
//             }
//         });
//
//     },[]);
//     useEffect(()=>{
//         return ()=>onLoad();
//     },[onLoad])
//     return {result};
// };
