

// //  *************************************************************************
// //  * Display the line and bar combine plot for selected options
// //  * ************************************************************************
function buildbarchart(option) {
         
        if (option ==="costsbyyear") {
        //   var trace1 = {
        //   x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //   y: [-3200, -1190, 517.3, 1000, 8.6, 15.4, -2900, -14500, 190.3, 91.3,-1000],
        //   name: "Profits or Loss",
        //   type: "bar"
        //   // ["1976", "1980", "1984", "1988","1992", "1996", "2000", "2004", "2008", "2012", "2016"]
        // };
        var trace2 = {
          x: ["1976y", "1980y", "1984y", "1988y","1992y", "1996y", "2000y", "2004y", "2008y", "2012y", "2016y"],
          y: [5100, 6331, 958, 8200, 16200, 2600, 6700, 11500, 47000, 15300, 12000],
          name: "Total Costs",
          mode: 'lines+markers',
          type: "scatter",
          marker: {
            color: "purple",
          },
        };
      var data = [trace2];
      var layout = {
        title: "Olympic Host City Total Costs",
        yaxis: {
          title: 'USD (Million)',
          font: {
            family:"Arial",
          },         
        }       
      };   
      Plotly.newPlot("FZbar", data, layout);
        }

        // var data = [
        //   {
        //     type: 'bar',
        //     x:  ["1976", "1980", "1984", "1988","1992", "1996", "2000", "2004", "2008", "2012", "2016"],
        //     y: [500,600,700],
        //     base: [-500,-600,-700],
        //     marker: {
        //       color: 'red'
        //     },
        //     name: 'expenses'
        //   },
        //   {
        //     type: 'bar',
        //     x: ['2016','2017','2018'],
        //     y: [300,400,700],
        //     base: 0,
        //     marker: {
        //       color: 'blue'
        //     },
        //     name: 'revenue'
        //   }]
        
        // Plotly.newPlot('myDiv', data);
 
  if (option ==="byprofit") {    
      var trace1 = {
        x: ["1988y","1984y","2008y","2012y","1996y","1992y", "2016y", "1980y", "2000y","1976y","2004y"],
        
        y: [1000, 517.3, 190.3, 91.3,15.4,8.6,-1000,-1190,-2900, -3200,-14500],
        marker:{
          color: ["rgb(0, 179, 0)", 'rgb(0, 179, 0)', 'rgb(0, 179, 0)', 'rgb(0, 179, 0)', 'rgb(0, 179, 0)','rgb(0, 179, 0)',	'rgb(179, 0, 0)',	'rgb(179, 0, 0)',
        	'rgb(179, 0, 0)',	'rgb(179, 0, 0)',	'rgb(179, 0, 0)']
        },

        name: "Profits or Loss",
        
        type: "bar"
      };
      // var trace2 = {
      //   x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //   y: [8200,958,47000, 15300,2600,16200,12000,6331,6700,5100, 11500],       
      //   name: "Total Costs",
      //   mode: "markers",  
      //   type: "scatter"
      // };
    var data = [trace1];
    var layout = {
      title: "Olympic Profits and Fund Loss",  
      yaxis: {
        title: 'USD (Million)',
        font: {
          family:"Arial",
        },         
      }        
      // <option value="byyear">Profit by Year</option>
      // <option value="byprofit">Profit by amount</option>
     
    };   
    Plotly.newPlot("FZbar", data, layout);
  }

  if (option ==="byyear") {
    var trace1 = {
      x: ["1976y", "1980y", "1984y", "1988y","1992y", "1996y", "2000y", "2004y", "2008y", "2012y", "2016y"],
      y: [-3200, -1190, 517.3, 1000, 8.6, 15.4, -2900, -14500, 190.3, 91.3,-1000],
      name: "Profits or Loss",
      marker:{
        color: ['rgb(179, 0, 0)','rgb(179, 0, 0)',"rgb(0, 179, 0)", 'rgb(0, 179, 0)',"rgb(0, 179, 0)", 'rgb(0, 179, 0)',
         'rgb(179, 0, 0)', 'rgb(179, 0, 0)','rgb(0, 179, 0)',  'rgb(0, 179, 0)', 'rgb(179, 0, 0)']
             },

      
      type: "bar"
    };
    // var trace2 = {
    //   x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //   y: [47000, 16200, 15300, 12000, 11500, 8200, 6700, 6331, 5100,2600, 958],       
    //   name: "Total Costs",  
    //   mode: "markers",
    //   type: "scatter"
    // };
  var data = [trace1];
  var layout = {
    title: "Olympic Profits or Fund Loss",
    yaxis: {
      title: 'USD (Million)',
      font: {
        family:"Arial",
      },         
    }       
    };   
  Plotly.newPlot("FZbar", data, layout);
  }

}

function init() {
  var inioption = "costsbyyear";
  buildbarchart(inioption);
}

function myFunction4() {
d3.select('#FZbar').html(" ");
var newoption = document.getElementById("profitoption").value;
if (newoption  > " ") {
  console.log("I choose "  + newoption );
   }  
  
   buildbarchart(newoption) ;
}    
// Initialize the dashboard
init();
  
