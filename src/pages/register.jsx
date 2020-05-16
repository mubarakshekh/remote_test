import React from 'react';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';

class Register extends React.Component {
  constructor() {
    super()
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className='text-danger'>{message}</div>
    })

    this.state = {
      name: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      error_user: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      const exusername = JSON.parse(localStorage.getItem(this.state.username))
      if (exusername) {
        this.setState({
          error_user: 'username exist'
        })
      }
      else {
        const userData = {
          'name': this.state.name,
          'contactNumber': this.state.contactNumber,
          'email': this.state.email,
          'username': this.state.username,
          'password': this.state.password,
        }
        this.props.history.push('/login')
        localStorage.setItem(this.state.username, JSON.stringify(userData))
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
          <h3>Register</h3>
          <span>{this.state.error_user}</span>
          <form action="." onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor='name' className="form-label">
                Name
            </label>
              <input type="text" id='name' className="form-control" name='name' value={this.state.name} onChange={this.setTitle} placeholder='name' />
              {this.validator.message('user name', this.state.name, 'required|alpha')}
            </div>

            <div className="form-group">
              <label htmlFor='contactNumber' className="form-label">
                Contact Number
            </label>
              <input type="text" id='contactNumber' className="form-control" name='contactNumber' value={this.state.contactNumber} onChange={this.setTitle} placeholder='contact umber' />
              {this.validator.message('contact Number', this.state.contactNumber, 'required|numeric|min:10')}
            </div>

            <div className="form-group">
              <label htmlFor='email' className="form-label">
                Email
            </label>
              <input type="text" id='email' className="form-control" name='email' value={this.state.email} onChange={this.setTitle} placeholder='email' />
              {this.validator.message('email', this.state.email, 'required|email')}
            </div>

            <div className="form-group">
              <label htmlFor='username' className="form-label">
                Username
            </label>
              <input type="text" id='username' className="form-control" name='username' value={this.state.username} onChange={this.setTitle} placeholder='username' />
              {this.validator.message('user name', this.state.username, 'required|alpha|min:5')}
            </div>

            <div className="form-group">
              <label htmlFor='password' className="form-label">
                Password
            </label>
              <input type="password" id='name' className="form-control" name='password' value={this.state.password} onChange={this.setTitle} placeholder='password' />
              {this.validator.message('user name', this.state.password, 'required|alpha_num_dash')}
            </div>

            <div className="form-group">
              <button style={{ width: '100%' }} type="submit" id='' className="btn btn-success" >Register</button>
            </div>
          </form>
          <span>Existing User <Link to='/login'>Login Here</Link> </span>
        </div>
      </div>
    )

  }
}

export default Register