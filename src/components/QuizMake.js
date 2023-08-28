import React, { useContext, useRef, useState } from 'react'
import courseContext from '../context/course/courseContext';
import alertContext from '../context/alert/alertContext';

export default function QuizMake(props) {
    const { courseId } = props;
    const closeRef = useRef(null);
    const context = useContext(courseContext);
    const { uploadQuiz } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    const [quizContent, setQuizContent] = useState({
        "topic": "",
        "questions": [
            {
                "text": "",
                "options": [
                    { "text": "", isCorrect: false },
                    { "text": "", isCorrect: false },
                    { "text": "", isCorrect: false },
                    { "text": "", isCorrect: false },
                ],
                "marks": 0,
            }
        ]

    });

    const handleAddQuestion = () => {
        setQuizContent(prevContent => ({
            ...prevContent, questions: [
                ...prevContent.questions, {
                    "text": "",
                    "options": [
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                    ],
                    "marks": 0,
                }
            ]
        }))
    }
    const closeHandle = () => {
        setQuizContent({
            "topic": "",
            "questions": [
                {
                    "text": "",
                    "options": [
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                    ],
                    "marks": 0,
                }
            ]

        })
    }
    const onChange = (e, questionIndex, optionIndex) => {
        if (e.target.name.startsWith(`questions[${questionIndex}]option[${optionIndex}]`)) {
            setQuizContent(prevContent => {
                const updatedQuestions = [...prevContent.questions];
                updatedQuestions[questionIndex].options[optionIndex].text = e.target.value;

                return {
                    ...prevContent,
                    questions: updatedQuestions
                };
            });



        }
        else if (e.target.name.startsWith(`questions[${questionIndex}]`)) {
            setQuizContent(prevContent => {
                const updatedQuestions = [...prevContent.questions];
                updatedQuestions[questionIndex].text = e.target.value;

                return {
                    ...prevContent,
                    questions: updatedQuestions
                };
            });
        }

        else {
            setQuizContent({ ...quizContent, [e.target.name]: e.target.value });
        }
    }
    const onChangeMarks = (e, index) => {
        const newMarks = parseFloat(e.target.value)
        setQuizContent(prevContent => {
            const updatedQuestions = [...prevContent.questions];
            updatedQuestions[index].marks = newMarks;

            return {
                ...prevContent,
                questions: updatedQuestions
            };
        });

    }

    const handleToggle = (questionIndex, optionIndex, e) => {
        setQuizContent(prevContent => {
            const updatedQuestions = [...prevContent.questions];

            // Clear the isCorrect flag for all options in the same question
            updatedQuestions[questionIndex].options.forEach((option, index) => {
                option.isCorrect = index === optionIndex ? e.target.checked : false;
            });

            return {
                ...prevContent,
                questions: updatedQuestions
            };
        });
    };

    const handleUpload = async (courseId) => {
        console.log(courseId)
        const response = await uploadQuiz(courseId, quizContent);
        closeRef.current.click();
        showAlert(response, "success");
        setQuizContent({
            "topic": "",
            "questions": [
                {
                    "text": "",
                    "options": [
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                        { "text": "", isCorrect: false },
                    ],
                    "marks": 0,
                }
            ]

        })

    }


    return (
        <div>


            <div className="mb-3">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label" >Topic Of Quiz</label>
                    <input className="form-control" name="topic" onChange={onChange} value={quizContent.topic} />
                </div>
                {quizContent.questions.map((question, index) => (
                    <div key={index}>
                        <label className="form-label" >Question {index + 1}</label>
                        <input className="form-control" name={`questions[${index}]`} value={question.text} onChange={(e) => onChange(e, index)} />
                        <label className='my-1'>Options</label>
                        <div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={question.options[0].isCorrect} onChange={(e) => handleToggle(index, 0, e)} />
                                <input
                                    type="text"
                                    name={`questions[${index}]option[${0}]`}
                                    value={question.options[0].text}
                                    onChange={(e) => onChange(e, index, 0)}
                                />
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={question.options[1].isCorrect} onChange={(e) => handleToggle(index, 1, e)} />
                                <input
                                    type="text"
                                    name={`questions[${index}]option[${1}]`}
                                    value={question.options[1].text}
                                    onChange={(e) => onChange(e, index, 1)}
                                />
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={question.options[2].isCorrect} onChange={(e) => handleToggle(index, 2, e)} />
                                <input
                                    type="text"
                                    name={`questions[${index}]option[${2}]`}
                                    value={question.options[2].text}
                                    onChange={(e) => onChange(e, index, 2)}
                                />
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={question.options[3].isCorrect} onChange={(e) => handleToggle(index, 3, e)} />
                                <input
                                    type="text"
                                    name={`questions[${index}]option[${3}]`}
                                    value={question.options[3].text}
                                    onChange={(e) => onChange(e, index, 3)}
                                />
                            </div>


                            <div className="mb-3 my-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Marks</label>
                                <input type="number" name="marks" onChange={(e) => onChangeMarks(e, index)} value={quizContent.marks} />
                            </div>
                        </div>
                    </div>
                ))}



                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal" onClick={closeHandle}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
                    <button type="button" class="btn btn-primary" onClick={() => handleUpload(courseId)} >Upload Quiz</button>
                </div>
            </div >
        </div>

    )
}
