// @flow
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Percentage from '../../shared_components/percentage';

type Props = {
  project: HarvestProject,
  shouldRender: boolean
};

class ProjectEntry extends Component<Props> {
  componentWillMount() {
    const { shouldRender } = this.props;
    if (shouldRender) {
      require('./projectEntry.css');
    } else {
      require('./projectEntry_profile.css');
    }
  }
  render() {
    const { project } = this.props;
    return (
      <div className="wrapper-card">
        <Card className="card">
          <CardHeader
            className="card-header"
            title={
              <Typography className="project_name" component="h2">
                {project
                  ? project.project.name.toUpperCase() + '   DDD XXXXX '
                  : ''}
              </Typography>
            }
            subheader={
              <Typography className="category">
                Category: <span className="categoryValue">Internal</span>
              </Typography>
            }
            avatar={
              <Avatar aria-label="Recipe" className="company-image-card">
                <img
                  className="company-image-card"
                  src="../../favicon-96x96.png"
                  alt="company"
                />
              </Avatar>
            }
          />

          <CardContent className="card-content">
            <Typography className="description" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>

            <div className="team-comtainer">
              <Typography className="team-label">Team:</Typography>
              <img
                className="team-avatar"
                src="../../favicon-96x96.png"
                alt="todo: name of the team member"
              />
              <img
                className="team-avatar"
                src="../../favicon-96x96.png"
                alt="todo: name of the team member"
              />
              <img
                className="team-avatar"
                src="../../favicon-96x96.png"
                alt="todo: name of the team member"
              />
            </div>

            <div className="status-container">
              <Typography className="status-label"> Status: </Typography>
              <LinearProgress
                className="status-bar"
                color="primary"
                variant="determinate"
                value={77}
              />
              <span className="status-value">77%</span>
            </div>
            <div className="working">
              <div className="worksOn">
                <Typography className="worksOn">Nevena works on:</Typography>
              </div>
              <br />
              <div>
                <Percentage percentage="20" part="Back-end">
                  {' '}
                </Percentage>
              </div>
              <br />
              <div>
                <Percentage percentage="80" part="Front-end">
                  {' '}
                </Percentage>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ProjectEntry;
