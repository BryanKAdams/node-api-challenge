import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/projects").then(response => {
      console.log(response);
      setProjects(response.data);
    });
  }, []);

  const handleChange = (id, event) => {
    console.log(event.target.checked);
    axios
      .put(`http://localhost:4000/api/projects/${id}`, {
        completed: event.target.checked
      })
      .then(res => {
        console.log(res);
      });
  };
  return (
    <div>
      <h1>PROJECTS</h1>
      {projects.map(project => (
        <div key={project.id}>
          <h1>
            <Link to={`/projects/${project.id}`}>
              Project Name:{project.name}
            </Link>
          </h1>
          <p>Description: {project.description}</p>
          {console.log(project.completed)}
          {project.completed ? (
            <div>
              <p>
                Project Completed{" "}
                <input
                  onChange={event => handleChange(project.id, event)}
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
                  onChange={event => handleChange(project.id, event)}
                  type="checkbox"
                />
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ProjectList;
