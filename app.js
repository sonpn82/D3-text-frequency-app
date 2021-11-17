d3.select('#reset')
    .on('click', () => {
        d3.selectAll('.letter').remove();
        d3.select('#phrase').text('');
        d3.select('#count').text('');
    })


d3.select("form")
    .on("submit", () => {
        d3.event.preventDefault(); // prevent default submit event happen
        let input = d3.select('input'); // select input field
        let text = input.property('value'); // text content of input field

        let letters = d3.select("#letters")  // div with id letters
                        .selectAll(".letter")  // create empty selection with letter class
                        .data(getFrequencies(text), d => d.character)  // data is from frequency function, 
                        //2nd arguments is to connect between data & item by character, not by index
        letters
            .classed('new', false) // ensure there is no item with new class
            .exit()
            .remove();  // use exit to remove items not related to any data

        letters
            .enter() // enter nodes
            .append("div") // append div to selection
                .classed("letter", true)  // append class, same as above
                .classed('new', true)  // to style the new item a bit different
            .merge(letters)            // merge to modify both existing and new items
                .style('width', '20px')
                .style('line-height', '20px')
                .style('margin-right', '5px')
                .style('height', d => d.count *20 + 'px')
                .text(d => d.character)  // set character 

        // set text for id of phrase
        d3.select('#phrase')
            .text(`Analysis of: ${text}`);

        d3.select('count')
            .text(`(New characters: ${letters.enter().nodes().length})`)
        
        // Clear the input
        input.property('value', '');
    });

// function to get character frequency from a string
// return [{character: "e", count: 1},]
function getFrequencies(str) {
    let sorted = str.split("").sort();
    let data = [];
    for (let i=0; i< sorted.length; i++){
        let last = data[data.length-1];
        if (last && last.character === sorted[i]) last.count++;
        else data.push({character: sorted[i], count: 1});
    }
    return data;
}