import { useState } from "react";





export default function EditeProfile({ doc }) {
    const [fullName, setFullName] = useState(doc.fullName);
    const [displayName, setDisplayName] = useState(doc.displayName);
    const [career, setCareer] = useState(doc.career);
    const [whatsApp, setWhatsApp] = useState(doc.whatsApp);
    const [country, setCountry] = useState(doc.country);
    const [about, setAbout] = useState(doc.about);
    const [skills, setSkills] = useState(doc.skills.map(skill => skill.name));

    



    return (
      <div>
        <form>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Full Name
            </label>
            <div className="col-lg-9">
              <input className="form-control" type="text" value={fullName} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Display Name
            </label>
            <div className="col-lg-9">
              <input className="form-control" type="text" value={displayName} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              career
            </label>
            <div className="col-lg-9">
              <input className="form-control" type="text" value={career} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Email
            </label>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="email"
                value="mark@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Change profile
            </label>
            <div className="col-lg-9">
              <input className="form-control" type="file" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Website
            </label>
            <div className="col-lg-9">
              <input className="form-control" type="url" value="" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Address
            </label>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="text"
                value=""
                placeholder="Street"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label"></label>
            <div className="col-lg-6">
              <input
                className="form-control"
                type="text"
                value=""
                placeholder="City"
              />
            </div>
            <div className="col-lg-3">
              <input
                className="form-control"
                type="text"
                value=""
                placeholder="State"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Username
            </label>
            <div className="col-lg-9">
              <input className="form-control" type="text" value="jhonsanmark" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Password
            </label>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="password"
                value="11111122333"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">
              Confirm password
            </label>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="password"
                value="11111122333"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label"></label>
            <div className="col-lg-9">
              <input
                type="reset"
                className="btn btn-secondary"
                value="Cancel"
              />
              <input
                type="button"
                className="btn btn-primary"
                value="Save Changes"
              />
            </div>
          </div>
        </form>
      </div>
    );
}
