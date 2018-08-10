// @flow
import React, { Component } from 'react';
import { apiFetch } from '../../helper';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import flatMap from 'lodash/flatMap';
import TimeEntries from './entries';

type Props = {
  dispatch: Dispatch
};

type State = {
  uploadStatus: boolean,
  projectAssignments: any,
  selectedProjectId: any,
  selectedTaskId: any,
  entries: Array<any>,
  createdEntries: Array<any>
};

class FileUpload extends Component<Props, State> {
  handleUpload: Function;
  handleOnChange: Function;
  handleOnClick: Function;
  uploadInput: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      uploadStatus: false,
      projectAssignments: [],
      // which project id is currently selected
      selectedProjectId: 0,
      selectedTaskId: 0,
      // the parsed time entries
      entries: [],
      // created Entries
      createdEntries: []
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    apiFetch('/time/projects/me')
      .then(data => {
        if (data) {
          this.setState({
            projectAssignments: data,
            // the selected project will be the first one
            selectedProjectId: data[0].project.id,
            selectedTaskId: data[0].taskAssignments[0].taskReference.id
          });
          console.groupCollapsed('Loaded projectAssignment');
          data.map(it => console.dir(it));
          console.groupEnd();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUpload(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('project_id', this.state.selectedProjectId);
    data.append('task_id', this.state.selectedTaskId);

    apiFetch('/time/upload/swisscard', {
      method: 'POST',
      body: data
    })
      .then(json => {
        console.dir(json);
        // TODO sort by date
        this.setState({ entries: json });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { projectAssignments } = this.state;

    const selectedAssignments = projectAssignments.filter(
      projectAssignment =>
        projectAssignment.project.id === this.state.selectedProjectId
    );

    const tasks = flatMap(
      selectedAssignments,
      project => project.taskAssignments
    );

    return (
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input
              name="file"
              className="form-control"
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
              onChange={this.handleOnChange}
            />
          </div>

          <div>
            Project:
            <select name="project" onChange={this.handleOnChange}>
              {projectAssignments.map(projectAssignment => {
                const p = projectAssignment;
                return (
                  <option key={p.project.id} value={p.project.id.toString()}>
                    {p.project.name.toString()}
                  </option>
                );
              })}
            </select>
          </div>

          {/*TODO depend on select project to show tasks*/}
          <div>
            Task:
            <select name="task" onChange={this.handleOnChange}>
              {tasks.map(({ taskReference }) => {
                return (
                  <option
                    key={taskReference.id}
                    value={taskReference.id.toString()}
                  >
                    {taskReference.name.toString()}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn btn-success">Upload</button>
        </form>

        <TimeEntries title={'Parsed Entries'} entries={this.state.entries}>
          <br />
          Are you sure you want to create the entries above?
          <button onClick={this.handleOnClick}>
            Create {this.state.entries.length} entries
          </button>
        </TimeEntries>

        <TimeEntries
          title={'Created Entries'}
          entries={this.state.createdEntries}
        />
      </div>
    );
  }

  handleOnChange(event) {
    const value = parseInt(event.target.value, 10);
    switch (event.target.name) {
      case 'task':
        console.log('Selected taskid ' + value);
        this.setState({ selectedTaskId: value });
        break;
      case 'project':
        console.log('Selected projectid ' + value);
        const taskId = this.state.projectAssignments.find(
          it => it.project.id === value
        ).taskAssignments[0].taskReference.id;
        this.setState({
          selectedProjectId: value,
          selectedTaskId: taskId
        });
        break;
      case 'file':
        const file = event.target.files[0];
        console.log(
          'Selected file ' +
            file.name +
            ' of type ' +
            file.type +
            ' of size ' +
            file.size +
            ' bytes'
        );
        // reset previous state
        this.setState({ entries: [], createdEntries: [] });
        break;
      default:
        console.error('unexpected change event ' + event.target.name);
    }
  }

  handleOnClick(event) {
    event.preventDefault();

    const { dispatch } = this.props;

    apiFetch('/time/entry', {
      method: 'POST',
      body: JSON.stringify(this.state.entries),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(json => {
        this.setState({ createdEntries: json });
        console.dir(json);
      })
      .catch(function(error) {
        if (error.status === 403) {
          dispatch(push('/loginoauth'));
        }
        console.log(error);
      });
    this.uploadInput.value = null;
  }
}

export default connect()(FileUpload);
