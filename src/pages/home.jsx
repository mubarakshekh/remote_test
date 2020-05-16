import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props)

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
     localStorage.setItem( 'loggedInuser', '' )
      this.props.history.push('/login')
    }




  }

  editData = () => {
    this.props.history.push(`/editData/${this.state.username}`)
  }
  logout = () => {
    localStorage.setItem( 'loggedInuser', '' )
    this.props.history.push('/')
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

    const label_style = {
      color: 'green',
      fontWeight: 'bold'

    }


    return (
      <div>
        <div style={form_style}>

          <h3>Welcome, {this.state.name}</h3>
          <div className="form-group">
            <label htmlFor='name' style={label_style} className="form-label">
              Name:
            </label>
            <span>
              {this.state.name}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor='contactNumber' style={label_style} className="form-label">
              Contact Number:
            </label>
            <span>
              {this.state.contactNumber}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor='email' style={label_style} className="form-label">
              Email:
            </label>
            <span>
              {this.state.email}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor='username' style={label_style} className="form-label">
              Username:
            </label>
            <span>
              {this.state.username}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor='password' style={label_style} className="form-label">
              Password:
            </label>
            <span>
              {this.state.password}
            </span>
          </div>
          <div>
            <button style={{ width: '50%' }} id='' className="btn btn-danger" onClick={this.logout} >Logout</button>
            <button style={{ width: '50%' }} id='' className="btn btn-info" onClick={this.editData}>Edit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home