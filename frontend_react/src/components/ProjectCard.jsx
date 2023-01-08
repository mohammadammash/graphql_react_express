import React from "react";

function ProjectCard({ project }) {
  return (
    <div>
      <h5>{project.name}</h5>
      <h6>
        {project.description} ~ <i>{project.status}</i>
      </h6>
      <hr width={400}/>
    </div>
  );
}

export default ProjectCard;
