"use strict";

var _ = require("./lodash"),
    addLabel = require("./label/add-label"),
    util = require("./util"),
    d3 = require("./d3");

module.exports = createEdgeLabels;

function createEdgeLabels(selection, g) {
  var svgEdgeLabelsUpdate = selection.selectAll("g.edgeLabel")
    .data(g.edges(), function(e) { return util.edgeToId(e); })
    .classed("update", true);

  /* -FIX- d3v4: during render updates, can we be smarter about this remove-and-recreate? */
  svgEdgeLabelsUpdate.selectAll("*").remove();

  var svgEdgeLabelsEnter = svgEdgeLabelsUpdate.enter()
    .append("g")
      .classed("edgeLabel", true)
      .style("opacity", 0);

  var svgEdgeLabelsMerge = svgEdgeLabelsEnter.merge(svgEdgeLabelsUpdate);
  svgEdgeLabelsMerge.each(function(e) {
    var edge = g.edge(e),
        label = addLabel(d3.select(this), g.edge(e), 0, 0).classed("label", true),
        bbox = label.node().getBBox();

    if (edge.labelId) { label.attr("id", edge.labelId); }
    if (!_.has(edge, "width")) { edge.width = bbox.width; }
    if (!_.has(edge, "height")) { edge.height = bbox.height; }
  });

  util.applyTransition(svgEdgeLabelsUpdate.exit(), g)
    .style("opacity", 0)
    .remove();

  return svgEdgeLabelsMerge; /* -FIX d3v4: is this (the merge) what should be returned? */
}
