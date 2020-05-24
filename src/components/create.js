import React from 'react'
import { withRouter } from 'react-router-dom';
import firebase from "firebase";

class MainApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total_question: 0,
            eventName: "",
            code: "",
            question: '',
            questions_list: [
            ],
            id: ""
        }
        this.addQuestion = this.addQuestion.bind(this)
        this.doLove = this.doLove.bind(this)
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    async getAll(code) {
        const db = firebase.firestore();
        await db.collection("events")
            .where("secret_code", "==", code).onSnapshot(snapshop => {
                snapshop.docs.map((inform) => {
                    this.setState({
                        total_question: inform.data().total_question,
                        eventName: inform.data().eventName,
                        questions_list: inform.data().questions_list,
                        id: inform.id
                    })
                })
            })
    }

    componentDidMount() {
        try {
            console.log(this.props.location.state.code);
            
            this.setState({
                eventName: this.props.location.state.eventName,
                code: this.props.location.state.code
            })
            this.getAll(this.props.location.state.code)
        } catch{

        }
    }
    componentDidUpdate() {

    }

    async update() {
        const {id, total_question, eventName, questions_list} = this.state
        console.log('==================');
        console.log(total_question);
        
        const db = firebase.firestore();
        let data = await db.collection("events").doc(id).update({
            total_question : total_question,
            eventName: eventName,
            questions_list: questions_list
        })
    }

    compare( a, b ) {
        if ( a.loves < b.loves ){
          return 1;
        }
        if ( a.loves > b.loves ){
          return -1;
        }
        return 0;
      }

    async doLove(e){
        const {id} = this.state
        let base_question_list = this.state.questions_list       
        const ids = e.target.attributes.getNamedItem('id').value
        let is_clicked = e.target.attributes.getNamedItem('is_clicked').value
        let target_q = base_question_list.find(x => x.id == ids.slice(5))
        let index = base_question_list.findIndex(x => x.id == ids.slice(5))
        console.log(target_q);
        

        if (is_clicked == 'false') {
            target_q.loves++;
        } else {
            target_q.loves--;
        }
        base_question_list[index] = target_q
        base_question_list.sort(this.compare)

        const db = firebase.firestore();
        let data = await db.collection("events").doc(id).update({
            questions_list: base_question_list
        })

        this.setState({
            questions_list: base_question_list
        })
        
        let target_heart = document.querySelector(`#${ids}`)
        if (is_clicked == 'false') {
            target_heart.className = 'fa fa-heart h-active'
            target_heart.attributes.getNamedItem('is_clicked').value = "true"

        } else {
            target_heart.className = 'fa fa-heart-o'
            target_heart.attributes.getNamedItem('is_clicked').value = "false"
        }

    }
    async addQuestion(){
        const { question, questions_list, total_question, id } = this.state
        const db = firebase.firestore();
        console.log(total_question);
        
        console.log("before");
        
        let counter = total_question + 1
        console.log(counter, "----");
        
        if (question == '') {
            return null
        }
        let qst = questions_list
        qst.push({
            'id': counter,
            'question': this.state.question,
            'loves': 0
        })
        this.setState({
            total_question: counter,
            questions_list: qst
        })
        let data = await db.collection("events").doc(id).update({
            total_question : counter,
            questions_list: questions_list
        })
        
    }

    render() {
        return (
            <>
                <div class="vertical-center">
                    <div class="container text-left arrow" onClick="">
                        <a href="/"><i class="fa fa-chevron-left text-left" aria-hidden="true" /></a>
                    </div>
                    <div class="container text-left header">
                        <h1>Welcome to<br /><span className="big-title"> {this.state.eventName} </span></h1>
                        <p className="code">Event Code : {this.state.code}</p>
                    </div>

                    {/* Questions zone */}
                    <div className="container text-left" id="question_zone">
                        <p>All Questions {this.state.total_question}</p>
                        <ul class="list-group">
                            {this.state.questions_list.map((qes) => (
                                <li class="list-group-item d-flex justify-content-between align-items-center row">
                                    <p className="col">
                                        {qes.question}
                                    </p>
                                    <div className='btn-group'>
                                        <span class="badge badge-warning badge-pill">{qes.loves}</span>
                                    &ensp; &ensp;
                                    <i class="fa fa-heart-o" que_id={qes.id} id={"heart"+qes.id} is_clicked="false" onClick={e => this.doLove(e)} />
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="container text-left fixed-bottom">
                        <div class="form-group">
                            <input type="text" class="form-control" name="question" id="question" placeholder="Do you have any question?" onChange={this.onChange} />
                        </div>
                        <button type="submit" class="btn btn-outline-warning btn-lg btn-block" onClick={this.addQuestion}>Ask Question</button>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(MainApp)