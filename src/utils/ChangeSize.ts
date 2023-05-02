import {useCallback,useState,useEffect} from 'react';

export const ChangeSize =()=>{
    const [size,setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    },[])

    useEffect(()=>{
        window.addEventListener('resize',onResize);
        return (()=>{
            window.removeEventListener('resize',onResize)
        })
    },[])

    return size;
}
