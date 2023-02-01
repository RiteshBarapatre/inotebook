import React from 'react'

export default function About() {

  return (
    <>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/250×400/?notebook" className="d-block w-100" alt="unsplash" width='250px' height='400px'/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/250×400/?computer" className="d-block w-100" alt="unsplash" width='250px' height='400px'/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/250×400/?pen" className="d-block w-100" alt="unsplash" width='250px' height='400px'/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
}
