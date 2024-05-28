# Chicago Crime Radar

Chicago Crime Radar is a full-stack web application that provides data-driven insights on crime trends and neighborhood safety levels in Chicago. It analyzes a large crime dataset from 2018 to 2022 and presents the information through an interactive user interface.

## Features

- **Crime Data Analysis**: The application cleans and analyzes the crime dataset using Python, performing tasks such as data engineering, exploratory analysis, and complex querying.
- **Database Storage**: A SQLite database is used to store the processed crime data, ensuring efficient retrieval and management.
- **RESTful API**: A RESTful API is developed using Go, facilitating communication between the front-end and back-end components.
- **Interactive Front-end**: The front-end is built with React.js and provides an intuitive user interface for exploring crime data visualizations based on the user's location and preferences.

## Getting Started

To run the Chicago Crime Radar application locally, follow these steps:

### Prerequisites

- Python 3.x
- Go
- Node.js and npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/chicago-crime-radar.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chicago-crime-radar
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Install the required Go packages:

   ```bash
   go get ./...
   ```

5. Install the required Node.js packages for the front-end:

   ```bash
   cd client_react
   npm install
   ```

### Running the Application

1. Start the Go backend server:

   ```bash
   cd server_golang
   go run main.go
   ```

   The backend server will run on `http://localhost:8080`.

2. In a separate terminal, start the React.js front-end development server:

   ```bash
   cd client_react
   npm start
   ```

   The front-end development server will run on `http://localhost:3000`.

3. Open your web browser and navigate to `http://localhost:3000` to access the Chicago Crime Radar application.

## Data

The crime data used in this application is obtained from the City of Chicago Data Portal: [Crimes - 2001 to Present (Dashboard)](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
