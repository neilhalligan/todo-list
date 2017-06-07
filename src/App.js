import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Todo = ({todo, remove}) => {
  return (<li onClick={() => {remove(todo.id)}}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<ul>{todoNode}</ul>);
}

const Title = () => {
  return (
    <div>
      <div>
        <h1>to-do</h1>
      </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  let input;

  return (
    <div>
      <input ref={(node) => {
        input = node;
      }} />
        {input}
      <button onClick={() => {
        addTodo(input.value);
        input = '';
      }}>
        +
      </button>
    </div>
  );
}

window.id = 0;
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl = 'https://5937fa696643ae00116ba472.mockapi.io/api/todos'
    this.apiUrlDelete = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }

  componentDidMount() {
    axios.get(this.apiUrlDelete)
      .then((res) => {
      this.setState({data: res.data});
      });
  }

  addTodo(val) {
    const todo = {text: val, id: window.id++}
    axios.post(this.apiUrlDelete, todo)
      .then((res) => {
        this.state.data.push(todo);
        this.setState({data: this.state.data});
      });
  }

  handleRemove(id) {
    const remainder = this.state.data.filter((todo) => {
        if (todo.id !== id) return todo;
    });
    axios.delete(this.apiUrlDelete + '/' + id)
      .then((res) => {
        this.setState({data: remainder});
      });
  }

  render() {
    return (
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

// ReactDOM.render(<TodoApp />, app);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
