// This is a saved version of app.js that "produces" the olympic cities map

function init() {
  console.log("Entering init function");

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
  buildCharts(defaultSelections);

}
function buildCharts(sels) {
  console.log ("entering buildCharts");

  Promise.all([
    d3.json(`/names`),
    d3.json(`/medals/${sels[0]}/${sels[1]}/${sels[2]}/${sels[3]}`),
    d3.json(`/olympiads`)
  ]).then(([NOCData, medalData, olympiData]) => {
      buildChart1(olympiData, sels[0]);
  });
};

function buildChart1(oData, year)  {

  // here is a list of where logo images may be found
  const logos = 
      [ "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Athens_1896_report_cover.jpg/330px-Athens_1896_report_cover.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/JOParis_1900.jpg/330px-JOParis_1900.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/1904summerolympicsposter.jpg/330px-1904summerolympicsposter.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Olympic_games_1908_London.jpg/330px-Olympic_games_1908_London.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/1912_Summer_Olympics_poster.jpg/330px-1912_Summer_Olympics_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/1920_olympics_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/1924_Summer_Olympics_logo.svg/330px-1924_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/f/f9/1928_Olympics_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/1932_Summer_Olympics_logo.svg/255px-1932_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/1936_berlin_logo.jpg/330px-1936_berlin_logo.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/1948_Summer_Olympics_logos.svg/266px-1948_Summer_Olympics_logos.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/1952_Summer_Olympics_logo.svg/330px-1952_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/1956_Summer_Olympics_logo.svg/225px-1956_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/1/11/1960_Summer_Olympics_logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tokyo_1964_Summer_Olympics_logo.svg/180px-Tokyo_1964_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/1968_Mexico_emblem.svg/330px-1968_Mexico_emblem.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/1972_Summer_Olympics_logo.svg/330px-1972_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/1976_Summer_Olympics_logo.svg/330px-1976_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Emblem_of_the_1980_Summer_Olympics.svg/330px-Emblem_of_the_1980_Summer_Olympics.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/1984_Summer_Olympics_logo.svg/330px-1984_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/1988_Summer_Olympics_logo.svg/225px-1988_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/1992_Summer_Olympics_logo.svg/300px-1992_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/1996_Summer_Olympics_logo.svg/255px-1996_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/2000_Summer_Olympics_logo.svg/287px-2000_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/2004_Summer_Olympics_logo.svg/286px-2004_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/2008_Summer_Olympics_logo.svg/248px-2008_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/2012_Summer_Olympics_logo.svg/270px-2012_Summer_Olympics_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/2016_Summer_Olympics_logo.svg/267px-2016_Summer_Olympics_logo.svg.png" ]
  for (var i = 0; i < oData.length; i++)  {
    if (year === oData[i].Year)  {
      d3.select("#c1d").text(oData[i].Year)
      d3.select("#c2d").text(oData[i].City)
      d3.select("#c3d").text(oData[i].Nations)
      d3.select("#c4d").text(oData[i].Athletes_M)
      d3.select("#c5d").text(oData[i].Athletes_W)
      d3.select("#c6d").text(oData[i].Sports)
      d3.select("#c7d").text(oData[i].Events)
      d3.select("img").attr('src', logos[i])
    }
  }


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
  buildCharts(selections);
});
