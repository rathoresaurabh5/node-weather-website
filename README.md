# Node Weather Website

This is a weather website built using Node.js, Express, and Handlebars. The website provides weather information based on user input and displays it in a user-friendly manner.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/node-weather-website.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd node-weather-website
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Open your browser and visit:**

   ```
   http://localhost:3000
   ```

3. **Enter a location to get the weather information.**

## Project Structure

```
node-weather-website/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   ├── 404.gif
│   │   ├── cookie.jpg
│   │   ├── dawg.jpg
│   │   ├── loader6.gif
│   │   ├── sky3.jpg
│   │   ├── weather.png
│   │   └── weather1.gif
│   └── js/
│       └── script.js
│
├── src/
│   ├── app.js
│   └── utils/
│       ├── forecast.js
│       └── geocode.js
│
├── templates/
│   ├── partials/
│   │   ├── error.hbs
│   │   ├── footer.hbs
│   │   └── header.hbs
│   └── views/
│       ├── 404-error.hbs
│       ├── about.hbs
│       ├── help.hbs
│       └── index.hbs
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Dependencies

- [Express](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Request](https://www.npmjs.com/package/request)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
