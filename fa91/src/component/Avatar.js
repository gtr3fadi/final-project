



export default function Avatar({ src }) {
    return (
        <div className="avatar" style={{
            display: "inline-block",
            width: "37px",
            height: "37px",
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
