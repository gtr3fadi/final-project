import { useState } from "react";
import Select from "react-select";
import { webDevList } from "./Skills";
import { useThemeContext } from "../hook/useThemeContext";







export default function EditeProfile({ doc, updateDocumentField, saveChanges }) {
const{isLightTheme} = useThemeContext();

  const [fullName, setFullName] = useState(doc.fullName);
  const [displayName, setDisplayName] = useState(doc.displayName);
  const [career, setCareer] = useState(doc.career ? doc.career : "");
  const [whatsApp, setWhatsApp] = useState(doc.whatsApp ? doc.whatsApp : "");
  const [country, setCountry] = useState(doc.country ? doc.country : "");
  const [about, setAbout] = useState(doc.about ? doc.about : "");
  const [skills, setSkills] = useState(doc.skills ? 
    doc.skills.map((skill) => {
      return { value: skill, label: skill };
    }) : []);
  

  const sk = skills.map((skill) => {
    return skill.value;
  });

  console.log(skills);

  const handelSubmit = async (e) => {
    e.preventDefault();
    await updateDocumentField(doc.id, {
      fullName,
      career,
      about,
      skills: sk,
      whatsApp,
      country,
    });
    saveChanges(true);
  };

  const handelCancel = (e) => {
    e.preventDefault();
    setFullName(doc.fullName);
    saveChanges(true);
  };

  return (
    <div className="mt-3"
    >
      <form onSubmit={handelSubmit}>
        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label">
            Full Name
          </label>
          <div className="col-lg-9">
            <input
              onChange={(e) => setFullName(e.target.value)}
              className="form-control"
              type="text"
              value={fullName}
            />
          </div>
        </div>
        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label">
            career
          </label>
          <div className="col-lg-9">
            <input
              onChange={(e) => setCareer(e.target.value)}
              className="form-control"
              type="text"
              value={career}
            />
          </div>
        </div>
        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label">
            about
          </label>
          <div className="col-lg-9">
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              className="form-control"
              type="text"
              value={about}
            />
          </div>
        </div>
        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label">
            whats app
          </label>
          <div className="col-lg-9">
            <input
              onChange={(e) => setWhatsApp(e.target.value)}
              className="form-control"
              type="phone"
              value={whatsApp}
            />
          </div>
        </div>
        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label">
            country
          </label>
          <div className="col-lg-9">
            <input
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              type="text"
              value={country}
            />
          </div>
        </div>
        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label">
            skills
          </label>
          <div className="col-lg-9">
            <Select
              options={webDevList}
              isMulti
              defaultValue={skills}
              onChange={(e) => setSkills(e)}
            />
          </div>
        </div>

        <div className="form-group row my-1">
          <label className="col-lg-3 col-form-label form-control-label"></label>
          <div className="col-lg-9 ">
            <input
              onClick={handelCancel}
              type="reset"
              className="btn btn-secondary m-1"
              value="Cancel"
            />
            <input
              type="submit"
              className="btn btn-primary m-1"
              value="Save Changes"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
