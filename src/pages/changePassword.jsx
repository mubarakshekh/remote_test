import React from 'react';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';

class changePassword extends React.Component {
  constructor() {
    super()
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className='text-danger'>{message}</div>
    })

    this.state = {
      username: '',
      password: '',
      cnfpassword: '',
      message: '',
      color: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      let existingUsername = JSON.parse(localStorage.getItem(this.state.username))
      if (existingUsername) {
        if (this.state.password === this.state.cnfpassword) {
          existingUsername.password = this.state.password
          localStorage.setItem(this.state.username, JSON.stringify(existingUsername))
          this.setState({
            message: 'Password has been changed successfully',
            color: 'green'
          })
        }
        else {
          this.setState({
            message: 'password does not match',
            color: 'red'
          })
        }
      }
      else {
        this.setState({
          message: 'it is not existing user please register',
          color: 'red'
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
          <h3>Change Password</h3>
          <form action="." onSubmit={this.handleSubmit}>
            <span style= {{color:`${this.state.color}`}}>{this.state.message}</span><br />
            <div className="form-group">
              <input type="text" id='username' className="form-control" name='username' value={this.state.username} onChange={this.setTitle} placeholder='username' />
              {this.validator.message('user name', this.state.username, 'required|alpha')}
            </div>
            <div className="form-group">
              <input type="password" id='password' className="form-control" name='password' value={this.state.password} onChange={this.setTitle} placeholder='password' />
              {this.validator.message('password', this.state.password, 'required|alpha_num_dash')}
            </div>
            <div className="form-group">
              <input type="password" id='cnfpassword' className="form-control" name='cnfpassword' value={this.state.cnfpassword} onChange={this.setTitle} placeholder='confirm password' />
              {this.validator.message('confirm password', this.state.password, 'required|alpha_num_dash')}
            </div>
            <div className="form-group">
              <span><Link to='/'>Back to Login</Link> </span>
              <button style={{ width: '50%' }} type="submit" id='' className="btn btn-success" >Change Password</button>
            </div>
          </form>

        </div>
      </div>
    )
  }
}

export default changePassword