// *************************************
// Buildup Stacked Horizontal  Bar Chart
// *************************************

// Create year select dropdown list

var olyyear = ["all","1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016"];
   
var selector = d3.select("#yearoption2");  
    // Append sample names to the select options profitorloss
    olyyear.forEach((data) => { 
      selector.append("option")
              .text(data)
              .property("value", data);
              }); 

                   
function builhbarchart(timeselect) {
                         
if (timeselect==="all") {
        
 var trace1 = {
        y: ['SWE', 'CHN', 'ITA', 'FRA', 'GER', 'GBR', 'URS', 'USA'],
        x: [150, 227, 219, 233, 233, 278, 394, 1035], 
        name: 'Gold',
        marker: {
            color: '#ffff00'
          },
        orientation: 'h',
        type: 'bar'
    };
     
      
var trace2 = {
        y: ['SWE', 'CHN', 'ITA', 'FRA', 'GER', 'GBR', 'URS', 'USA'],
        x: [175, 162, 191, 255, 261, 316, 317, 802],
        name: 'silver',
        marker: {
            color:'#C0C0C0'
          },
        orientation: 'h',
        type: 'bar'
      };
     

 var trace3 = {
        y: ['SWE', 'CHN', 'ITA', 'FRA', 'GER', 'GBR', 'URS', 'USA'],
        x: [188, 153, 198, 282, 282, 298, 294, 707],
        name: 'Bronze',
        marker: {
            color: '#d2a92d'
          },
        orientation: 'h',
        type: 'bar'                    
      };                                
         
  var data = [trace1, trace2, trace3 ];
  
  var layout = {
    title:"Summer Olympics Winner Countries by Medals",
    titlefont: {
        size: 29
         },   
    yaxis: {
            titlefont: {
              size: 20,
              color: 'rgb(107, 107, 107)'
            }
        },
    barmode: 'stack'
};
  
  Plotly.newPlot('Libar', data, layout);
 }

 else{ d3.csv("static/Data/medal_countbymedal.csv").then((data) => {
    //  console.log(data)
    data = data.filter(data =>data.Year.toString() === timeselect);
    console.log(data);
    console.log(data[7]);
    var y = [data[7].NOC,data[6].NOC,data[5].NOC,data[4].NOC,data[3].NOC,data[2].NOC,data[1].NOC,data[0].NOC];
    var x1 =[data[7].Gold_count, data[6].Gold_count, data[5].Gold_count, data[4].Gold_count, data[3].Gold_count, data[2].Gold_count, data[1].Gold_count, data[0].Gold_count];
    var x2 =[data[7].Silver_count, data[6].Silver_count, data[5].Silver_count, data[4].Silver_count, data[3].Silver_count, data[2].Silver_count, data[1].Silver_count, data[0].Silver_count];
    var x3 =[data[7].Bronze_count, data[6].Bronze_count, data[5].Bronze_count, data[4].Bronze_count, data[3].Bronze_count, data[2].Bronze_count, data[1].Bronze_count, data[0].Bronze_count];
    
    console.log(x1);
    console.log(x2);
    console.log(x3);

    var trace1 = {
        y: y,
        x: x1, 
        name: 'Gold',
        orientation: 'h',
        marker: {
            color: '#ffff00'
          },
        type: 'bar'
    };
     
   
var trace2 = {
        y: y,
        x: x2,
        name: 'silver',
        marker: {
            color:'#C0C0C0'
          },
        orientation: 'h',
        type: 'bar'
      };


 var trace3 = {
        y: y,
        x: x3,
        name: 'Bronze',
        orientation: 'h',
        marker: {
            color: '#d2a92d'
          },
        type: 'bar'
      };                                
         
  var data = [trace1, trace2, trace3 ];
  
  var layout = {
    title:"Summer Olympics Winner Countries by Medals" +"(" + timeselect +")",  
    titlefont: {
        size: 29
         },   
    barmode: 'stack'};
  
  Plotly.newPlot('Libar', data, layout);    
    
 });

}   
} 

// Setup initial function
function init() {
    var intyear = "all";
    builhbarchart(intyear);
  
  }

  
function myFunction() {
    
d3.select('#Libar').html("");
var newselect = document.getElementById("yearoption2").value;
        if (newselect > " ") {
        console.log("I choose "  +  newselect);
        } 
         builhbarchart(newselect);
    }

init();

