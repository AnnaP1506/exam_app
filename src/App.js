import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Topnav from "./components/Topnav";

function App() {
  // component application state
  const [records, setRecords] = useState([]);
  const [dropdownlist, setDropdownlist] = useState([]);
  const formRef = useRef();

  // fetching dog breeds
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setDropdownlist(Object.keys(data.message));
        console.log(Object.keys(data.message));
      });
  }, []);

  // fetching records
  useEffect(() => {
    fetch("http://localhost:4000/records")
      .then((response) => response.json())
      .then((data) => {
        setRecords(data);
        console.log(data);
      });
  }, []);

  function postRecord(data) {
    fetch("http://localhost:4000/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecords([...records, data]);
        formRef.current.reset();
        console.log(data);
      });
  }

  const API = "https://dog.ceo/api/breeds/list/all";

  //form submitting

  function handleSubmit(event) {
    event.preventDefault();
    const tabledata = new FormData(event.target);
    console.log("submitted", tabledata.get("breeds"));
    const record = {
      date: tabledata.get("date"),
      time: tabledata.get("time"),
      distance: tabledata.get("distance"),
      breed: tabledata.get("breeds"),
    };
    postRecord(record);
  }
  
  function calcCalories(distance) {
    return distance * 1.25;
  }
  console.log("records", records);
 

  return (
    <div className="App">
      <header className="App-header">
       
        <Topnav />
      </header>

      <div className="wrapper">
        <h1>Keep track of your health!</h1>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <Container>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="date">Date</Form.Label>
                        <Form.Control
                          required
                          type="date"
                          name="date"
                          id="date"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="time">
                          Time (in minutes)
                        </Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="time"
                          id="time"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="distance">
                          Distance (in meters)
                        </Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="distance"
                          id="distance"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label for="breeds">Dog breed</Form.Label>

                        <Form.Select required name="breeds" id="breeds">
                          {dropdownlist.map((item, key) => {
                            return <option value={item}>{item}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Button
                          className="Button"
                          type="submit"
                          variant="primary"
                        >
                          Add
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
        <table class="table">
          <tr>
            <th>Date</th>
            <th>Distance</th>
            <th>Dog breed</th>
            <th>Calories burnt</th>
          </tr>
          {records.map((record, key) => {
            return (
              <tr key={key}>
                <td>{record.date}</td>
                <td>{record.distance}</td>
                <td>{record.breed}</td>
                <td>{calcCalories(record.distance)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
