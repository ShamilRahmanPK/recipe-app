import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../redux/Slices/recipeSlice";
import { Link } from "react-router-dom";
import View from "./View";

const Home = () => {
  const dispatch = useDispatch();
  const { allRecipes, loading, errorMsg } = useSelector(
    (state) => state.recipeReducer
  );
  console.log(allRecipes, loading, errorMsg);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const totalPages = Math.ceil(allRecipes?.length / recipesPerPage);

  const currentPageRecipeLastIndex = currentPage * recipesPerPage;
  const currentPageRecipeFirstIndex =
    currentPageRecipeLastIndex - recipesPerPage;
  const visibleRecipes = allRecipes?.slice(
    currentPageRecipeFirstIndex,
    currentPageRecipeLastIndex
  );

  useEffect(() => {
    dispatch(fetchRecipe());
  }, [dispatch]);

  const navigateToNextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const navigateToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="main">
        <Header />
        <div className="container py-4">
          {loading ? (
            <div className="flex justify-center item-center my-5 text-lg">
              <img
                width={"100px"}
                height={"100px"}
                src="https://imgs.search.brave.com/uYpkEhB3tGp5UE4xitjyHQHfPReqS2aLUtltQG-b6g0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTMuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhlbUo1ZDNZeGVt/RmhjSEJwTVhOaGFE/WnVlamd3WWpjNGMz/VnJaWEEzTkhSd2Jq/aHVjbVUzWWlabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vM29Fakk2U0lJ/SEJkUnhYSTQwL2dp/cGh5LmdpZg.gif"
                alt="Loading..."
              />
              Loading...
            </div>
          ) : (
            <>
              <Row>
                {allRecipes?.length > 0 ? (
                  visibleRecipes?.map((recipe) => (
                    <Col
                      key={recipe?.id}
                      md={4}
                      sm={6}
                      xs={12}
                      className="mb-4"
                    >
                      <Card className="shadow-lg border-0">
                        <Card.Img
                          variant="top"
                          src={recipe?.image}
                          alt={recipe?.name}
                        />
                        <Card.Body className="bg-light">
                          <Card.Title>{recipe?.name}</Card.Title>
                          <Card.Text
                            className="text-muted"
                            style={{ fontSize: "0.875rem", lineHeight: "1.4" }}
                          >
                            Meal type: {recipe?.mealType}
                          </Card.Text>
                          <Link
                            to={`/${recipe?.id}/view`}
                            className="btn btn-primary mt-3 w-100"
                            style={{
                              backgroundColor: "#6f42c1",
                              color: "#fff",
                              border: "none",
                              padding: "10px 20px",
                              textAlign: "center",
                              borderRadius: "5px",
                              textDecoration: "none",
                              fontWeight: "bold",
                              transition:
                                "background-color 0.3s ease, transform 0.2s ease",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#5a2d9f";
                              e.target.style.transform = "scale(1.05)"; 
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#6f42c1";
                              e.target.style.transform = "scale(1)";
                            }}
                          >
                            View more
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div className="flex justify-center items-center font-bold text-red-600 my-5 text-lg">
                    Recipes not found!
                  </div>
                )}
              </Row>

              <div className="text-center font-bold mt-4">
                <button
                  onClick={navigateToPrevPage}
                  className="btn btn-secondary me-3"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={navigateToNextPage}
                  className="btn btn-secondary ms-3"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
