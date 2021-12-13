import Avatar from "../Avatar";
import PresenceState from "../Follow/PresenceState";
import AvatarUploadImage from "./AvatarUploadImage";



  

export default function ProfileAvatar({ src, uid, user }) {
 
  
  return (
    <div
      className="avatar "
      style={{
        display: "inline-block",
        width: "200px",
        height: "200px",

        overflow: "hidden",

        position: "relative",
      }}
    >
      <Avatar uid={uid} width={"200px"} />
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "18%",
        }}
      >
        <PresenceState uid={uid} />
      </div>

      {user.uid === uid && <AvatarUploadImage />}
    </div>
  );
}
