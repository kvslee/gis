var width = 960,
    height = 700;

var projection = d3.geo.mercator()
    .center([130, 37])
    .scale(4000);
// .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("kr.json", function(error, kr) {
    if (error) return console.error(error);

        var subunits = topojson.feature(kr, kr.objects.subunits_kr),
            places = topojson.feature(kr, kr.objects.places_kr);


        svg.selectAll(".subunit")
            .data(subunits.features)
            .enter().append("path")
            .attr("class", function(d) { return "subunit " + d.id; })
            .attr("d", path);

    /*      svg.append("path")
            .datum(topojson.mesh(kr, kr.objects.subunits, function(a, b) { return a !== b; }))
            .attr("d", path)
            .attr("class", "subunit-boundary");*/



        svg.selectAll(".subunit-label")
            .data(subunits.features)
            .enter().append("text")
            .attr("class", function(d) { return "subunit-label " + d.id; })
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.properties.name; });


        svg.append("path")
            .datum(places)
            .attr("d", path)
            .attr("class", "place");


        svg.selectAll(".place-label")
            .data(places.features)
            .enter().append("text")
            .attr("class", "place-label")
            .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
            .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
            .attr("dy", ".35em")
            .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
            .text(function(d) { return d.properties.name; });


});
