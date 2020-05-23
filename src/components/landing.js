import React from 'react'
import '../style/main.scss'
import { withRouter } from 'react-router-dom';

class Landing extends React.Component {
    constructor(){
        super()
        this.state = {
            eventName : ""
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value,
        });
      };

      handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/event', this.state);
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
                    <form class="form-row">
                        <div class="form-group col">
                            <label for="eventCode" class="sr-only">Room code</label>
                            <input type="text" class="form-control" id="eventCode" placeholder="Room code" />
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
                            <input type="text" class="form-control" name="eventName" maxLength={8} id="eventName" placeholder="Room name" onChange={this.onChange}/>
                        </div>

                            <input type="submit" class="btn btn-outline-warning btn-lg btn-block" value="Create Room"/>
                    </form>
                </div>
            </>
        )
    }
}

export default withRouter(Landing)


