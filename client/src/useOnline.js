
import {useEffect, useState} from "react";

export function useOnline(){
    const [online,setOnline] = useState(true);
    useEffect(() => {
        window.addEventListener("online",()=>{
            setOnline(true);
        })
        window.addEventListener("offline",()=>{
            setOnline(false)
        })
      }, [online]);
    return online
}