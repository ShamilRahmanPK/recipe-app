import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../redux/Slices/recipeSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { allRecipes, loading, errorMsg } = useSelector(
    (state) => state.recipeReducer
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; 
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
        <div className="container py-4 mt-4">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center my-5 text-lg">
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
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                      className="mb-4"
                    >
                      <Card
                        className="shadow-lg border-0 h-100"
                        style={{
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                          overflow: "hidden",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 20px rgba(0, 0, 0, 0.15)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={recipe?.image}
                          alt={recipe?.name}
                          style={{
                            height: "180px",
                            objectFit: "cover",
                          }}
                        />
                        <Card.Body className="bg-light">
                          <Card.Title
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {recipe?.name}
                          </Card.Title>
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
                              background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              textDecoration: "none",
                              fontWeight: "bold",
                              transition:
                                "background-color 0.3s ease, transform 0.2s ease",
                            }}
                          >
                            View more
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div className="d-flex justify-content-center align-items-center font-bold text-danger my-5 text-lg">
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
