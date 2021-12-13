import { useOnlineState } from "../hook/useOnlineState";
import { useState } from 'react';
import formatDistanceToNow from "date-fns/formatDistanceToNow";





const getColor = (presence) => {
  if (!presence) {
    return "transparent";
  }
  if (presence.state === "online") {
    return "#90EE02";
  }
  if (presence.state === "offline") {
    return "#FF0000";
  }
  if (presence.state === "away") {
    return "yellow";
  }
  if (presence.state === "busy") {
    return "orange";
  }
  return "transparent";
};

const getText = (presence) => {
  if (!presence) {
    return "unknown";
  }

  return presence.state === "online" ? "online" : `last seen ${formatDistanceToNow(new Date(presence.last_changed), { addSuffix: true })}`;
};

 

const PresenceState = ({ uid }) => {
  const presence = useOnlineState(uid);
  const [show, setShow] = useState(true);

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
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      data-toggle="tooltip"
      data-placement="top"
      title={getText(presence)}
    >
    
    </div>
  );
}

     
  

export default PresenceState;
