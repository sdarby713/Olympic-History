function init() {
  // Grab a reference to the dropdown select element
  var selector2 = d3.select("#selNOC");
  var selector3 = d3.select("#selSport");

  // Populate the NOC selector list
  d3.json(`/names`).then(function(nocdata) {
    selector2
      .append("option")
      .text("All")
      .property("value", "All") 
    nocdata.forEach((datum) => {
      selector2
        .append("option")
        .text(datum.NOC)
        .property("value", datum.NOC)  });
  });
  

  // Populate the Sport selector list
  var sportList = ["All", "Athletics", "Cycling", "Diving", "Fencing", "Gymnastics", "Rowing", "Swimming", "Weightlifting"];
  sportList.forEach((sport) => {
    selector3
      .append("option")
      .text(sport)
      .property("value", sport);
    });


  // Use the defaults to build the initial plots
  const defaultSelections = [1896, 2016, "All", "All", "M", "W", "X", "G", "S", "B"];
  // buildCharts(defaultSelections);

}
function buildCharts(sels) {

  
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

  var cb1 = d3.select("#cb1").property("checked");
  var cb2 = d3.select("#cb2").property("checked");
  var cb3 = d3.select("#cb3").property("checked");
  var cb4 = d3.select("#cb4").property("checked");
  var cb5 = d3.select("#cb5").property("checked");
  var cb6 = d3.select("#cb6").property("checked");

  console.log(cb1, cb2, cb3, cb4, cb5, cb6);
  var genderMen = " ";
  var genderWomen = " ";
  var genderMixed = " ";
  var medalGold = " ";
  var medalSilver  = " ";
  var medalBronze  = " ";
  if (cb1)  { genderMen = "M"; }
  if (cb2)  { genderWomen = "F"; }
  if (cb3)  { genderMixed = "M"; }
  if (cb4)  { medalGold = "G"; }
  if (cb5)  { medalSilver = "S"; }
  if (cb6)  { medalBronze = "B"; }


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

  selections = [fromYear, toYear, selectedNOC, selectedSport, genderMen, genderWomen, genderMixed, medalGold, medalSilver, medalBronze];
  console.log(selections);
  // buildCharts(selections);
});
