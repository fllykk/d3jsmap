
function loader(conf) {
  return function() {
    var radius = Math.min(conf.width, conf.height) / 2;
    var tau = 2 * Math.PI;

    var arc = d3.svg.arc()
            .innerRadius(radius*0.8)
            .outerRadius(radius*0.9)
            .startAngle(0);

    var svg = d3.select(conf.container).append("svg")
        .attr("id", conf.id)
        .attr("width", conf.width)
        .attr("height", conf.height)
        .append("g")
        .attr("transform", "translate(" + conf.width / 2 + "," + conf.height / 2 + ")")

    var background = svg.append("path")
            .datum({endAngle: 0.33*tau})
            .style("fill", "#4D4D4D")
            .attr("d", arc)
            .call(spin, 1500)

    function spin(selection, duration) {
        selection.transition()
            .ease("linear")
            .duration(duration)
            .attrTween("transform", function() {
                return d3.interpolateString("rotate(0)", "rotate(360)");
            });

        setTimeout(function() { spin(selection, duration); }, duration);
    }



  };
}
