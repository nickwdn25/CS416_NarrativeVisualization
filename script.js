// ==== PARAMETERS ====
let currentScene = 0;  // Scene index

const width = 800, height = 500;
const svg = d3.select("#vis")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Example dataset
const data = [
  {year: 2010, value: 20},
  {year: 2012, value: 40},
  {year: 2014, value: 35},
  {year: 2016, value: 50},
  {year: 2018, value: 70}
];

// ==== DRAW FUNCTION ====
function drawScene(scene) {
  svg.selectAll("*").remove(); // Clear previous scene

  if (scene === 0) {
    sceneOverview();
  } else if (scene === 1) {
    sceneDetailA();
  } else if (scene === 2) {
    sceneDetailB();
  }
}

// ==== SCENES ====
function sceneOverview() {
  svg.append("text")
    .attr("x", 50)
    .attr("y", 40)
    .style("font-size", "20px")
    .text("Scene 1: Overview of Data");

  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => 100 + (d.year - 2010) * 120)
    .attr("cy", d => height - d.value * 5)
    .attr("r", 8)
    .attr("fill", "steelblue");

  svg.append("text")
    .attr("x", 200)
    .attr("y", height - 20)
    .style("font-size", "14px")
    .text("Annotation: Data points show trend over time.");
}

function sceneDetailA() {
  svg.append("text")
    .attr("x", 50)
    .attr("y", 40)
    .style("font-size", "20px")
    .text("Scene 2: Focus on Early Years");

  svg.selectAll("circle")
    .data(data.filter(d => d.year <= 2014))
    .enter()
    .append("circle")
    .attr("cx", d => 200 + (d.year - 2010) * 120)
    .attr("cy", d => height - d.value * 5)
    .attr("r", 8)
    .attr("fill", "orange");

  svg.append("text")
    .attr("x", 180)
    .attr("y", height - 60)
    .style("font-size", "14px")
    .text("Annotation: Early growth period.");
}

function sceneDetailB() {
  svg.append("text")
    .attr("x", 50)
    .attr("y", 40)
    .style("font-size", "20px")
    .text("Scene 3: Focus on Later Years");

  svg.selectAll("circle")
    .data(data.filter(d => d.year > 2014))
    .enter()
    .append("circle")
    .attr("cx", d => 200 + (d.year - 2014) * 120)
    .attr("cy", d => height - d.value * 5)
    .attr("r", 8)
    .attr("fill", "green");

  svg.append("text")
    .attr("x", 180)
    .attr("y", height - 80)
    .style("font-size", "14px")
    .text("Annotation: Accelerated growth.");
}

// ==== TRIGGERS ====
document.getElementById("nextBtn").addEventListener("click", () => {
  currentScene = (currentScene + 1) % 3;
  drawScene(currentScene);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentScene = (currentScene - 1 + 3) % 3;
  drawScene(currentScene);
});

// ==== INITIAL DRAW ====
drawScene(currentScene);
