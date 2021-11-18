export default function ProfileAvatar({src ,online}) {
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
         {online && (
           <div
             className="online-indicator"
             style={{
               position: "absolute",
               bottom: "10px",
               right: "10px",
               width: "20px",
               height: "20px",
               borderRadius: "50%",
               background: "#90EE02",
                 zIndex: 1,
               boxShadow: "0 0 10px #ccc , 0 0 20px #ccc",
             }}
                 ></div>
                
         )}
       </div>
     );
}
      
