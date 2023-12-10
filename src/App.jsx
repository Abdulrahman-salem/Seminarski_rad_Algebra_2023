import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import CreateNewUser from "./components/CreateNewUser";
import Users from "./Users";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            messages:[]
        };

        this.drone = new window.Scaledrone('N3eLLoftVnR6mNf4', { data: this.state.users } );
        this.room = this.drone.subscribe('Seminarski rad');

        this.drone.on('open', error => {
            if (error) { return console.error(error); }

            this.room.on('open', error => {
                if (error) { return console.error(error); }
                
                console.log('Connected to channel');
            });
        });
    }

    componentDidMount(){
        this.room.on('message', message => message? this.setState( { messages: [...this.state.messages, message.data ] } ) : '')
    }

    shouldComponentUpdate(nextProps, nextState){
        this.room.on('message', message => {
            this.setState( { messages: [...this.state.messages, message.data ] } )
        })

        if (nextState.users !== this.state.users || nextState.messages !== this.state.messages ) {
            return true
        }
        return false
    }

    getName = (name) => {
        const { users } = this.state;

        if (users.length) {
            let userExist = users.find( u => u.toLowerCase() === name.toLowerCase() );

            if (userExist) {
                alert('The username already exists! You cannot create a new user with an existing name');

                return
            }
        }

        if (name !== "") {
            this.setState({
                users: [...users, name ],
            });
        } else alert('The user input value is empty')
    };
    
    getMessages = (message) => {
        if (message.text && message.text !== "") {
            this.drone.publish({
                room: 'Seminarski rad',
                message: message
            });
        }
    };  

    render() {
        const { users,messages } = this.state;

        return (
            <>
                <Routes>
                    <Route 
                        path="/" 
                        element={ <Users users={users} /> } 
                    />

                    <Route
                        path="/ChatUsers/:user"
                        element={
                            <Chat
                                users={users}
                                onSubmit={this.getMessages}
                                messages={messages}
                            />
                        }
                    />

                    <Route
                        path="/CreateNewUser"
                        element={ <CreateNewUser onSubmit={this.getName} /> }
                    />
                </Routes>
            </>
        );
    }
}

export default App;
