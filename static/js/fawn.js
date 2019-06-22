// Add Year list to dropdown box
var olyyear1 = ["1976", "1980", "1984", "1988","1992", "1996", "2000", "2004", "2008", "2012", "2016"];
var selector = d3.select("#selDataset");  
olyyear1.forEach((data) => { 
  selector.append("option")
          .text(data)
          .property("value", data);
});
              
// .......... Gauge plot to show profit or Fund loss for each Olympic game.......... //
// "../Data/economy_clean.csv"
function buildgageplot(yearselect) {
  d3.csv("static/Data/economy_clean.csv" ).then((data) => {
    console.log(data);
    data = data.filter(data =>data.Year.toString() === yearselect);
    console.log(data);
    var profit = parseFloat(data[0].ProfitorLoss)/1000;
    var Text = data[0].Notes;
    var Title = data[0].HostCity;
    var totalcost = data[0].Total_Costs/1000;
    // Comment = data[0].ProfitorLoss
    profit = Math.round(profit * 100) / 100
    if (profit<0) {
      profit1 = Math.abs(profit);
     var g1 = new JustGage({
          id: 'FZgauge',
          value: profit1,
          min: 0,
          max: 15,
          maxTxt: "15 Bn.",
          textRenderer: function(val) {
            return "$"+profit1.toString()+" Bn.";
          },  
          
          pointer: false,
          label: "Total Costs: "+"$"+totalcost.toString() +" Bn.",
          gaugeWidthScale: 0.6,
          counter: true,
          relativeGaugeSize: true,
          levelColors: ["#eb2d1f"],
          titleMinFontSize: "6px",
          titleFontColor: ["#999"],
          color: ["#eb2d1f"]   
      });      
        }
             
        else {
        
        // parseFloat(data[0].ProfitorLoss).toFixed(2)
        var g2 = new JustGage({
          id: 'FZgauge',
          value: profit,
          min: 0,
          max: 1.1 ,
          maxTxt: "1.1 Bn.",
          textRenderer: function(val) {
            return "$"+profit.toString()+" Bn.";  
          },
        
          pointer: false,
          label: "Total Costs: "+"$"+totalcost.toString() +" Bn.",
          gaugeWidthScale: 0.6,
          counter: true,
          relativeGaugeSize: true,
          levelColors: ["#125ee3"],
          titleMinFontSize: "6px",
          titleFontColor: ["#999"],
          color: ["#125ee3"]
        });     
      }
  // .......... information box.......... //
    d3.select("#fzmetadata").append('div')
      .text(Text)
      .attr('padding',"8px")
      .attr("font-weight","1000")   
    d3.select("#olycity").text(Title);
  });      
}





// Setup initial function
function init() {
  var intyear = "1976";
  buildgageplot(intyear);

}

function myFunction3() {
  d3.select('#FZgauge').html(" ");
  d3.select("#fzmetadata").html(" ");
  var newselect = document.getElementById("selDataset").value;
  if (newselect > " ") {
    console.log("I choose "  + newselect);
     }  
    
  buildgageplot(newselect);
  }

init();