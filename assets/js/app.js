// // @TODO: YOUR CODE HERE!


// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  // .select("")
  .select(".graph")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("assets/data/data.csv", function(error, healthData) {
  if (error) throw error;

  // graph will be education vs 
  console.log(healthData);
  healthData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;

  });

  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.poverty+2)])
    .range([width, 0]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare+2)])
    .range([height, 0]);


  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
  chartGroup.append("g").call(leftAxis);


  var elem = svg.selectAll("g").data(healthData);

  var elemEnter = elem.enter()
    .append("g")
    .attr("transform", function(d){return `translate(${xLinearScale(d.poverty)+margin.left},${yLinearScale(d.healthcare)+margin.top})`});

  var circle = elemEnter.append("circle")
    .attr("r", 15)
    .attr("stroke", "black")
    .attr("fill", "steelblue");
  
  elemEnter.append("text")
    .attr("dx", function(d){return -8})
    .attr("dy", function(d){return 3})
    .attr("stroke", "white")
    .attr("font-size", 10)
    .text(d => d.abbr);
  
  
  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 30)
    .attr("x", -100 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("% of population without healthcare");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2 - 100}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("% of population living in poverty");


});