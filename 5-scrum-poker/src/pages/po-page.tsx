import * as React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {ISessionDb} from "../api/interfaces";
import {ApiService} from "../api";
import {Button} from "semantic-ui-react";

export interface IPoPageProps extends RouteComponentProps {}

export interface IPoPageState {
  session?: PouchDB.Core.Document<ISessionDb> & PouchDB.Core.GetMeta;
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
  }

  onButtonClick = () => {
    this.api.update({
      _id: this.state.session?._id,
      _rev: this.state.session?._rev,
    });
  };

  public render() {
    return (
      <div>
        <h1>PO WORKS!!! {this.sessionId}</h1>

        <br />

        {JSON.stringify(this.state.session)}

        <Button type="submit" primary onClick={this.onButtonClick}>
          Submit
        </Button>
      </div>
    );
  }
}

export default withRouter(PoPage);
