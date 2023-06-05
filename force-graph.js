import * as d3 from "d3"

const chart_param = {
    width: 600,
    height: 500,
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        center: 150
    }
}

const x = d3.scaleLinear()
            .domain([0, 1])
            .range([chart_param.margin.left, chart_param.width - chart_param.margin.right])
const y = d3.scaleLinear()
            .domain([0, 1])
            .range([chart_param.height - chart_param.margin.bottom, chart_param.margin.top])

// MOCK DATA DEFINITION
const node_data = [...Array(250)].map(() => ({
    x: x(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
    y: y(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
    r: Math.max(3, d3.randomNormal(8,5)())
}))

let draw_nodes = (svg, node_data, edge_data, w_r, w_l) => {
    let edge = null;
    if (edge_data) {
        edge = svg.selectAll(".edge")
      .data(edge_data).enter()
      .append("line")
      .classed("edge", true)
      .attr("x1", d => node_data[d.source].x)
      .attr("y1", d => node_data[d.source].y)
      .attr("x2", d => node_data[d.target].x)
      .attr("y2", d => node_data[d.target].y)
      .style("stroke", w_l ? "#bbb" : "none");
    }

    const node = svg.selectAll(".node")
    .data(node_data).enter()
    .append("circle")
    .classed("node", true)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => w_r ? d.r : 6);

    return [node, edge];
}

const distance = ([x1, y1], [x2, y2]) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
const radius = 220;

export function forceGraph() {
    const svg = d3.select(".dots").append("svg").attr("width", chart_param.width).attr("height", chart_param.height);
    const nodes = node_data.map(d => Object.create(d));
    
    const simulation = d3.forceSimulation(nodes)
    .force("collide", d3.forceCollide().radius(d => d.r + 4))
    .force("charge", d3.forceManyBody().strength(d => -d.r / 3))
    .force("bounding-circle", () => {
        nodes.forEach(node => {
            // if node is outside of the bounding circle,
            // move node just inside circle along same polar axis
            if (distance([node.x, node.y], [x(0.5), y(0.5)]) > radius) {
                const theta = Math.atan((node.y - y(0.5)) / (node.x - x(0.5)));
                node.x = x(0.5) + radius  * Math.cos(theta) * (node.x < x(0.5) ? -1 : 1);
                node.y = y(0.5) + radius  * Math.sin(theta) * (node.x < x(0.5) ? -1 : 1);
            }
        })
    });
    
    // draw nodes (with no radius and edges)
    const [node, edge] = draw_nodes(svg, nodes, null, false, false);
    
    // update each node upon simulation tick
    simulation.on("tick", () => {
        node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    });

    return svg.node();
}