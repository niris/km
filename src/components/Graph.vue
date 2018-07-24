<template>
  <div>
    <aside class="sidebar" id=userDialog hidden>
      <nav>
        <button v-on:click=closeUserDialog>x</button>
      </nav>
      <User :id=user._id summary=true></User>
      <router-link :to="'/user/'+ user._id" tag="button">ไปที่ Profil</router-link>

    </aside>
    <svg id=graph></svg>
	</div>
</template>

<script>
import User from "@/components/User";
export default {
  components: { User },
  props: ["id"],
  data: () => ({
    user: {}
  }),
  mounted() {
    this.sfetch(this.id ? `/api/user/${this.id}/proj` : "/api/user/proj")
      .then(r => r.json())
      .then(users =>
        this.graph(
          this.id ? this.transform(users, true) : this.transform(users, false)
        )
      );
  },

  methods: {
    transform(users, ego) {
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
        if (ego) {
          links.push({
            source: user._id,
            target: user.department,
            relation: "work",
            strenght: 1
          });

          department_hash[user.department] = true;
          links.push({
            source: user._id,
            target: user.department,
            relation: "work",
            strenght: 1
          });
        }
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
      });

      Object.keys(domains_hash).forEach(d =>
        nodes.push({ id: d, label: d, group: 3, level: 3 })
      );

      if (ego) {
        Object.keys(department_hash).forEach(d =>
          nodes.push({ id: d, label: d, group: 2, level: 2 })
        );
      }

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
        .attr("viewBox", `0 0 ${width} ${height}`)
        .call(
          d3.zoom().on("zoom", function() {
            svg.attr("transform", d3.event.transform);
          })
        )
        .append("g");

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
      var radius = 2; // USELESS !!
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

      var defs = svg
        .append("defs")
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
        .attr(
          "xlink:href",
          d =>
            [
              d.avatar ||
                "https://image.flaticon.com/icons/png/512/149/149071.png",
              "",
              ""
            ][d.level - 1]
        );

      nodeElements
        .append("circle")
        .attr("r", n => (n.level == 1 ? "3%" : "0"))
        .attr(
          "fill",
          d => "url(#" + d.id.toLowerCase().replace(/ /g, "-") + ")"
        )
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .on("click", this.showpopup);

      var textElements = svg
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
          if (d.level == 1) return height * 0.045;
        })
        .attr("dx", d => {
          if (d.level == 1) return width * -0.025;
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
          return n.id == d.id ? "1.5em" : font_size[d.level - 1];
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
        return isNeighborLink(node, link) ? "#c1c1d7" : "#E5E5E5";
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
        linkElements.attr("d", function(d) {
          var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
          return (
            "M" +
            d.source.x +
            "," +
            d.source.y +
            "A" +
            dr +
            "," +
            dr +
            " 0 0,1 " +
            d.target.x +
            "," +
            d.target.y
          );
        });
        /* .attr("x1", function(link) {
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
          })*/
        //nodeElements.attr("cx", node => node.x).attr("cy", node => node.y)

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
            userDialog.hidden = false;
          });
      }
    },
    closeUserDialog() {
      userDialog.hidden = true;
    }
  }
};
</script>
<style scoped>
aside {
  margin: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 80vw;
  max-width: 400px;
  z-index: 100;
  padding: 10em 0 0 0;
  background: rgba(255, 255, 255, 0.9);
  overflow: scroll;
  box-shadow: black 0 0 1em;
}
aside nav {
  position: absolute;
  top: 6em;
  right: 1em;
}

@media screen and (max-width: 960px) {
  .fab {
    right: 0.5em;
  }
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
