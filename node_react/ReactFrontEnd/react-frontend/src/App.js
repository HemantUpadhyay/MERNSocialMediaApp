import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './MainRouter'
const Apps = () => {
    return <BrowserRouter>
      <MainRouter/>
    </BrowserRouter>
}

export default Apps;


/**
 * Basic Of React Like Form Button-click data binding looping etc
 * 
 * 
 class App extends Component {
  constructor(props){
    super(props);
    //State
    this.state={
      users:[],
      loading:false
    };
    //bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers(){
    this.setState({loading:true});
    Axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: [...this.state.users, ...response.data.results],
      loading:false
    })
    );
  }

  handleSubmit(e){
    e.preventDefault();
    this.getUsers();
    console.log('More users loaded')
  }

  componentWillMount(){
    this.getUsers();
  }

  render(){
    const {Loading, users} = this.state
    return <div className="App">
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="load users"/>
      </form>
      <hr/>
      {!Loading ? users.map((user) => (
        <div key={user.id.value}>
          <h3 style={{color:'red'}}>{user.name.first}</h3>
          <p>{user.email}</p>
          <hr/>
          
        </div>
        )) : (
        <Loading message="Hey it's loading"/>
        )}
    </div>
  }
}

export default App;

*/