//create array of arrays from ejs passed object
var pOptions = [];

pollOptions.forEach(function(opt) {
    pOptions.push([opt.name, opt.count]);

});


google.charts.load('current', {'packages':['corechart']});


// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    var chartOptions = [];
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');

    data.addRows(pOptions);

    // Set chart options
    var options = {
        'width': 400,
        'height': 350,

    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

}
