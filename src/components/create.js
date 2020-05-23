import React from 'react'
import { withRouter } from 'react-router-dom';

class MainApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total_question: 3,
            event_name: "",
            code: "asd123",
            question: '',
            questions_list: [
                {
                    'id': 1,
                    'question': 'Do you ever think about buy a new car?',
                    'loves': 2
                },
                {
                    'id': 2,
                    'question': 'How did you handle your feeling?',
                    'loves': 10
                },
                {
                    'id': 3,
                    'question': 'How did you handle your feeling?',
                    'loves': 10
                }
            ]
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        try {
            this.setState({
                event_name: this.props.location.state.eventName
            })
        } catch{

        }
    }
    componentDidUpdate() {

    }

    doLove = (e) => {
        let base_question_list = this.state.questions_list
        const id = e.target.attributes.getNamedItem('que_id').value
        let is_clicked = e.target.attributes.getNamedItem('is_clicked').value
        let target_q = base_question_list.find(x => x.id == id)
        let index = base_question_list.findIndex(x => x.id == id)


        if (is_clicked == 'false') {
            e.target.className = 'fa fa-heart h-active'
            e.target.attributes.getNamedItem('is_clicked').value = "true"
            target_q.loves++;

        } else {
            e.target.className = 'fa fa-heart-o'
            e.target.attributes.getNamedItem('is_clicked').value = "false"
            target_q.loves--;
        }
        base_question_list[index] = target_q

        this.setState({
            questions_list: base_question_list
        })

    }
    addQuestion = (e) => {
        const { question, questions_list, total_question } = this.state

        let qst = this.state.questions_list
        qst.push({
            'id': total_question + 1,
            'question': this.state.question,
            'loves': 0
        })
        this.setState({
            total_question: total_question + 1,
            questions_list: qst
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
                        <h1>Welcome to<br /><span className="big-title"> {this.state.event_name} </span></h1>
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
                                    <i class="fa fa-heart-o" que_id={qes.id} is_clicked="false" onClick={e => this.doLove(e)} />
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