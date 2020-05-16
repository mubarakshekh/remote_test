import React from 'react';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';

class login extends React.Component {
  constructor() {
    super()
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className='text-danger'>{message}</div>
    })
    localStorage.removeItem('loggedInuser')
    this.state = {
      username: '',
      password: '',
      serverError: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      let existingUsername = JSON.parse(localStorage.getItem(this.state.username))
      if (existingUsername && existingUsername.password === this.state.password) {
        localStorage.setItem('loggedInuser', this.state.username)
        this.props.history.push(`/home/${this.state.username}`)
      }

      else {
        this.setState({
          serverError: 'it is not existing user please register'
        })
      }
    }

    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  setTitle = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    const form_style = {
      width: '500px',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%,-50%)',
    }
    return (
      <div>
        <div style={form_style}>
          <h3>Login</h3>
          <form action="." onSubmit={this.handleSubmit}>
            <span style={{ color: 'red' }}>{this.state.serverError}</span>
            <div className="form-group">
              <input type="text" id='username' className="form-control" name='username' value={this.state.username} onChange={this.setTitle} placeholder='username' />
              {this.validator.message('user name', this.state.username, 'required|alpha')}
            </div>
            <div className="form-group">
              <input type="password" id='password' className="form-control" name='password' value={this.state.password} onChange={this.setTitle} placeholder='password' />
              {this.validator.message('password', this.state.password, 'required|alpha_num_dash')}
            </div>
            <div className="form-group">
              <button style={{ width: '100%' }} type="submit" id='' className="btn btn-success" >Login</button>
            </div>
          </form>
          <span>New User <Link to='/register'>Register Here</Link> </span><br />
          <span>Forget Password? <Link to='/changePassword'>Click Here</Link> </span>
        </div>
      </div>
    )
  }
}

export default login