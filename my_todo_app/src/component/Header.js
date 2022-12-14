import React from "react";
import { useNavigate } from "react-router-dom";
const Header =()=>{
    const navigate = useNavigate();
    return (
        <div>
            <span onClick={()=>navigate('/')}>TODO LIST</span>
        </div>
    )
}

export default Header;