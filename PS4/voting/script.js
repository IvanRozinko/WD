google.charts.load("current", {"packages": ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let data = new google.visualization.DataTable();
    let breeds = [];
    //getting data from json file
    $.getJSON("json/results.json", function (jsonData) {
        //each pair key -> val from json push into 2 dimensional array
        $.each(jsonData, function (key, val) {
            breeds.push([key, val]);
        });
        data.addColumn("string", "Breed");
        data.addColumn("number", "Rating");
        data.addRows(breeds);

        var options = {
            "title": "Most popular breeds",
            "width": 700,
            "height": 900
        };
        const chart = new google.visualization.PieChart(document.getElementById("chart_div"));
        chart.draw(data, options);
    });
}