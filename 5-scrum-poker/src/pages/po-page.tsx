import * as React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {ISessionDb} from "../api/interfaces";
import {ApiService} from "../api";
import {Button, Segment, Form, Tab} from "semantic-ui-react";

import "./po-page.scss";
import Estimations from '../components/estimations';

interface IEstimationForm {
  estimation_name: string;
  estimation_description: string;
}

export interface IPoPageProps extends RouteComponentProps {}

export interface IPoPageState {
  session?: PouchDB.Core.Document<ISessionDb> & PouchDB.Core.GetMeta;
  estimationForm?: Partial<IEstimationForm>;
}

class PoPage extends React.Component<IPoPageProps, IPoPageState> {
  readonly api: ApiService = ApiService.Instance;
  sessionId: string | null;

  constructor(props: IPoPageProps) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);
    this.sessionId = params.get("id");
    this.state = {};
  }

  componentDidMount() {
    if (this.sessionId) {
      this.getSession();
      this.api.onChange(this.getSession);
    } else {
      // redirect him
    }
  }

  getSession = () => {
    this.api.getSession(this.sessionId!).then((session) => {
      this.setState({session: session});
    });
  };

  onEstimationFormInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const estimationForm = {
      ...this.state.estimationForm,
      ...{[event.currentTarget.name]: event.currentTarget.value},
    };

    this.setState({estimationForm});
  };

  onEstimationFormSubmit = (form?: Partial<IEstimationForm>) => {
    if (form && form.estimation_name) {
      this.api.createNewEstimation(this.state.session!, {
        name: form.estimation_name,
        description: form.estimation_description,
        timestamp: new Date().getTime(),
        isActive: false,
        isEnded: false,
        votes: {}
      });
    }
  };

  // tbd
  onButtonClick = () => {
    this.api.update({
      _id: this.state.session?._id,
      _rev: this.state.session?._rev,
    });
  };

  panes = [
    {menuItem: "Tab 1", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>},
    {menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>},
    {menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>},
  ];





  // TabExampleVerticalTabularRight = () => {

  //   const estimations = this.state.session?.estimations;

  //   // const estimationPanes =  Object.keys(this.state.session?.estimations
  //   return (<Tab
  //     menu={fluid: true, vertical: true, tabular: "right"}
  //     panes={this.state.session?.estimations}
  //   />)
  //   };

  public render() {
    return (
      <div id="po-page">
        <Segment.Group>
          <Segment size="big">
            Session name: {this.state.session?.session_name}
          </Segment>
          <Segment>
            <Form
              onSubmit={(event) => {
                this.onEstimationFormSubmit(this.state.estimationForm);
              }}
            >
              <Form.Field>
                <input
                  name="estimation_name"
                  placeholder="Estimation Name"
                  onChange={this.onEstimationFormInputChange}
                  value={this.state.estimationForm?.estimation_name}
                />
              </Form.Field>
              <Form.Field>
                <input
                  name="estimation_description"
                  placeholder="Estimation Description"
                  onChange={this.onEstimationFormInputChange}
                  value={this.state.estimationForm?.estimation_description}
                />
              </Form.Field>
              <Button floated="right" type="submit">
                New
              </Button>
            </Form>
          </Segment>
        </Segment.Group>
        <Segment.Group className="estimation-container">
          <Segment>
            {this.state.session?.estimations && (
              <Estimations rev={this.state.session._rev} id={this.state.session._id} estimations={this.state.session?.estimations}></Estimations>
            )}           
          </Segment>
        </Segment.Group>

        <div>
          <h1>PO WORKS!!! {this.sessionId}</h1>

          <br />

          {JSON.stringify(this.state.session)}

          <Button type="submit" primary onClick={this.onButtonClick}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(PoPage);
