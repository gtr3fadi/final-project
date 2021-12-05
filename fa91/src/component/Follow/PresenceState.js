import { useOnlineState } from "../hook/useOnlineState"

 const getColor = (presence) => {
   if (!presence) {
     return "transparent"
     }
     if (presence.state === "online") {
         return "#90EE02";
     }
     if (presence.state === "offline") {
            return "gray";
     }
     if (presence.state === "away") {
            return "yellow"
     }
     if (presence.state === "busy") {
            return "orange"
     }
        return "transparent"
 };




const  PresenceState=({uid})=> {
    const presence = useOnlineState(uid);
   
    return (
        <div
            
            style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: getColor(presence),
                position: "absolute",
                top: "24px",
                right: "-1px",
                
            }}
        
        >
            
        </div>
    )
}


export default PresenceState

