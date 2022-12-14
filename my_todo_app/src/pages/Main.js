import React from "react";
import { useNavigate } from "react-router-dom";

export const Main =()=>{
    const navigate = useNavigate();
    return (
        <div>
            <span>TODO LIST</span>
            <button onClick={()=>navigate('/todo')}>start</button>
        </div>
    );
}