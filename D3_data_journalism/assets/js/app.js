// @TODO: YOUR CODE HERE!


d3.csv('data.csv', function (data) {

    let body = d3.select('body');
    let margin = { top: 50, right: 50, bottom: 50, left: 50 };
    let h = 500 - margin.top - margin.bottom;
    let w = 500 - margin.left - margin.right;
    
      // Scales
    let colorScale = d3.scale.category20();
    let xScale = d3.scale.linear()
        .domain([
          d3.min([0,d3.min(data,d => d.obesity)]),
          d3.max([0,d3.max(data,d => d.obesity )])
          ])
      .range([0,w]);
    let yScale = d3.scale.linear()
        .domain([
          d3.min([0,d3.min(data, d => d.income )]),
          d3.max([0,d3.max(data, d => d.income )])
          ])
      .range([h,0]);
      // SVG
      let svg = body.append('svg')
          .attr('height',h + margin.top + margin.bottom)
          .attr('width',w + margin.left + margin.right)
        .append('g')
          .attr('transform','translate(' + margin.left + ',' + margin.top + ')');
      // X-axis
      let xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(5)
        .orient('bottom');
    // Y-axis
      let yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(5)
        .orient('left');
    // Circles
    let circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',function (d) { return xScale(d.obesity) })
        .attr('cy',function (d) { return yScale(d.income) })
        .attr('r','10')
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill',function (d,i) { return colorScale(i) })
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',20)
            .attr('stroke-width',3)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',10)
            .attr('stroke-width',1)
        })
      .append('Income vs Obesity') // Tooltip
        .text(function (d) { return d.abbr +
                             '\nReturn: ' + formatPercent(d.income) +
                             '\nStd. Dev.: ' + formatPercent(d.obesity) });
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
      .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',-10)
        .attr('x',w)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Obesity');
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
      .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Median Income');
});
  