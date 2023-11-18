import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorsForBackgroundColors = [
  'yellow',
  'green',
  'orange',
  'blue',
  'brown',
  'lightgreen',
]

class App extends Component {
  state = {
    passwordList: [],
    isShowPassword: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isPasswordsPresent: true,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShowPassword: true})
    } else {
      this.setState({isShowPassword: false})
    }
  }

  onClickAddPassword = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()

    const classValue = colorsForBackgroundColors[Math.floor(Math.random() * 6)]

    const newUserList = {
      id: v4(),
      initialValue: initial,
      websiteName: websiteInput,
      userName: usernameInput,
      password: passwordInput,
      classAndValue: classValue,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newUserList],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      isPasswordsPresent: true,
      searchInput: '',
    }))
  }

  deleteUserDetails = id => {
    const {passwordList} = this.state
    const newList = passwordList.filter(eachList => eachList.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordList: newList, isPasswordsPresent: caseOf})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordList,
      isShowPassword,
      searchInput,
    } = this.state
    let {isPasswordsPresent} = this.state
    const newList = passwordList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isPasswordsPresent = false
    } else {
      isPasswordsPresent = true
    }

    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-manager-container">
          <form
            className="password-input-card"
            onSubmit={this.onClickAddPassword}
          >
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                className="input-logos"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={websiteInput}
                className="input"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                className="input-logos"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={usernameInput}
                className="input"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                className="input-logos"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={passwordInput}
                className="input"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="btn">
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        {/* ---------------- */}
        <div className="your-password-container">
          <div className="password-count-and-search">
            <div className="password-count-container">
              <h1 className="password-counts">Your Passwords</h1>
              <p className="password-counts cc">{newList.length}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-logos"
              />
              <input
                type="search"
                placeholder="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              className="check"
              type="checkbox"
              id="checkPassword"
              onChange={this.showPassword}
              value={searchInput}
            />
            <label htmlFor="checkPassword" className="show-password">
              Show passwords
            </label>
          </div>
          {!isPasswordsPresent && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
              <p className="no-passwords-desc">No Passwords</p>
            </div>
          )}
          {isPasswordsPresent && (
            <ul className="ul-password-list">
              {newList.map(eachValue => (
                <li
                  id={eachValue.id}
                  key={eachValue.id}
                  className="password-list"
                >
                  <div className="passwords-data">
                    <div className="initial-and-website">
                      <p className={`initial ${eachValue.classAndValue}`}>
                        {eachValue.initialValue}
                      </p>
                      <div className="user-details">
                        <p className="user-desc">{eachValue.websiteName}</p>
                        <p className="user-desc">{eachValue.userName}</p>
                        {!isShowPassword && (
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            className="star-img"
                            alt="stars"
                          />
                        )}
                        {isShowPassword && (
                          <p className="user-star-password">
                            {eachValue.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => this.deleteUserDetails(eachValue.id)}
                      className="btn"
                      type="button"
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                        alt="delete"
                        className="delete-btn-img"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
