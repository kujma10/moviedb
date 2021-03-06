import React from 'react'
import { Route } from 'react-router-dom'
import AppContent from './components/AppContent'
import SearchMovies from './containers/SearchMoviesContainer'
import Login from './containers/LoginContainer'
import Logout from './components/Logout'
import { Link } from 'react-router-dom'
import { isLoggedIn } from './helpers/Auth'
import Modal from 'react-responsive-modal'
import CreateMovieForm from './containers/CreateMovieFormContainer'
import MetaTags from 'react-meta-tags';

class App extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const loginLink = (<Link className="btn btn-primary" to='/login'>Log In</Link>);
    const logOutLink = (<Link className="btn btn-danger" to='/logout'>Log Out</Link>);
    const addMovieBtn = (
      <button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.onOpenModal} >
        Add Movie
      </button>
    );

    return (
      <div>
        <MetaTags>
          <title>MovieDB</title>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1" />
        </MetaTags>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a href="/" className="navbar-brand">MovieDB</a>
          <SearchMovies />
          {isLoggedIn() ? addMovieBtn  : null}
          <Modal open={this.state.open} onClose={this.onCloseModal} little>
            <CreateMovieForm closeModal={this.onCloseModal}/>
          </Modal>
          <ul className="nav navbar-nav navbar-right">
            <li>
              {isLoggedIn() ? logOutLink : loginLink}
            </li>
          </ul>
        </nav>

        <main>
          <Route exact path="/" component={AppContent} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </main>
      </div>
    )
  }
}

export default App
