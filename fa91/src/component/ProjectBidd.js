import { Link } from "react-router-dom";
import Select from "react-select";
import Avatar from "./Avatar";
import { useThemeContext } from "./hook/useThemeContext";
import { useState } from "react";

export default function ProjectBidd({ project, user }) {
  const { isLightTheme } = useThemeContext();
  const [bidWine, setBidWine] = useState("fadi");
  const option = project.bidd.map(b => {
    return { value: b.displayName, label: `${b.displayName} || (${b.isBidded}$)` };
  }
  );

  return (
    <div
      className={`card bg-opacity-75  shadow-sm ${
        isLightTheme ? "bg-light" : "bg-dark"
      }`}
    >
      <h6 className="card-header">
        {" "}
        Development Bidded || choose one
        <i className="fas fa-user-plus mx-1 text-success"></i>
      </h6>
      <div className="card-body">
        <Select
          options={option}
        />
      </div>
      <div className="card-body">
        <div className="row">
          {project.bidd.map((bidd, index) => (
            <div key={bidd.biddId} className="col-md-4 ">
              <Link
                to={`/profile/${bidd.user}`}
                className="card-text  m-0  d-flex justify-content-start align-items-center"
              >
                <Avatar uid={bidd.user} src={bidd.photoURL} />
                <span className="text-capitalize ms-1 font-weight-bold">
                  {bidd.displayName} ({bidd.isBidded}$)
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
