# Weather-Web

A simple weather application that displays the current weather conditions for a given location.

## Features

*   Displays current temperature, humidity, and wind speed.
*   Search for weather by city name.
*   Responsive design for both desktop and mobile.

## Technologies Used

### Frontend

*   [React](https://reactjs.org/)
*   [Tailwind CSS](https://tailwindcss.com/)

### Backend

*   [Node.js](https://nodejs.org/)
*   [Express.js](https://expressjs.com/) (or other Node.js framework)

## Getting Started

### Prerequisites

*   Node.js and npm installed on your machine.

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Deepesh70/Weather-Web.git
    cd Weather-Web
    ```

2.  **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **.env file** 
     #Create a copy of the example environment file:
        ```bash
        cp .env.example .env
       ```
      # Open the new `.env` file and add your OpenWeatherMap API key.

4.  **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd server
    node index.js
    ```
    The server will start on `http://localhost:5000` (or the port specified in your server configuration).

2.  **Start the frontend development server:**
    In a new terminal:
    ```bash
    cd client
    npm run dev
    ```
    The client will open in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
