import React from 'react';
import { ReactComponent as PlusIcon }  from './PlusIcon.svg'
import './App.css';
import './layout.js';


function App() {
    return (
        <div className="App">
            <AppHeader />
            <AppSidebar />
            <AppContent />
        </div>
    );
}



class AppHeader extends React.Component {
    //Create the header
    render() {
        return (
            <header className="app-header" >
                <div className="h-list" >
                    <a href="/">GetBusy Technical Test</a>
                </div>
            </header>
        );

    }

}



class AppContent extends React.Component {
    //Create the main content area
    render() {
        return (
            <div className="app-content">
                <JokeContent/>
            </div>
        );

    }


}

class JokeContent extends React.Component {
    constructor(props) {
        super(props);
        //Initialize the states and bind the events to this.
        this.state = { jokeList: [], currentIndex:0, currentJoke:undefined };
        this.newJokeClick = this.newJokeClick.bind(this);
        this.nextJokeClick = this.nextJokeClick.bind(this);
        this.prevJokeClick = this.prevJokeClick.bind(this);

    }

    componentDidMount() {
        this.getJoke();
    }


    getJoke() {
        //fetch the a random joke form the chucknorris api
        fetch('https://api.chucknorris.io/jokes/random')
            .then(res => res.json())
            .then(j => {

                let joke = j.value;
                let newIndex = this.state.jokeList.length + 1;

                //update the states
                this.setState(state => ({
                    jokeList: state.jokeList.concat(joke)
                    , currentJoke: joke
                    , currentIndex: newIndex
                }));
            });
    }

    render() {
        return (
            <div className="joke-area" >
                <h2>Chuck Norris Jokes</h2>
                <div className="joke" hidden={this.state.currentJoke==undefined} >
                    <span>"</span>
                    <span>{this.state.currentJoke}</span>
                    <span>"</span>
                </div>
                <div className="joke-number" >
                    <span>{this.state.currentIndex}</span>
                    <span>/</span>
                    <span>{this.state.jokeList.length}</span>
                </div>
                <div className="button-group">
                    <button type="button" onClick={this.prevJokeClick} disabled={this.state.jokeList.length == 0 || this.state.currentIndex == 1} >Previous Joke</button>
                    <button type="button" onClick={this.nextJokeClick} disabled={this.state.jokeList.length == 0 || this.state.currentIndex >= this.state.jokeList.length }>Next Joke</button>
                    <button type="button" onClick={this.newJokeClick} >New Random Joke</button>
                </div>
            </div>
        );
    }


    newJokeClick(e) {
        this.getJoke();
    }

    nextJokeClick(e) {
        //Check if we are at the end of the list
        if (this.state.currentIndex >= this.state.jokeList.length) return

        //increment the index and update the state
        let newIndex = this.state.currentIndex + 1;
        this.setState(state => ({
            currentJoke: state.jokeList[newIndex-1]
            , currentIndex: newIndex
        }));


    }

    prevJokeClick(e) {
        //check if we are at the state of the list
        if (this.state.currentIndex == 1) return

        //reduce the index and update the state
        var newIndex = this.state.currentIndex - 1;
        this.setState(state => ({
            currentJoke: state.jokeList[newIndex-1]
            , currentIndex: newIndex
        }));

    }



}


class AppSidebar extends React.Component {
    constructor(props) {
        super(props);
        //setup the open flag and event
        this.state = { open: false };
        this.openClick = this.openClick.bind(this);
    }



    render() {

        //Setup the classes
        let sbClassName = "app-sidebar-content";
        let sbsClassname = "app-sidebar-small";
        let asbClassname = "app-sidebar";

        //Add open the end of the class string
        if (this.state.open) {
            sbClassName += " open";
            sbsClassname += " open";
            asbClassname += " open";
        }

        return (
            <div className={asbClassname}>
                <div className={sbsClassname} ><PlusIcon className="open-sidebar-icon" onClick={this.openClick} /></div>
                <div className={sbClassName}>
                    <h4>Sidebar</h4>
                </div>
            </div>
            );
    }

    openClick(e) {
        //Toggle the open flag
        this.setState(state => ({
            open: !state.open
        }));
    }

}



export default App;
