import PresenceState from "../Follow/PresenceState";
import AvatarUploadImage from "./AvatarUploadImage";

export default function ProfileAvatar({ src ,uid, user}) {
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
      <img
        src={src}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "2px solid #ccc",
        }}
      />
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
