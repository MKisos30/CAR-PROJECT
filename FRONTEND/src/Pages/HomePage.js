import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {

    const arrOfCategory = [
        { path: "toyota", title: "Toyota" },
        { path: "honda", title: "Honda" },
        { path: "skoda", title: "Skoda" },
        { path: "nissan", title: "Nissan" },
        { path: "subaru", title: "Subaru" },
    ]

    return (
      <div>
        <h1 className="homePage-title">ROLO MOTOR</h1>
        <div className="categories">
          {
          arrOfCategory.map((item, index) => {
            return (
              <Link to={item.path} key={index}>{item.title}</Link>
            )
          })
          }
        </div>
      </div>
    )
}

export default HomePage;