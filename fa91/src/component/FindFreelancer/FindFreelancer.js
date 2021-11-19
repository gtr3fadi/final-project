import { useCollection } from "../hook/useCollection";
import { useAuthContext } from "../hook/useAuthContext";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { format } from "date-fns";





export default function FindFreelancer() {
    const { user } = useAuthContext();
    const { documents:data, error } = useCollection("users");
    if (error) {
        return <div>Error</div>
    }
    if (!data) {
        return <div>Loading</div>
    }

    return (
        // card for freelancer
        <div className="container mt-5 pt-2">
            <div className="row">
                {data && data.map(user => {
                    return (
                      <div className="col-md-6">
                        <div className="card mb-4 box-shadow">
                                <div className="card-body" >
                            <div className="row">
                              <div className="col-md-4">
                                <img
                                  src={user.photoURL}
                                  className="img-fluid rounded-circle border border-3"
                                  alt="..."
                                />
                              </div>
                              <div className="col-md-8">
                                <h5 className="card-title text-capitalize mb-0">
                                  {user.fullName}
                                </h5>
                                <p className="card-text m-0 ">
                                  @{user.displayName}
                                </p>
                                <p className="card-text text-capitalize mb-0 mt-2">
                                  {user.career}
                                </p>
                                            <p className="card-text mt-0"
                                                style={{
                                                    minHeight: "50px",
                                                }}
                                            >{user.about.substring(0, 50)}....</p>
                                            <h5 className="card-title text-capitalize">top skills</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                  {user.skills.map((skill) => {
                                    return (
                                      <span className="btn btn-sm btn-outline-secondary">
                                        {skill}
                                      </span>
                                    );
                                  }).slice(0, 2)}...
                                </div>
                                        </div>
                                        <hr className="my-2" />
                              <div className="row">
                                            <div className="col-md-12">
                                              
                                  
                                  <Link to={`/profile/${user.uid}`} className="btn btn-primary">
                                    Viwe
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
            </div>
        </div>
    )
}


                                    

                          
       
            
            




 