import React from "react";
import '../../assets/style/sports/Popup.css'


function Popup(props) {
   return (props.trigger == props.id) ? (
    <div className="popup">
    <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(0)}>Vissza</button>
        {props.children}
    </div>

</div>
   ):""
}
export default Popup