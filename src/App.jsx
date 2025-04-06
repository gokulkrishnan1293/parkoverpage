import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    const intervalId = setInterval(() => {
      const name = document.querySelector(".name");

      // Add punch by changing color dynamically
      const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#F3FF33"];
      name.style.color = colors[Math.floor(Math.random() * colors.length)];

      // Assign Name to it
      name.innerText = name.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return name.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= name.dataset.value.length) {
        iteration = 0;
      } else {
        iteration += 1 / 3;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="screen">
        <div className="screen-overlay"></div>
        <div className="screen-content">
          <div className="screen-user">
            <span className="name" data-value="GOKUL">
              GOKUL
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;