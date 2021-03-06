function transform(users, option) {
	var nodes = [], links = [];

	users.forEach(user => {
		//user.domains = user.domains ? user.domains.split('\n') : [];
		if (option == "D")
			return (user.domainList||[]).forEach(d => links.push({ source: user.department, target: d }));

		nodes.push({
			id: user.id,
			label: user.firstName,
			group: 1,
			level: 1,
			avatar: user.avatar || 'https://image.flaticon.com/icons/png/512/149/149071.png'
		});

		if (option == "A" || option == "C") {
			links.push({ source: user.id, target: user.department });
		} else {
			(user.domainList||[]).forEach(d => links.push({ source: user.id, target: d }));
		}
	});

	if (option != "C" || option == "D") {
		const allDomain = users.reduce((acc, u) => acc.concat(u.domainList), []);
		new Set(allDomain).forEach(d =>
			nodes.push({ id: d, label: d, group: 3, level: 3 })
		);
	}

	if (option == "A" || option == "D" || option == "C") {
		new Set(users.map(u => u.department)).forEach(d =>
			nodes.push({ id: d, label: d, group: 2, level: 2 })
		);
	}
	//console.log(nodes, links);
	return { nodes, links };
}

function graph(el, { nodes, links }, options) {
	var width = 1000,
		height = 1000;

	d3
		.select(el)
		.selectAll("g")
		.remove();

	var svg = d3
		.select(el)
		.attr("viewBox", `0 0 ${height} ${width}`)
		.call(d3.zoom().on("zoom", ()=>svg.attr("transform", d3.event.transform)))
		.append("g");

	var color = [
		"#2B2D42",
		"#29293d",
		"#8B0000",
		"#808080",
		"#fc8d62",
		"#e78ac3"
	];

	var font_size = ["0.75em", "1em", "0.9em"];
	var radius = 2;
	var linkForce = d3
		.forceLink()
		.id(l => l.id)
		.distance(width * 0.1);

	var simulation = d3
		.forceSimulation()
		.force("link", linkForce)
		.force("charge", d3.forceManyBody().strength(-100))
		.force("center", d3.forceCenter(width / 2, height / 2))
		.force("y", d3.forceY(0.01))
		.force("x", d3.forceX(0.01));

	var dragDrop = d3
		.drag()
		.on("start", n => {
			n.fx = n.x;
			n.fy = n.y;
		})
		.on("drag", function (node) {
			simulation.alphaTarget(0.7).restart();
			node.fx = d3.event.x;
			node.fy = d3.event.y;
		})
		.on("end", function (node) {
			if (!d3.event.active) {
				simulation.alphaTarget(0);
			}
			node.fx = null;
			node.fy = null;
		});

	var linkElements = svg
		.selectAll("line")
		.data(links)
		.enter()
		.append("path")
		.attr("class", "links")
		.attr("stroke", "rgba(50, 50, 50, 0.2)")
		.attr("stroke-width", "1px");

	linkElements.style("fill", "none");

	var nodeElements = svg
		.selectAll(".node")
		.data(nodes)
		.enter()
		.append("g")
		.attr("class", "node")
		.call(dragDrop);

	svg
		.append("defs")
		.selectAll(".node-pattern")
		.data(nodes)
		.enter()
		.append("pattern")
		.attr("id", d => (d.id||'').toLowerCase().replace(/ /g, "-"))
		.attr("height", "100%")
		.attr("width", "100%")
		.attr("patternContentUnits", "objectBoundingBox")
		.append("image")
		.attr("height", 1)
		.attr("width", 1)
		.attr("xlink:href", d => [d.avatar, "", ""][d.level - 1]);

	nodeElements
		.append("circle")
		.attr("r", n => (n.level == 1 ? "3%" : "0"))
		.attr("fill", d => "url(#" + (d.id||'').toLowerCase().replace(/ /g, "-") + ")")
		.on("mouseover", mouseOver)
		.on("mouseout", mouseOut)
		.on("click", options.onclick);

	var textElements = svg
		.append("g")
		.selectAll("text")
		.data(nodes)
		.enter()
		.append("text")
		.text(node => (node.label||'').substring(0, 15))
		.attr("font-size", function (node) {
			return font_size[node.level - 1];
		})
		.attr("font-weight", function (node) {
			return ["lighter", 700, 350][node.level - 1];
		})
		.attr("uid", function (node) {
			return node.id;
		})
		.attr("text-anchor", function (node) {
			return ["start", "middle", "middle"][node.level - 1];
		})
		.attr("dy", d => {
			if (d.level == 1) return height * 0.045;
		})
		.attr("dx", d => {
			if (d.level == 1) return width * -0.025;
		})
		.attr("fill", function (node) {
			return color[node.level];
		})
		.call(dragDrop)
		.on("click", options.onclick);

	textElements.exit().remove();

	function mouseOver(n, i) {
		if (n.level != 2) {
			d3
				.select(this)
				.transition()
				.attr("cursor", function (d) {
					if (d.level == "1") return "pointer";
				});
		}

		var neighbors = getNeighbors(n);
		linkElements.attr("stroke", function (link) {
			return getLinkColor(n, link);
		});

		linkElements.attr("stroke-width", function (link) {
			return getLinkWidth(n, link);
		});

		textElements.attr("font-weight", function (node) {
			return n.id == node.id ? 700 : ["lighter", 700, 350][node.level - 1];
		});

		textElements.attr("fill", function (node) {
			return getTextColor(node, neighbors);
		});

		// textElements.attr("font-size", function(d) {
		//	 return n.id == d.id ? "1.5em" : font_size[d.level - 1];
		// });

		//CIRCLE
		//this.setAttribute("r", circleWidth+5)
	}

	function mouseOut(n) {
		//	 console.log(node)
		if (n.level != 2) {
			d3
				.select(this)
				.transition()
				.attr("x", function (d) {
					return -width / 35;
				})
				.attr("y", function (d) {
					return -width / 30;
				})
				.attr("height", "7.5%")
				.attr("width", "7.5%");
		}
		linkElements
			.attr("stroke-width", 1)
			.attr("stroke", "rgba(50, 50, 50, 0.2)");

		textElements
			.attr("font-weight", function (node) {
				return ["lighter", 700, 350][node.level - 1];
			})
			.attr("fill", function (node) {
				return color[node.level];
			});
	}

	function getLinkColor(node, link) {
		return isNeighborLink(node, link) ? "#c1c1d7" : "#E5E5E5";
	}

	function getLinkWidth(node, link) {
		return isNeighborLink(node, link) ? 3 : 1;
	}

	function getTextColor(node, neighbors) {
		if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
			return "#000059";
		} else return color[node.level];
	}

	//neighbours
	function getNeighbors(node) {
		return links.reduce(
			function (neighbors, link) {
				if (link.target.id === node.id) {
					neighbors.push(link.source.id);
				} else if (link.source.id === node.id) {
					neighbors.push(link.target.id);
				}
				return neighbors;
			},
			[node.id]
		);
	}

	function isNeighborLink(node, link) {
		return link.target.id === node.id || link.source.id === node.id;
	}

	simulation.nodes(nodes).on("tick", () => {
		linkElements.attr("d", function (d) {
			var dx = d.target.x - d.source.x,
				dy = d.target.y - d.source.y,
				dr = Math.sqrt(dx * dx + dy * dy);
			return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
		});
		nodeElements
			.attr("cx", (d) => d.x = Math.max(radius, Math.min(width - radius, d.x)))
			.attr("cy", (d) => d.y = Math.max(radius, Math.min(height - radius, d.y)))
		nodeElements.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
		textElements.attr("x", node => node.x).attr("y", node => node.y);
		//TODO why this ?
		//nodes[0].x = width / 2;
		//nodes[0].y = height / 2;
	});
	simulation.force("link").links(links);
}
export { transform, graph }
