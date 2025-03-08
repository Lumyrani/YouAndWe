import React, { useEffect, useState } from "react";
import {
  getHelpRequest,
  saveHelpRequest,
  updateHelpRequest,
} from "../services/HelpRequestService";
import { useNavigate, useParams } from "react-router-dom";
const HelpRequestComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [help, setHelp] = useState("");
  const [details, setDetails] = useState("");

  // function handleHelpRequestForm(e) {
  //     e.preventDefault();
  //     const helpRequest = { name, email, help, details }
  //     console.log(helpRequest);
  // }
  const navigate = useNavigate();
  const { id } = useParams();

  function saveOrUpdateHelpRequest(e) {
    e.preventDefault();

    const helpRequest = { name, email, help, details };
    console.log(helpRequest);

    if (id) {
      updateHelpRequest(id, helpRequest)
        .then((response) => {
          console.log(response.data);
          navigate("/helpRequests");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      saveHelpRequest(helpRequest)
        .then((response) => {
          console.log(response.data);
          navigate("/helpRequests");
        })
        .catch((error) => {
          console.error(error);
        });
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
          console.log(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
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
                <label className="col-md-3 control-label">Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 control-label">Email</label>
                <div className="col-md-9">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-6 control-label">
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
                <button
                  className="btn btn-primary"
                  onClick={(e) => saveOrUpdateHelpRequest(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestComponent;
