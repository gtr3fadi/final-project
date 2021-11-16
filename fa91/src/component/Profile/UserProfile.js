import Select from "react-select";
import { webDevList } from "./Skills";
import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useFirestore } from "../hook/useFirestore";

export default function UserProfile({ doc }) {
    const { user } = useAuthContext();
      const { updateDocumentField, response } = useFirestore("users");




      
      const [about, setAbout] = useState("");
      const [skills, setSkills] = useState("");
      const [selectValue, setSelectValue] = useState([]);
      console.log(selectValue);

      const sk = selectValue.map((item) => {
        return item.value;
      });

      console.log(sk);







  return (
    <>
      <h5 className="mb-3">User Profile</h5>
      <div className="row">
        <div className="col-md-6">
          <h6 className="font-weight-bold">About Me</h6>
          {doc.about && <p className=" text-capitalize ">{doc.about}</p>}
          {!doc.about && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateDocumentField(doc.id, {
                  about: about,
                });
              }}
            >
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="about"
                  placeholder="Enter your about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
                <button className="btn btn-primary ">Update</button>
              </div>
            </form>
          )}

          <hr />
          <h6 className="font-weight-bold">My Skills</h6>
          {doc.skills &&
            doc.skills.map((skill) => (
              <span className="badge badge-pill badge-secondary m-1">
                <button className="btn btn-danger btn-sm">{skill}</button>
              </span>
            ))}

          {!doc.skills && (
            <>
              <Select
                classNamePrefix="select"
                defaultValue={selectValue}
                isMulti
                name="color"
                options={webDevList}
                onChange={(opt) => setSelectValue(opt)}
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateDocumentField(doc.id, {
                    skills: sk,
                  });
                }}
              >
                <button className="btn btn-primary ">Update</button>
              </form>
            </>
          )}

          <hr />
        </div>
        <div className="col-md-6">
          <h6>Recent badges</h6>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            html5
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            react
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            codeply
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            angularjs
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            css3
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            jquery
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            bootstrap
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            responsive-design
          </a>
          <hr />
          <span className="badge badge-primary">
            <i className="fa fa-user"></i> 900 Followers
          </span>
          <span className="badge badge-success">
            <i className="fa fa-cog"></i> 43 Forks
          </span>
          <span className="badge badge-danger">
            <i className="fa fa-eye"></i> 245 Views
          </span>
        </div>
        <div className="col-md-12">
          <h5 className="mt-2 mb-3">
            <span className="fa fa-clock-o ion-clock float-right"></span> Recent
            Activity
          </h5>
          <table className="table table-hover table-striped">
            <tbody>
              <tr>
                <td>
                  <strong>Abby</strong> joined ACME Project Team in{" "}
                  <strong>`Collaboration`</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Gary</strong> deleted My Board1 in{" "}
                  <strong>`Discussions`</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Kensington</strong> deleted MyBoard3 in{" "}
                  <strong>`Discussions`</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>John</strong> deleted My Board1 in{" "}
                  <strong>`Discussions`</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Skell</strong> deleted his post Look at Why this is..
                  in <strong>`Discussions`</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
