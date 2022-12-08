import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
const Tutorial = props => {
    const { id }= useParams();
  let navigate = useNavigate();
   
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };
  
    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form col-lg-6 col-md-6">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>
  
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
  
            {currentTutorial.Published ? (
              <button
                className=" badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className=" badge-primary mr-2  m-2 bg-dark text-light"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}
  
            <button className=" badge-danger mr-2  m-2 bg-dark text-light" onClick={deleteTutorial}>
              Delete
            </button>
  
            <button
              type="submit"
              className=" badge-success m-2 bg-dark text-light border-radius-5"
              onClick={updateTutorial}
            >
              Update
            </button>
            <p>{message}</p>
            <Link
              to={"/tutorials/"}
              className="badge-warning"
            >
              View All
            </Link>
          </div>
          
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
           
          </div>
        )}
        
      </div>
      
    );
  };
  
  export default Tutorial;