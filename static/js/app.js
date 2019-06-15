function init() {
  // Grab a reference to the dropdown select element
  var selector2 = d3.select("#selNOC");
  var selector3 = d3.select("#selSport");

  // Populate the NOC selector list

  // Populate the Sport selector list
  var sportList = ["All", "Athletics", "Cycling", "Diving", "Fencing", "Gymnastics", "Rowing", "Swimming", "Weightlifting"];
  sportList.forEach((sport) => {
    selector3
      .append("option")
      .text(sport)
      .property("value", sport);
    });


  // Use the defaults to build the initial plots
  const defaultSelections = [1896, 2016, "All", "All"];
  // buildCharts(defaultSelections);


}



// Initialize the dashboard
init();

// next, set up the select button:
var btn = d3.select("#filter-btn");

btn.on("click", function() {
  d3.event.preventDefault();

  var fromYear = d3.select("#frYear").property("value");
  var toYear   = d3.select("#toYear").property("value");
  var selectedNOC = d3.select("#selNOC").property("value");
  var selectedSport = d3.select("#selSport").property("value");

  if (fromYear > " ")  {
      fromYear = +fromYear
      if (toYear > " ")  {
        toYear = +toYear;
      }
      else {
        toYear = fromYear;
      }
  }
  else  {
      fromYear = 1896;
      toYear   = 2016;
  }

  selections = [fromYear, toYear, selectedNOC, selectedSport];
  console.log(selections);
  // buildCharts(selections);
});