
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
d3.json(url).then(function (data) { console.log(data) }

);
function init() {

    d3.json(url).then(function (data) { 
        console.log(data) 
        const names =data.names;
        const dropdownbox =d3.select('#selDataset');
        for (let i =0; i < names.length;i++){
            dropdownbox.append('option').text(names[i]).property('value',names[i])
        }
        buildcharts(names[0])
        builddemographics(names[0])
    }

    );

}
function builddemographics(sampleid){
    d3.json(url).then(function (data) { 
       
        const metadata_values = data.metadata

        const metadata = metadata_values.filter(element => element.id == sampleid)[0]
        console.log(metadata);
        const panel =d3.select("#sample-metadata")
        panel.html("")
        for (key in metadata){
            panel.append("h6").text(key.toUpperCase()+ ": "+metadata[key])


        }
    })
}
function buildcharts(sampleid){
    d3.json(url).then(function (data) { 
       
        const samples = data.samples

        const sample = samples.filter(element => element.id == sampleid)[0]
        console.log(sample);

        let sample_values = sample.sample_values.slice(0,10).reverse();
        let otu_labels = sample.otu_labels.slice(0,10).reverse();
        let otu_ids = sample.otu_ids.slice(0,10).map(otu_id => "OTU "+otu_id).reverse();

        let trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: 'bar',
            orientation:'h'    
          };

        let layout = {
            title: ""
          };
          
        Plotly.newPlot("bar", [trace1], layout);

        let trace2 = {
            y: sample.sample_values,
            x: sample.otu_ids,
            text: sample.otu_labels,
            mode: 'markers',
            marker:{
                size:sample.sample_values,
                color:sample.otu_ids,
                colorscale:'Earth'
            }
          };

          let layout2 = {
            title: ""
          };
          
        Plotly.newPlot("bubble", [trace2], layout2);
    })

}
function optionChanged(new_sample_id){

    buildcharts(new_sample_id);
    builddemographics(new_sample_id);
}
init()