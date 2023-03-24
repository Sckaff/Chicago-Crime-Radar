import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="background">
        <div className="block" >
          <div class="header-container">
            <h1 class="header-text">Welcome to Chicago Crime Tracker!</h1>
          
              <p class="header-description">
                Our application idea was sparked after we looked into data regarding Chicago crime rates. 
                According to statistical data, Chicago has consistently ranked as one of the most dangerous cities in the United States. 
                Studies from 2020 show that Chicago's crime rate was 3,926 crimes per 100,000 people, which is 67% more than the national average.
                After looking as these statistic we dived into Chicago's well documented crime data provided publicly by the Chicago Police Department.
                To create an application that can well inform people living in Chicago and those visitings Chicago best times and 
                areas to travel that statistically have lower crime rates.
                <button onClick={() => window.location = '/myradar'} class="header-button">Get Started!</button>
              </p>
           
          </div>
        </div>
    </div>
  )
}

export default Home