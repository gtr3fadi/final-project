import { useImageURL } from "./hook/useImageURL";
import { useAuthContext } from "./hook/useAuthContext";

const getImageUrl = (imageURL) => {
    if(imageURL) {
      return imageURL.avatar
    }
  if (!imageURL) {
    return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  }
};

export default function Avatar({ src, uid , width }) {
    const { user } = useAuthContext();
    const imageURL = useImageURL(uid);
    const image= getImageUrl(imageURL);

    
   

  return (
    <div
      className="avatar"
      style={{
        display: "inline-block",
        width: width ? width : "37px",
        height: width ? width : "37px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid #ccc",
      }}
    >
      <img
        src={image}
        alt="avatar"
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
