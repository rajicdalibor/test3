// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject as fetchProjects } from '../../actions/3apadmin/time';
import ProjectEntry from '../../components/projectEntry';
import './projects.css';

type Props = {
  isFetching: boolean,
  isAdmin: boolean,
  fetchProjects: Function,
  projects: Array<HarvestProject>
};

class Projects extends Component<Props> {
  componentWillMount() {
    const { fetchProjects } = this.props;
    fetchProjects();
  }

  render() {
    const { projects, isFetching } = this.props;
    const isEmpty = projects === null || projects === undefined;

    return (
      <div>
        <h1>Projects</h1>
        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Empty.</h2>
          )
        ) : (
          <div style={{ opacity: isFetching ? 0.5 : 1 }} className="projects">
            {projects.map((project, i) => (
              <ProjectEntry
                key={project.id}
                project={project}
                shouldRender={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const projects = state.project.projectsMe;

  return {
    projects
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
