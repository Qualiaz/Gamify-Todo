export default function dashboardView() {
  const main = document.getElementById("main");
  console.log(main);
  const markup = `
    <div>
        <button>Add Task</button>
    </div>
`;
  main.innerHTML = markup;
  // create markup
}
