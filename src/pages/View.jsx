import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Badge, Button } from "react-bootstrap";


export const View = () => {

    const [recipe,setRecipe] = useState()
    const {id} = useParams()
    console.log(recipe);


    useEffect(()=>{
        if (sessionStorage.getItem("allRecipe")) {
          const allRecipes = JSON.parse(sessionStorage.getItem("allRecipe"))
          setRecipe(allRecipes.find(items=>items.id==id))
        }
      },[])

  return (
    <>
    <div
      className="container py-4"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Card className="shadow-lg border-0">
        <Card.Img
          src={recipe?.image}
          className="rounded"
          style={{
            maxHeight: "400px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />
        <Card.Body>
          <Card.Title className="display-5 text-center">{recipe?.name}</Card.Title>
          <div className="text-center mb-3">
            <span className="text-muted me-3">
              <strong>Cuisine:</strong> {recipe?.cuisine}
            </span>
            <Badge bg="info" className="me-2">
              {recipe?.difficulty}
            </Badge>
            {recipe?.tags &&
              recipe?.tags.map((tag, index) => (
                <Badge bg="secondary" key={index} className="ms-1">
                  {tag}
                </Badge>
              ))}
          </div>

          
          <div
            className="d-flex justify-content-around mb-4 p-3 rounded bg-light"
            style={{ fontSize: "1rem" }}
          >
            <div>
              <strong>Calories:</strong> {recipe?.caloriesPerServing} kcal
            </div>
            <div>
              <strong>Prep Time:</strong> {recipe?.prepTimeMinutes} mins
            </div>
            <div>
              <strong>Cook Time:</strong> {recipe?.cookTimeMinutes} mins
            </div>
            <div>
              <strong>Servings:</strong> {recipe?.servings}
            </div>
          </div>

          <h4 className="mb-3 text-primary">Ingredients</h4>
          <ul className="list-group mb-4">
            {recipe?.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="list-group-item border-0"
                style={{ fontSize: "1rem" }}
              >
                🍴 {ingredient}
              </li>
            ))}
          </ul>

          <h4 className="mb-3 text-primary">Instructions</h4>
          <ol
            className="list-group list-group-numbered mb-4"
            style={{
              paddingLeft: "20px",
              lineHeight: "1.6",
            }}
          >
            {recipe?.instructions.map((step, index) => (
              <li key={index} className="list-group-item border-0">
                {step}
              </li>
            ))}
          </ol>
          <div
            className="d-flex justify-content-between align-items-center bg-light rounded p-3"
            style={{
              fontSize: "1rem",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <strong>Rating:</strong> ⭐ {recipe?.rating} / 5
            </div>
            <div>
              <strong>Reviews:</strong> {recipe?.reviewCount} reviews
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <Link to={'/home'} variant="primary" size="lg">
            Back to Recipes
          </Link>
        </Card.Footer>
      </Card>
    </div>
    </>
  )
}

export default View