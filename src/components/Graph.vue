<template>
	<div>
    <User id=sirin></User>
    <svg id=graph></svg>
		<div class = "sidebar" id=userDialog  style="display:none">
      <button id="button-close" v-on:click=closeUserDialog>x</button><br>
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
    if (!this.id) {
      this.sfetch("/api/user/proj")
        .then(r => r.json())
        .then(users => this.graph(this.transform(users)));
    } else {
      console.log("id : ", this.id);
      this.sfetch(`/api/user/${this.id}/proj`)
        .then(r => r.json())
        .then(users => this.graph(this.transform(users)));
    }
  },
  methods: {
    transform(users) {
      var nodes = [],
        links = [],
        domains_hash = {},
        department_hash = {};

      users.forEach(user => {
        nodes.push({ id: user._id, label: user.firstName, group: 1, level: 1 });
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
      var width = window.innerWidth,
        height = window.innerHeight,
        circleWidth = 10;
      //TODO auto resize when change windows size
      var svg = d3
        .select("#graph")
        //.attr("width", width)
        //.attr("height", height);
        // simulation setup with all forces
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", 0 + " " + 0 + " " + width + " " + height * 1.5)
        .classed("svg-content-responsive", true);

      var color = d3.scaleOrdinal([
        "#1D3557",
        "#66c2a5",
        "#d11345",
        "#fc8d62",
        "#8da0cb",
        "#e78ac3",
        "#ffd92f",
        "#e5c494"
      ]);

      var font_size = [18, 32, 48];

      var linkForce = d3
        .forceLink()
        .id(l => l.id)
        .strength(l => l.strenght);
      var simulation = d3
        .forceSimulation()
        .force("link", linkForce)
        .force(
          "forceX",
          d3
            .forceX()
            .strength(0.1)
            .x(width * 0.5)
        )
        .force(
          "forceY",
          d3
            .forceY()
            .strength(0.1)
            .y(height * 0.5)
        )
        .force(
          "center",
          d3
            .forceCenter()
            .x(width * 0.5)
            .y(height * 0.5)
        )
        .force("charge", d3.forceManyBody().strength(-10000));

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
        .attr("gravity", 0.05)
        .attr("stroke-width", 1)
        .attr("stroke", "rgba(50, 50, 50, 0.2)");

      var nodeElements = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(dragDrop);

      nodeElements
        .append("image")
        .attr("xlink:href", function(d) {
          return [
            "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png",
            "http://www.iconninja.com/files/766/572/903/home-house-building-icon.svg",
            "https://theplantium.com/wp-content/uploads/2016/10/Knowledge-1.png"
          ][d.level - 1];
        })
        .attr("x", -60)
        .attr("y", -60)
        .attr("width", 100)
        .attr("height", 100)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .on("click", this.showpopup);

      /*      const nodeElements = svg
        .append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", getNodeSize)
        .attr("fill", getNodeColor)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .on("click", this.showpopup)
        .call(dragDrop)*/
      //.append("image")
      //attr("xlink:href", "https://github.com/favicon.ico")
      //.attr("x", 50)
      //.attr("y", 50)
      //.attr("width", 100)
      //.attr("height", 120)

      const textElements = svg
        .append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(node => node.label)
        .attr("font-size", function(node) {
          return [18, 32, 48][node.level - 1];
        })
        .attr("dx", -50)
        .attr("dy", 75)
        .attr("font-weight", function(node) {
          return ["lighter", 200, 500][node.level - 1];
        })
        .attr("uid", function(node) {
          return node.id;
        });

      //.attr("text-anchor", "middle");

      function mouseOver(n, i) {
        d3
          .select(this)
          .transition()
          .attr("x", function(d) {
            return -90;
          })
          .attr("y", function(d) {
            return -90;
          })
          .attr("height", 150)
          .attr("width", 150)
          .attr("cursor", function(d) {
            if (d.level == "1") return "pointer";
          });

        var neighbors = getNeighbors(n);
        linkElements.attr("stroke", function(link) {
          return getLinkColor(n, link);
        });

        linkElements.attr("stroke-width", function(link) {
          return getLinkWidth(n, link);
        });

        nodeElements.attr("fill", function(node) {
          return getNodeColor(node, neighbors);
        });

        textElements.attr("fill", function(node) {
          return getTextColor(node, neighbors);
        });

        textElements.attr("font-size", function(d) {
          return n.id == d.id ? "3em" : font_size[d.level - 1];
        });

        //CIRCLE
        //this.setAttribute("r", circleWidth+5)
      }

      function mouseOut(n) {
        //   console.log(node)
        d3
          .select(this)
          .transition()
          .attr("x", function(d) {
            return -60;
          })
          .attr("y", function(d) {
            return -60;
          })
          .attr("height", 100)
          .attr("width", 100);

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
        return isNeighborLink(node, link) ? 5 : 1;
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
        //  nodeElements.attr("transform", this.nodeTransform);
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

        nodeElements.attr("cx", node => node.x).attr("cy", node => node.y);

        nodeElements.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        textElements.attr("x", node => node.x).attr("y", node => node.y);
        nodes[0].x = width / 2;
        nodes[0].y = height / 2;
      });

      simulation.force("link").links(links);
    } /*,

     nodeTransform(d) {
    return "translate(" + d.x + "," + d.y + ")";
   }*/,

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
#userDialog {
  position: fixed;
  float: center;
}

#button-close {
  position: absolute;
  top: 5px;
  right: 0px;
  background-color: rgb(84, 106, 136);
}

.router a {
  position: absolute;
  bottom: 5%;
  right: 50px;
  color: rgb(231, 234, 236);
}

.img-container {
  position: relative;
  margin: auto;
  width: 200px;
  height: 120px;
  margin-bottom: 150px;
}

/* resize images */
.img-container img {
  width: 100%;
  height: auto;
}

dl {
  position: absolute;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  line-height: 2.5;
}
dt {
  position : relative;
  float: left;
  clear: left;
  width: 45%;
  color: rgb(231, 234, 236);
  text-indent: 25px;
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

.sidebar {
  height: 88%;
  width: 30%;
  position: relative;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #1d3557;
  margin-top: 5%;
  margin-right :1%;
}

.sidenbar a:hover {
  color: #f1f1f1;
}

#graph {
  position: relative;
  width: 100%;
  vertical-align: center;
  overflow: auto;
}

g.links {
  position: relative;
  width: 100%;
  height: 50%;
}

</style>
