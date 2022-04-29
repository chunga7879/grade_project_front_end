import Head from './components/Head';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Courses from './components/Courses';
import Tasks from './components/Tasks';
import Start from './components/Start';


function noAccount() {
    return (
        <div>
            <p>Do Not Have Account? </p>
        </div>
    );
}

function App() {

  return (

    <BrowserRouter>
            <Head />

            <div className="contents">
                <Switch>
                    <Route exact path="/" component={Start} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/courses" component={Courses} />
                    <Route exact path="/courses/:semID" component={Courses} />
                    <Route exact path="/tasks" component={Tasks} />
                    <Route exact path="/tasks/:semID/:courseName" component={Tasks} />

                </Switch>
            </div>

      </BrowserRouter>

);
}

export default App;
