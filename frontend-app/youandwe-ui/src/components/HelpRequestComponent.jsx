import React, { useEffect, useState } from "react";
import {
  getHelpRequest,
  saveHelpRequest,
  updateHelpRequest,
} from "../services/HelpRequestService";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInUser } from "../services/AuthService";
const HelpRequestComponent = () => {
  const loggedUsername = getLoggedInUser();
  const [help, setHelp] = useState("");
  const [username, setUsername] = useState(loggedUsername);
  const [details, setDetails] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // const username = loggedUsername;
  function saveOrUpdateHelpRequest(e) {
    e.preventDefault();
    const helpRequest = { id, username, help, details };
    console.log(helpRequest);
    if (id) {
      updateHelpRequest(id, helpRequest)
        .then((response) => {
          console.log(response);
          navigate("/helpRequests");
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (id === undefined || username === loggedUsername) {
      console.log("hi");
      saveHelpRequest(helpRequest)
        .then((response) => {
          console.log(response.data);
          navigate("/helpRequests");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("error");
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Help Request Form</h2>;
    } else {
      return <h2 className="text-center">Help Request Form</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getHelpRequest(id)
        .then((response) => {
          console.log("t:", response.data);
          setUsername(response.data.username);
          setHelp(response.data.help);
          setDetails(response.data.details);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-md-3 control-label">User Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={username}
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-9 control-label">
                  What's the help you needed?
                </label>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="help"
                    className="form-control"
                    placeholder="Enter your issue"
                    value={help}
                    onChange={(e) => setHelp(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-6 control-label">
                  Additional Details
                </label>
                <div className="col-md-12">
                  <textarea
                    type="text"
                    name="details"
                    className="form-control"
                    placeholder="Please provide more details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="form-group mb-3">
                {/* {isAdmin && ( */}
                <button
                  className="btn btn-primary"
                  onClick={(e) => saveOrUpdateHelpRequest(e)}
                >
                  Submit
                </button>
                {/* )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestComponent;
