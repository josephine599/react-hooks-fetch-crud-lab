import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("list");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <nav>
        <button onClick={() => setPage("form")}>New Question</button>
        <button onClick={() => setPage("list")}>View Questions</button>
      </nav>
      {page === "list" ? (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      ) : (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;
