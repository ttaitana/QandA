import React from 'react'
import '../style/main.scss'
import { withRouter } from 'react-router-dom';
import firebase from "firebase";

class Landing extends React.Component {
    constructor() {
        super()
        this.state = {
            eventName: "",
            code: ''
        }
        this.handleJoin = this.handleJoin.bind(this)
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { eventName } = this.state
        const db = firebase.firestore();
        let ref = db.collection("events").doc();
        let myId = ref.id;
        this.setState({
            code: myId.slice(-5).toLowerCase()
        })
        db.collection("events")
            .doc(myId)
            .set({
                eventName: eventName,
                secret_code: myId.slice(-5).toLowerCase(),
                total_question: 0,
                questions_list: []
            }). then(() => {

                this.props.history.push('/event', this.state);
            })
    }

    async handleJoin(e){
        let code = this.state.code.toLowerCase()
        e.preventDefault();
        const db = firebase.firestore();
        let data = await db.collection("events")
            .where("secret_code", "==", code).get()
            console.log(data);
        if(data.size == 0){
            alert("Incorrect room code")
        }else{
            this.props.history.push('/event', this.state);
        }
    } 

    render() {  
        return (
            <>
                <div class="vertical-center ">
                    <div class="container text-left header">
                        <h1>Welcome to<br /><span className="big-title"> Q&A </span></h1>
                    </div>
                </div>
                <div className="container controller">
                    <p className="text-left quote">Enter exist room with secret code</p>
                    <form class="form-row" onSubmit={this.handleJoin.bind(this)}>
                        <div class="form-group col">
                            <label for="eventCode" class="sr-only">Room code</label>
                            <input type="text" class="form-control" name="code" id="eventCode" placeholder="Room code" onChange={this.onChange}/>
                        </div>
                        <div className="col-4">
                            <button type="submit" class="btn btn-primary mb-2">Enter room</button>
                        </div>
                    </form>
                    <hr />
                    <p className="text-left quote">Create your own room (only 8 letters)</p>
                    <form class="form" onSubmit={this.handleSubmit.bind(this)}>
                        <div class="form-group">
                            <label for="eventName" class="sr-only">Room code</label>
                            <input type="text" class="form-control" name="eventName" maxLength={8} id="eventName" placeholder="Room name" onChange={this.onChange} />
                        </div>

                        <input type="submit" class="btn btn-outline-warning btn-lg btn-block" value="Create Room" />
                    </form>
                </div>
            </>
        )
    }
}

export default withRouter(Landing)


