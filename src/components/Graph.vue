<template>
	<div>
		<div class = "sidebar" id=userDialog  style="display:none" v-on:click=closeUserDialog>
      <div class="img-container">
			<img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png">
      </div>
      <dl>
  			<dt>First name : </dt>
  				<dd>{{user.firstName}}</dd>
  			<dt>Last name : </dt>
  				<dd>{{user.lastName}}</dd>
				<dt>Function : </dt>
  				<dd>{{user.fonction}}</dd>
				<dt>Department : </dt>
  				<dd>{{user.department}}</dd>
				<dt>Expert domain : </dt>
          <dd><ul class=tags><li v-for="u in user.domain" :key=u>{{u}}</li></ul></dd>
           <!--!<dd>{{user.domain}}</dd> -->
				<dt>Knowledge : </dt>
          <dd><ul class=tags><li v-for="u in user.Knowledge" :key=u>{{u}}</li></ul></dd>
       <!-- <dt>Publications : </dt>
         <dd v-for="u in user.publications" :key=u>{{u}}</dd>
          <dd><ul><li v-for="u in user.publications" :key=u>{{u}}</li></ul></dd>
        -->
				 <dt>Contact : </dt>
  				<dd>{{user.email}}</dd>
			</dl>
      <div class="router">
      <router-link :to="'/user/'+ user._id"> More information</router-link>
      </div>
		</div>
    <svg id=graph></svg>
	</div>
</template>

<script>
//import User from "@/components/User";
export default {
  //components: { User },
  props: ["id"],
  data: () => ({
    user: {},
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
  }),
  mounted() {
    this.sfetch(this.id ? `/api/user/${this.id}/proj` : "/api/user/proj")
      .then(r => r.json())
      .then(users => this.graph(this.transform(users)));
  },
  methods: {
    transform(users) {
      var nodes = [],
        links = [],
        domains_hash = {},
        department_hash = {};

      users.forEach(user => {
        nodes.push({
          id: user._id,
          label: user.firstName,
          group: 1,
          level: 1,
          avatar: user.avatar
        });
        links.push({
          source: user._id,
          target: user.department,
          relation: "work",
          strenght: 1
        });
        if (user.domain.constructor == String)
          user.domain = user.domain.split(/\n/); // TODO REMOVE
        user.domain.forEach(d => {
          domains_hash[d] = true;
          links.push({
            source: user._id,
            target: d,
            relation: "competency",
            strenght: 1
          });
        });

        department_hash[user.department] = true;
        links.push({
          source: user._id,
          target: user.department,
          relation: "work",
          strenght: 1
        });
      });
      Object.keys(domains_hash).forEach(d =>
        nodes.push({ id: d, label: d, group: 3, level: 3 })
      );
      Object.keys(department_hash).forEach(d =>
        nodes.push({ id: d, label: d, group: 2, level: 2 })
      );
      //console.log(domains_hash.keys, department_hash.keys, nodes, links);
      return { nodes, links };
    },
    graph({ nodes, links }) {
      var elem = document.querySelector("#graph");
      var width = elem.clientWidth,
        height = elem.clientHeight;

      var svg = d3
        .select("#graph")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);
      //.attr("preserveAspectRatio", "xMidYMid meet")
      //.classed("svg-content-responsive", true);

      window.addEventListener("resize", function() {
        var elem = document.querySelector("#graph");
        (width = elem.clientWidth), (height = elem.clientHeight);
        svg = d3
          .select("#graph")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", `0 0 ${width} ${height}`);
      });
      
      var color = d3.scaleOrdinal([
        "#2B2D42",
        "#2B2D42",
        "#972c02",
        "#66c2a5",
        "#fc8d62",
        "#e78ac3"
      ]);

      var font_size = ["1em", "1em", "1.2em"];
      var radius = 2;// USELESS !!
      var linkForce = d3
        .forceLink()
        .id(l => l.id)
        .strength(l => l.strenght)
        .distance(width * 0.15);

      var simulation = d3
        .forceSimulation()
        .force("link", linkForce)
        .force("charge", d3.forceManyBody().strength(-width))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY(0.01))
        .force("x", d3.forceX(0.01));

      var dragDrop = d3
        .drag()
        .on("start", n => {
          n.fx = n.x;
          n.fy = n.y;
        })
        .on("drag", function(node) {
          simulation.alphaTarget(0.7).restart();
          node.fx = d3.event.x;
          node.fy = d3.event.y;
        })
        .on("end", function(node) {
          if (!d3.event.active) {
            simulation.alphaTarget(0);
          }
          node.fx = null;
          node.fy = null;
        });

      var linkElements = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", 1)
        .attr("stroke", "rgba(50, 50, 50, 0.2)");

      var nodeElements = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(dragDrop);

      var defs = svg.append("defs")
        .selectAll(".node-pattern")
        .data(nodes)
        .enter()
        .append("pattern")
        .attr("id", d => d.id.toLowerCase().replace(/ /g, "-"))
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("xlink:href", d =>
            [
              d.avatar ||
                "https://image.flaticon.com/icons/png/512/149/149071.png",
              "",
              ""
            ][d.level - 1]
        );

      nodeElements
        .append("circle")
        .attr("r", n => (n.level == 1 ? "5%" : "0"))
        .attr(
          "fill",
          d => "url(#" + d.id.toLowerCase().replace(/ /g, "-") + ")"
        )
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .on("click", this.showpopup);
      const textElements = svg
        .append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(node => node.label)
        .attr("font-size", function(node) {
          return font_size[node.level - 1];
        })
        .attr("font-weight", function(node) {
          return ["lighter", 700, 350][node.level - 1];
        })
        .attr("uid", function(node) {
          return node.id;
        })
        .attr("text-anchor", function(node) {
          return ["start", "middle", "middle"][node.level - 1];
        })
        .attr("dy", d => {
          if (d.level == 1) return height * 0.075;
        })
        .attr("fill", function(node) {
          return color(node.level);
        })
        .call(dragDrop)
        .on("click", this.showpopup);
      textElements.exit().remove();

      function mouseOver(n, i) {
        if (n.level != 2) {
          d3
            .select(this)
            .transition()
            .attr("cursor", function(d) {
              if (d.level == "1") return "pointer";
            });
        }

        var neighbors = getNeighbors(n);
        linkElements.attr("stroke", function(link) {
          return getLinkColor(n, link);
        });

        linkElements.attr("stroke-width", function(link) {
          return getLinkWidth(n, link);
        });

        // textElements.attr("fill", function(node) {
        //   return getTextColor(node, neighbors);
        // });

        textElements.attr("font-size", function(d) {
          return n.id == d.id ? "3em" : font_size[d.level - 1];
        });

        //CIRCLE
        //this.setAttribute("r", circleWidth+5)
      }

      function mouseOut(n) {
        //   console.log(node)
        if (n.level != 2) {
          d3
            .select(this)
            .transition()
            .attr("x", function(d) {
              return -width / 35;
            })
            .attr("y", function(d) {
              return -width / 30;
            })
            .attr("height", "7.5%")
            .attr("width", "7.5%");
        }
        linkElements
          .attr("stroke-width", 1)
          .attr("stroke", "rgba(50, 50, 50, 0.2)");

        textElements.attr("font-size", function(d) {
          return font_size[d.level - 1];
        });
      }
      function getNodeColor(node, neighbors) {
        /* if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
          return node.level == 1 ? "black" : "blue";
        }*/
        return color(node.level);
      }

      function getNodeSize(node) {
        return circleWidth * [0, 0.8, 1, 1.5][node.level];
      }

      function getLinkColor(node, link) {
        return isNeighborLink(node, link) ? "#1D3557" : "#E5E5E5";
      }

      function getLinkWidth(node, link) {
        return isNeighborLink(node, link) ? 3 : 1;
      }

      function getTextColor(node, neighbors) {
        return Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1
          ? "#1D3557"
          : "black";
      }
      //neighbours
      function getNeighbors(node) {
        return links.reduce(
          function(neighbors, link) {
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

      function selectNode(selectedNode) {
        var neighbors = getNeighbors(selectedNode);
        nodeElements.attr("fill", function(node) {
          return getNodeColor(node, neighbors);
        });
        textElements.attr("fill", function(node) {
          return getTextColor(node, neighbors);
        });
        linkElements.attr("stroke", function(link) {
          return getLinkColor(selectedNode, link);
        });
      }

      simulation.nodes(nodes).on("tick", () => {
        linkElements
          .attr("x1", function(link) {
            return link.source.x;
          })
          .attr("y1", function(link) {
            return link.source.y;
          })
          .attr("x2", function(link) {
            return link.target.x;
          })
          .attr("y2", function(link) {
            return link.target.y;
          });

        //nodeElements.attr("cx", node => node.x).attr("cy", node => node.y);

        nodeElements
          .attr("cx", function(d) {
            return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
          })
          .attr("cy", function(d) {
            return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
          });

        nodeElements.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        textElements.attr("x", node => node.x).attr("y", node => node.y);
        nodes[0].x = width / 2;
        nodes[0].y = height / 2;
      });

      simulation.force("link").links(links);
    },

    showpopup(node) {
      if (node.level == 1) {
        this.sfetch("/api/user/" + node.id)
          .then(r => r.json())
          .then(json => {
            this.user = json;
            userDialog.style.display = "block";
          });
      }
    },
    closeUserDialog() {
      userDialog.style.display = "none";
    }
  }
};
</script>
<style scoped>
.sidebar {
  position: fixed;
  float: left;
  width: 30%;
  height: auto;
  z-index: 1;
  background-color: #1d3557;
  top: 6em;
  bottom: 2em;
  left: 0%;
}

.sidenbar a:hover {
  color: #f1f1f1;
}

#button-close {
  position: relative;
  top: 1%;
  right: -1%;
  background-color: rgb(84, 106, 136);
}

.router a {
  position: relative;
  bottom: -10%;
  right: -50%;
  color: rgb(231, 234, 236);
  font-size: 1.5vw;
}

.img-container {
  position: relative;
  width: 45%;
  height: auto;
  margin: auto;
  z-index: 1;
  margin-top: 1em;
  margin-bottom: 1em;
}

/* resize images */
.img-container img {
  height: auto;
  width: 100%;
}

dl {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  line-height: 1.5em;
  font-size: 1.5vw;
}

@media screen and (min-width: 700px) {
  dl {
    font-size: 1em;
  }

  .router a {
    font-size: 1em;
  }
}

dt {
  position: relative;
  float: left;
  clear: left;
  width: 45%;
  color: rgb(231, 234, 236);
  text-indent: 1%;
  font-weight: bold;
}
dd {
  width: 65%;
  margin-left: 45%;
  color: rgb(231, 234, 236);
}

dd:after {
  content: "\a";
  white-space: pre;
}

#graph {
  position: relative;
  width: 100%;
  height: 100vh;
  vertical-align: center;
  overflow: hidden;
  padding: 0;
}
</style>
