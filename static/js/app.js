function init() {
  // Grab a reference to the dropdown select element
  var selector1 = d3.select("#selYear");
  var selector2 = d3.select("#selNOC");
  var selector3 = d3.select("#selSport");
  var selector4 = d3.select("#selGender");

  // Populate the Year selector list
  selector1
    .append("option")
    .text("All")
    .property("value", "All");
  for (i=1896; i<2016; i+=4)  {
    selector1
      .append("option")
      .text(i)
      .property("value", i);
  }

  // Populate the Sport selector list
  var sportList = ["All", "Athletics", "Cycling", "Diving", "Fencing", "Gymnastics", "Rowing", "Swimming", "Weightlifting"];
  sportList.forEach((sport) => {
    selector3
      .append("option")
      .text(sport)
      .property("value", sport);
    });

  // Populate the Gender List
  var genderList = ["All", "M", "W", "X"];
  genderList.forEach((gender) => {
    selector4
      .append("option")
      .text(gender)
      .property("value", gender);
  });

    // Use the first sample from the list to build the initial plots
    // const firstSample = sampleNames[0];
    // console.log("About to call buildCharts");
    // buildCharts(firstSample);
    // buildMetadata(firstSample);

}



// Initialize the dashboard
init();
