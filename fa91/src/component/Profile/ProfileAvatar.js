export default function ProfileAvatar({src}) {
     return (
        <div className="avatar hover-zoom" style={{
            display: "inline-block",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #ccc",

        }}>
            <img src={src} alt="avatar" style={{
                width: "100%",
                height: "100%",
            }}/>
        </div>
    )
}
