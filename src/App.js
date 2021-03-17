import './App.css';
import React, { useState } from "react";

export default function App() {

  const [toDoArr, setToDoArr] = useState([
    "Kanban Card 1",
    "Kanban Card 2",
    "Kanban Card 3"
  ])

  const [inProgArr, setInProgArr] = useState([
    "Kanban Card 4",
    "Kanban Card 5"
  ])

  const [doneArr, setDoneArr] = useState([
    "Kanban Card 6"
  ])

  const [moveCardIndex, setMoveCardIndex] = useState();

  const [moveCardType, setMoveCardType] = useState("");

  const addCard = (e) => {
    toDoArr.push("Kanban Card")
    setToDoArr([...toDoArr])
    console.log(toDoArr)
  }

  const removeCard = (e) => {
    const cardType = e.target.getAttribute("data-name");
    const arrIndex = e.target.getAttribute("data-index")
    console.log(cardType, arrIndex)
    switch (cardType) {
      case "toDo":
        toDoArr.splice(arrIndex, 1);
        setToDoArr([...toDoArr])
        break;
      case "inProg":
        inProgArr.splice(arrIndex, 1);
        setInProgArr([...inProgArr])
        break;
      case "done":
        doneArr.splice(arrIndex, 1)
        setDoneArr([...doneArr])
        break;
      default:
        console.log("no card type")
        break;
    }
  }

  const moveCard = (e) => {
    const cardType = e.target.getAttribute("data-name");
    const arrIndex = e.target.getAttribute("data-index");
    setMoveCardIndex(arrIndex);
    setMoveCardType(cardType);
  }

  const selectSection = (e) => {
    const section = e.target.getAttribute("data-value")
    const card = e.target.parentNode.getAttribute("data-card")
    switch (section) {
      case "toDo":
        if (moveCardType === "inProg") {
          inProgArr.splice(moveCardIndex, 1)
        } else if (moveCardType === "done") {
          doneArr.splice(moveCardIndex, 1)
        }
        toDoArr.push(card)
        setToDoArr([...toDoArr])
        break;
      case "inProg":
        if (moveCardType === "toDo") {
          toDoArr.splice(moveCardIndex, 1)
        } else if (moveCardType === "done") {
          doneArr.splice(moveCardIndex, 1)
        }
        inProgArr.push(card)
        setInProgArr([...inProgArr])
        break;
      case "done":
        if (moveCardType === "toDo") {
          toDoArr.splice(moveCardIndex, 1)
        } else if (moveCardType === "inProg") {
          inProgArr.splice(moveCardIndex, 1)
        }
        doneArr.push(card)
        setDoneArr([...doneArr])
        break;
      default:
        break;
    }
    setMoveCardIndex("");
    setMoveCardType("");
  }

  return (
    <div className="container">

      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Kanban!</a>
        </h1>

        <p>
          <button id="addCardBtn" onClick={addCard}>
            Add Card
          </button>
        </p>

        <div className="grid">
          <ul className="column">
            <h4>To Do</h4>
            {toDoArr.map((item, i) => {
              return <li className="card" key={i}>
                {item}
                <div className="btnContainer">
                  {moveCardIndex === i.toString() && moveCardType === "toDo" ? (
                    <div data-card={item}>
                      <button data-value="inProg" onClick={selectSection}>In Progress</button>
                      <button data-value="done" onClick={selectSection}>Done</button>
                    </div>
                  ) : (
                      <button className="moveCardBtn" data-name="toDo" data-index={i} onClick={moveCard}>Move</button>
                    )}
                  <button className="removeCardBtn" data-name="toDo" data-index={i} onClick={removeCard}>Remove</button>
                </div>
              </li>
            })}
          </ul>
          <ul className="column">
            <h4>In Progress</h4>
            {inProgArr.map((item, i) => {
              return <li className="card" key={i}>
                {item}
                <div className="btnContainer">
                  {moveCardIndex === i.toString() && moveCardType === "inProg" ? (
                    <div data-card={item}>
                      <button data-value="toDo" onClick={selectSection}>To Do</button>
                      <button data-value="done" onClick={selectSection}>Done</button>
                    </div>
                  ) : (
                      <button className="moveCardBtn" data-name="inProg" data-index={i} onClick={moveCard}>Move</button>
                    )}
                  <button className="removeCardBtn" data-name="inProg" data-index={i} onClick={removeCard}>Remove</button>
                </div>
              </li>
            })}
          </ul>
          <ul className="column">
            <h4>Done</h4>
            {doneArr.map((item, i) => {
              return <li className="card" key={i}>
                {item}
                <div className="btnContainer">
                  {moveCardIndex === i.toString() && moveCardType === "done" ? (
                    <div data-card={item}>
                      <button data-value="toDo" onClick={selectSection}>To Do</button>
                      <button data-value="inProg" onClick={selectSection}>In Progress</button>
                    </div>
                  ) : (
                      <button className="moveCardBtn" data-name="done" data-index={i} onClick={moveCard}>Move</button>
                    )}
                  <button className="removeCardBtn" data-name="done" data-index={i} onClick={removeCard}>Remove</button>
                </div>
              </li>
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}
