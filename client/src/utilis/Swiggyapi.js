import { useEffect, useState } from "react";

const SWIGGY_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/"
const RESTAURANTS_API = "http://localhost:8080/";


function useAllRestaurantsData(){
    const [allResData,setAllResData] = useState(null);
    useEffect(() => {
        fetchData();
      }, []);
    
      async function fetchData() {
        try {
          const data = await fetch(RESTAURANTS_API+"restaurants")
          const res = await data.json(); 
          setAllResData(res);
        } catch (e) {
          console.error(e);
        }
      }
      return allResData;
}

function useOneRestaurantData(id){
    const [oneResData,setOneResData] = useState(null);
    useEffect(() => {
        fetchData(id);
      }, [id]);
    
      async function fetchData(id) {
        try {
          const data = await fetch(`${RESTAURANTS_API}restaurants/${id}`)
          const res = await data.json(); 
          setOneResData(res);
        } catch (e) {
          console.error(e);
        }
      }
      return oneResData;
}
export{
    SWIGGY_URL,
    RESTAURANTS_API,
    useAllRestaurantsData,
    useOneRestaurantData
}