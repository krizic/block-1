import React from "react";

interface IStartPageProps {
  name: string;
}

interface IStartPageState {
  lname: string;
  lname1: string;
  lname2: string;
}

export class StartPage extends React.Component<
  IStartPageProps,
  IStartPageState
> {

  state = {
    lname: "Waiting for input",
    lname1: "Waiting for input",
    lname2: "Waiting for input",
  };

  componentDidMount(){
      console.log("MOUNTED");
      this.setState({lname1: `Mounted at ${(new Date).toLocaleTimeString()}`})
  }

  onLNameChange = (e: any) => {
      console.log(e.currentTarget.value);
      this.setState({lname: e.currentTarget.value})
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <input type="text" onChange={this.onLNameChange}/>
    <p>{this.state.lname}</p>
    <p>{this.state.lname1}</p>
    <p>{this.state.lname2}</p>
      </div>
    );
  }
}
