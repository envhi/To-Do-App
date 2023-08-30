import "./Home.css";

function Home() {
  return (
    <div className="abouts-container">
      <section className="about-app-container">
        <p className="italicp">
          <i>
            This project has been developed as a study object, aiming to learn
            and/or improve some technologies and tools, mainly the MERN stack,
            in addition to the architectural pattern MVC and REST principles.
          </i>
        </p>
        <h1>ABOUT THE APPLICATION</h1>
        <p>
          As the main objective, this application was designed to study the MERN
          stack, along with some minor tools that will be listed below.
        </p>

        <img src="mern.png" alt="mern-stack" />
        <h2>Mern Stack</h2>
        <p>
          "MERN (Mongodb Express React Node) is one of several variations of the
          MEAN stack (MongoDB Express Angular Node), where the traditional
          Angular.js front-end framework is replaced with React.js. Other
          variants include MEVN (MongoDB, Express, Vue, Node), and really any
          front-end JavaScript framework can work."
          https://www.mongodb.com/mern-stack
        </p>

        <h3>Back-End dependencies</h3>
        <p>
          <i>
            "bcrypt": "^5.1.0",
            <br /> "cors": "^2.8.5",
            <br /> "express": "^4.18.2",
            <br /> "jsonwebtoken": "^9.0.1",
            <br /> "mongodb": "^5.6.0",
            <br /> "mongoose": "^7.3.1",
            <br /> "nodemon": "^3.0.1"
          </i>
        </p>

        <h2>Front-End dependencies</h2>
        <p>
          <i>
            "axios": "^1.4.0",
            <br /> "events": "^3.3.0",
            <br /> "react": "^18.2.0",
            <br /> "react-dom": "^18.2.0",
            <br /> "react-modal": "^3.16.1",
            <br /> "react-router-dom": "^6.14.2"
          </i>
        </p>
      </section>

      <section className="about-me-container">
        <h3>About Me</h3>
        <p>
          Olá! Me chamo Felipe e tenho 26 anos. Estou me graduando em Análise e
          Desenvolvimento de Sistemas pela Universidade Paulista - Sorocaba,
          atualmente no terceiro semestre. Além disso sigo estudando
          programação, através de cursos em plataformas digitais - como Alura e
          Udemy, além de artigos e/ou documentações que se fazem necessários no
          momento.
        </p>
        <p>
          Hey there! I'm Felipe and I'm 26 years old. I'm doing a degree in
          Analysis and Systems Development at UNIP - Sorocaba, I'm currently in
          the third semester. I'm also keeping up with programming by taking
          courses on platforms like Alura and Udemy, and reading articles or
          documentation I come across on the internet.
        </p>
        <div className="quick-info-container">
          <img src="pp.jfif" />
          <p>Name: Felipe Astorga Fonseca</p>
          <p>Age: 26</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
