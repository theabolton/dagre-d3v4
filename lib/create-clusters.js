var util = require("./util"),
    addLabel = require("./label/add-label");

module.exports = createClusters;

function createClusters(selection, g) {
  var clusters = g.nodes().filter(function(v) { return util.isSubgraph(g, v); }),
      svgClustersUpdate = selection.selectAll("g.cluster")
        .data(clusters, function(v) { return v; });

  /* -FIX- d3v4: during render updates, can we be smarter about this remove-and-recreate? */
  svgClustersUpdate.selectAll("*").remove();

  var svgClustersEnter = svgClustersUpdate.enter()
    .append("g")
      .attr("class", "cluster")
      .attr("id",function(v){
          var node = g.node(v);
          return node.id;
      })
      .style("opacity", 0);

  var svgClustersMerge = svgClustersEnter.merge(svgClustersUpdate);

  util.applyTransition(svgClustersMerge, g)
    .style("opacity", 1);

  svgClustersMerge.each(function(v) {
    var node = g.node(v),
        thisGroup = d3.select(this);
    d3.select(this).append("rect");
    var labelGroup = thisGroup.append("g").attr("class", "label");
    addLabel(labelGroup, node, node.clusterLabelPos);
  });

  svgClustersMerge.selectAll("rect").each(function(c) {
    var node = g.node(c);
    var domCluster = d3.select(this);
    util.applyStyle(domCluster, node.style);
  });

  util.applyTransition(svgClustersUpdate.exit(), g)
    .style("opacity", 0)
    .remove();

  return svgClustersMerge; /* -FIX d3v4: is this (the merge) what should be returned? */
}
