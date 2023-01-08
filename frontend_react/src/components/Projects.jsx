import React from "react";
import { useQuery } from "@apollo/client";
//internal
import { GET_PROJECTS } from "../graphql_network/project";
import ProjectCard from "./ProjectCard";

function Projects() {
  const { loading, error, data: allProjectsData } = useQuery(GET_PROJECTS);

  if (loading) return <h1>LOADING...</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <>
      <h2>Projects:</h2>
      <hr />
      <div>
        {allProjectsData?.projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default Projects;
