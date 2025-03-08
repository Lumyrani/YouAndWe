import React, { useEffect, useState } from "react";
import {
  deleteHelpRequest,
  getAllHelpRequests,
} from "../services/HelpRequestService";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";

const ListHelpRequestComponent = () => {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    listHelpRequests();
  }, []);

  function listHelpRequests() {
    getAllHelpRequests()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewHelpRequest() {
    navigate("/add-helpRequest");
  }

  function updateHelpRequest(id) {
    console.log(id);
    navigate(`/update-helpRequest/${id}`);
  }

  function removeHelpRequest(id) {
    deleteHelpRequest(id)
      .then((response) => {
        console.log(response.data);
        listHelpRequests();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Help Requests</h2>
      {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={addNewHelpRequest}>
          Add Help Request
        </button>
      )}

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Help</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((helpRequest) => (
              <tr key={helpRequest.id}>
                <td>{helpRequest.name}</td>
                <td>{helpRequest.email}</td>
                <td>{helpRequest.help}</td>
                <td>{helpRequest.details}</td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-info"
                      onClick={() => updateHelpRequest(helpRequest.id)}
                    >
                      Update
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      onClick={() => removeHelpRequest(helpRequest.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListHelpRequestComponent;
