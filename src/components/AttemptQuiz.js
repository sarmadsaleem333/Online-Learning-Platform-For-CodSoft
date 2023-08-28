import React from 'react'

export default function AttemptQuiz(props) {
    const {quizId}=props;
    return (
        <div>
            <div class="modal-body">
                {quizId}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    )
}
