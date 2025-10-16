import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
  fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
    .then(() => onDeleteQuestion(id));
}


  function handleChangeCorrectAnswer(e) {
  const newCorrectIndex = parseInt(e.target.value);

  onUpdateQuestion({ ...question, correctIndex: newCorrectIndex });

  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correctIndex: newCorrectIndex }),
  })
    .then((r) => r.json())
    .then((updated) => onUpdateQuestion(updated));
}

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChangeCorrectAnswer}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
