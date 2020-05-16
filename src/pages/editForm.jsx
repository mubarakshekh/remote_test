import React from 'react';
import SimpleReactValidator from 'simple-react-validator';

class editData extends React.Component {

  constructor() {
    super()

    this.validator = new SimpleReactValidator({

      element: (message, className) => <div className='text-danger'>{message}</div>
    }
    )


    this.state = {
      name: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',


    }

  }
  componentDidMount = () => {
    console.log(this.props)
    const data = JSON.parse(localStorage.getItem(this.props.match.params.username))
    const isloggedIn = localStorage.getItem('loggedInuser')
    console.log(data)
    if (data && isloggedIn && data.username === isloggedIn) {

      this.setState({
        name: data.name,
        contactNumber: data.contactNumber,
        email: data.email,
        username: data.username,
        password: data.password,

      })
    }
    else {
      localStorage.setItem('loggedInuser', '')
      this.props.history.push('/login')
    }

  }

  saveData = (e) => {
    e.preventDefault()

    if (this.validator.allValid()) {
      const userData = {
        'name': this.state.name,
        'contactNumber': this.state.contactNumber,
        'email': this.state.email,
        'username': this.state.username,
        'password': this.state.password,
      }
      if (this.state.username != this.props.match.params.username) {
        localStorage.removeItem(this.props.match.params.username)
        localStorage.setItem('loggedInuser', this.state.username )
      }
      localStorage.setItem(this.state.username, JSON.stringify(userData))
      this.props.history.push(`/editData/${this.state.username}`)
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();

    }
  }
  setTitle = (e) => {
    this.setState({ [e.target.name]: e.target.value })

  }

  responseGoogle = (response) => {
    console.log(response.accessToken)
    localStorage.setItem('token', response.accessToken)
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

    if (this.state.isLoggedIn) {
      this.props.history.push('/home')
    }



    return (
      <div>
        <div style={form_style}>
          <h3>Edit Detail:</h3>
          <form action="." onSubmit={this.saveData}>
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
              {this.validator.message('contact Number', this.state.contactNumber, 'required|numeric')}
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
              {this.validator.message('user name', this.state.username, 'required|alpha')}
            </div>

            <div className="form-group">
              <label htmlFor='password' className="form-label">
                Password
            </label>
              <input type="password" id='name' className="form-control" name='password' value={this.state.password} onChange={this.setTitle} placeholder='password' />
              {this.validator.message('user name', this.state.password, 'required|alpha_num_dash')}
            </div>

            <div className="form-group">
              <button style={{ width: '50%' }}  id='' className="btn btn-danger" onClick={() => this.props.history.push(`/home/${this.state.username}`)} >Back</button>
              <button style={{ width: '50%' }} type="submit" id='' className="btn btn-success" >Save</button>
            </div>
          </form>
        </div>
      </div>
    )

  }
}

export default editData