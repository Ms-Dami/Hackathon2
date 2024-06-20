import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Update the code below to get and update data from the back-end server.
// Note that this is the front-end server, and you will have to configure
// the back-end server to allow cross-origin resource sharing.

function App() {
  const [students, setStudents] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    // Get Students from the back-end server here
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/api/v1/students"
        );
        console.log(response.data);
        setStudents(response.data);
      } catch (err) {
        console.error("Couldn't fetch API data", err);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();
    // Add students to the back-end server, and then update
    // the state with the response
    const student = {
      name: formRef.current.name.value,
      program: formRef.current.program.value,
      grade: formRef.current.grade.value,
    };

    const newStudent = await axios.post(
      "http://localhost:8083/api/v1/students",
      student
    );

    console.log(newStudent);
    setStudents([...students, newStudent.data]);
  };

  const renderedStudents = students.map((student) => (
    <li key={student.id} className="list-group-item">
      {`${student.name}: ${student.program}, ${student.grade}`}
    </li>
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h2>Add Student</h2>
          <form onSubmit={addStudent} ref={formRef}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Student Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="program">Program</label>
              <input
                type="text"
                id="program"
                placeholder="Enter Program"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Grade</label>
              <input
                type="text"
                id="grade"
                placeholder="Enter Grade"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-8">
          <h2>Students</h2>
          <ul className="list-group">{renderedStudents}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
