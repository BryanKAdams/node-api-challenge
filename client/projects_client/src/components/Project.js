import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Project = props => {
  console.log(props);
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/${props.match.params.id}`)
      .then(res => {
        console.log(res);
        setProject(res.data);
      });
  }, [props.match.params.id]);

  const handleChange = (id, event) => {
    console.log(event.target.checked);
    axios
      .put(
        `http://localhost:4000/api/projects/${props.match.params.id}/actions/${id}`,
        {
          completed: event.target.checked
        }
      )
      .then(res => {
        console.log(res);
      });
  };
  return (
    <div>
      <div>
        <h1>Project Name: {project.name}</h1>
        <p>Project Description: {project.description}</p>
        {project.completed ? (
          <div>
            <p>Status: Project Completed</p>
          </div>
        ) : (
          <div>
            <p>Status: Project Incomplete</p>
          </div>
        )}
      </div>
      <div>
        <h1>Project Actions</h1>
        <div>
          {project.actions ? (
            project.actions.map(action => {
              axios
                .get(
                  `http://localhost:4000/api/projects/${props.match.params.id}/actions/${action.id}`
                )
                .then(res => {
                  return res.data
                });

              return (
                <div key={action.id}>
                  <h1> Action Name: {action.description}</h1>
                  <p> Action Notes: {action.notes}</p>
                  {action.completed ? (
                    <div>
                      <p>
                        Project Completed{" "}
                        <input
                          onChange={event => handleChange(action.id, event)}
                          type="checkbox"
                          checked
                        />
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        Project Completed{" "}
                        <input
                          onChange={event => handleChange(action.id, event)}
                          type="checkbox"
                        />
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
