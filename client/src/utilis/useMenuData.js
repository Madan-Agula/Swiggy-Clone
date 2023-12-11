import { useEffect, useState } from "react";
import { RESTAURANTS_API } from "./Swiggyapi";



export function useMenuData(id) {
    const [menuData, setMenuData] = useState(null);

    useEffect(()=>{
        fetchData(id)
    },[id])
    
    async function fetchData(id){
        const data = await fetch(RESTAURANTS_API+"itemsList/"+id);
        const res = await data.json();
        setMenuData(res)
    }
     return menuData;
}
