
import React, { useContext, useEffect, useRef, useState } from 'react';
import courseContext from '../context/course/courseContext';
import alertContext from '../context/alert/alertContext';

export default function AttemptQuiz(props) {
    const closeRef = useRef(null);
    const context = useContext(courseContext);
    const { quiz, getQuiz, attemptQuiz } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    const { quizId } = props;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        getQuiz(quizId);
    }, [quizId]);

    useEffect(() => {
        if (quiz && quiz.questions) {
            const initialAnswers = {};
            quiz.questions.forEach((question) => {
                initialAnswers[question._id] = "";
            });
            setAnswers(initialAnswers);
        }
    }, [quiz]);

    const handleSubmit = async () => {
       console.log(answers)
        const response = await attemptQuiz(quizId, answers);
        closeRef.current.click();
        showAlert(response, "success");
        const initialAnswers = {};
        quiz.questions.forEach((question) => {
            initialAnswers[question._id] = "";
        });
        setAnswers(initialAnswers);

    }

    const handleToggle = (e, questionId, optionId) => {
        if (e.target.checked) {
            setAnswers({
                ...answers,
                [questionId]: optionId
            });
        }
    }

    return (
        <div>
            <div className="modal-body">
                {quiz ? (
                    <div>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{quiz.topic} Quiz</h5>
                            <h5 className="modal-title mx-3" id="exampleModalLabel"> Max Marks: {quiz.totalMarks}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {quiz.questions.map((question, questionIndex) => (
                            <div key={questionIndex}>
                                <h6 className="form-label">Question {questionIndex + 1}</h6>
                                <div className="form-label"> Weightage: {question.marks} marks</div>
                                <label className="form-label"> {question.text}</label>
                                {question.options.map((option, optionIndex) => (
                                    <div className="form-check" key={optionIndex}>
                                        <label>{option.text}</label>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            checked={answers[question._id] === option._id}
                                            onChange={(e) => handleToggle(e, question._id, option._id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

