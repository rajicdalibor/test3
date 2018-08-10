// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../actions/3apadmin/time/index';
import ProjectEntry from '../projectEntry/index';
import { FormattedMessage } from 'react-intl';
import './projectWidget.css';

type Props = {
  fetchProject: Function,
  projectsMe: Array<HarvestProject>
};

type State = {
  currentProject: number,
  project: any
};

class ProjectWidget extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      currentProject: 0,
      project: {}
    };
  }

  componentDidMount() {
    const { fetchProject } = this.props;
    fetchProject();
  }

  handleLeftClick() {
    if (this.state.currentProject === 0)
      this.setState({ currentProject: this.props.projectsMe.length - 1 });
    else this.setState({ currentProject: this.state.currentProject - 1 });
  }

  handleRightClick() {
    if (this.state.currentProject === this.props.projectsMe.length - 1)
      this.setState({ currentProject: 0 });
    else this.setState({ currentProject: this.state.currentProject + 1 });
  }

  render() {
    return (
      <div>
        <div>
          <div className="project-header">
            <FormattedMessage id="project.header" />
          </div>
          <div className="project-wrapper">
            <div className="inner">
              <button onClick={() => this.handleLeftClick()}>&#8249;</button>
            </div>
            <div className="inner project-entry">
              <ProjectEntry
                project={
                  this.props.projectsMe &&
                  this.props.projectsMe[this.state.currentProject]
                }
                shouldRender={false}
              />
            </div>
            <div className="inner">
              <button onClick={() => this.handleRightClick()}>&#8250;</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { project } = state;

  return {
    projectsMe: project.projectsMe
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProject: () => dispatch(fetchProject())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWidget);
