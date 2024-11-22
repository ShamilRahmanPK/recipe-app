import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchRecipe } from '../redux/Slices/recipeSlice'

const Header = () => {
    const dispatch = useDispatch()
  return (
    <>
    <header
  className="d-flex justify-content-between align-items-center p-3 text-white"
  style={{
    background: "linear-gradient(135deg, #6a11cb, #2575fc)", 
    fontFamily: "'Poppins', sans-serif",
  }}
>
  <div className="d-flex align-items-center">
    <Link to="/" className="text-white text-decoration-none d-flex align-items-center">
      <img
        src="https://e7.pngegg.com/pngimages/415/27/png-clipart-fruit-logo-food-recipe-business-seasoning-ingredients-natural-foods-dried-fruit.png"
        alt="Recipe Haven Logo"
        style={{ width: "50px", height: "50px", marginRight: "10px" }}
      />
      <h1 className="fw-bold" style={{ fontSize: "2rem" }}>Recipe Haven</h1>
    </Link>
  </div>

  <div className="d-flex align-items-center">
    <input
      type="text"
      onChange={(e)=>dispatch(searchRecipe(e.target.value.toLowerCase()))}
      placeholder="Search Recipes..."
      className="form-control w-100"
      style={{
        maxWidth: "300px",
        borderRadius: "20px",
        padding: "10px",
        border: "none",
      }}
    />
  </div>
</header>

    </>
  )
}

export default Header