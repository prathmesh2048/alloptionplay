window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

$("input[type=radio]").click(() => {
  $("#wrapper").scrollTop(0);
});

// let date = $('input[name="date"]:checked').val();
let date = $(".date_success").attr("id");
console.log(date);

// let ticker = $('input[name="Ticker"]:checked').val();
let ticker = $(".ticker_success").attr("id");


// let stat = $('input[name="stat"]:checked').val();
let stat = $(".stat_success").attr("id");
console.log(stat);

let fri = $(".friexp").is(":checked") === false ? "" : "Y";
console.log("fri", fri);

let frie = $(".frie_success").attr("id");


// console.log("positive_directional_index_indicator_data_array => ",positive_directional_index_indicator_data_array)

let handleFri = (ele)=>{
  $(".frie_success").removeAttr("class");
  $(ele).addClass("frie_success table-success");
  if(ele.id == 'blankFrie'){
    frie = ""
  }else{
    frie = ele.id;
  }
  
  console.log("frie is now => ",ele.id)
  getStrategies("NA");
  getTickers("NA");
}


// when click on Date buttons this function will run -:
let getStrategies = (ele) => {
  if (ele != "NA") {
    console.log(ele);
    date = ele.id;

    $(".date_success").removeAttr("class");
    $(ele).addClass("date_success table-success");
  }

  $(".visibstat").css("display", "none");
  $(".invisibstat").css("display", "contents");
  
  $.ajax({
    type: "POST",
    url: `${window.location.href}`,
    data: {
      Date: date,
      Ticker: ticker,
      Stat: stat,
      Fri: frie,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (data) {
      populateStats(data);
    },
  });
};

// $('input[name="date"]:checked').val()
let populateStats = (data) => {
  console.log("successful ! and => ", data["strategies_list"]);

  document.getElementsByClassName("visibstat")[0].innerHTML = "";
  document.getElementsByClassName("visibstat")[0].innerHTML += `
    <tr>
        <td id="stat_none" onclick="getTickers(this)" class="stat_success">
            None
        </td>
    </tr>`;
  // don't inserts the table rows in visibstat
  for (let i = 0; i < data["strategies_list"].length; i++) {
    
    let success_ = i===0 ?"class='table-success stat_success'":'';
    const stat = data["strategies_list"][i];
    document.getElementsByClassName(
      "visibstat"
    )[0].innerHTML += `
        <tr>
            <td id="${stat}" ${success_} onclick="getTickers(this)">
                ${stat}
            </td>
        </tr>
    `;

  }
  
  
  $(".visibstat").css("display", "contents");
  $(".invisibstat").css("display", "none");
  // getTickers(data);
};

let getTickers = (ele) => {
  if (ele != "NA") {
    console.log(ele.id);
    stat = ele.id;

    $(".stat_success").removeAttr("class");
    $(ele).addClass("table-success stat_success");
  }
  $(".visibticker").css("display", "none");
  $(".invisibticker").css("display", "contents");
  $.ajax({
    type: "POST",
    url: `${window.location.href}`,
    data: {
      Date: date,
      Ticker: ticker,
      Stat: stat,
      Fri: frie,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (data) {
      populateTicker(data);
    },
  });
};
let populateTicker = (data) => {
  console.log("successfully recived tickers = > !", data["Ticker_list"]);
  document.getElementsByClassName("visibticker")[0].innerHTML = "";


  for (let i = 0; i < data["Ticker_list"].length; i++) {
    let ticker = data["Ticker_list"][i];
    let tsuccess_ = `class="${i===0 ?'table-success ticker_success':'' }"`;
    document.getElementsByClassName(
      "visibticker"
    )[0].innerHTML += ` <tr>
      <td id="${ticker}" ${tsuccess_} onclick="getChartData(this)">
          ${ticker}
          </td>
      </tr>`;
  }

  $(".visibticker").css("display", "contents");
  $(".invisibticker").css("display", "none");
};
console.log("Candlestick_data_array array1 => ",Candlestick_data_array1)
let getChartData = (ele) => {

  if(ele != "NA"){
    ticker = ele.id
    $(".ticker_success").removeAttr("class");
    $(ele).addClass("ticker_success table-success");
  }

  $.ajax({
    type: "POST",
    url: `${window.location.href}`,
    data: {
      Date: date,
      Ticker: ticker,
      Stat: stat,
      Fri: fri,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (data) {
      populateCharts(data);
    },
  });
};


let populateCharts = (data)=>{
  let chartdata = data['chartdata_obj'];
  let heading_obj = data['d_chart_data_list'];
  console.log("data['d_chart_data_list'] => ",data['d_chart_data_list']);

    document.getElementsByClassName('information')[0].innerHTML = ''
    document.getElementsByClassName('information')[0].innerHTML += `
              <p>
                <p style="font-size: 0.9em;" class="text-center">

                  Ticker:${heading_obj[7]}
                  &nbsp;
                  Industry : ${heading_obj[0]}
                  &nbsp;
                  Name: ${heading_obj[1]}
                  &nbsp;
                  Resistance Line:${heading_obj[6]}
                  &nbsp;
                  support Line: ${heading_obj[5]}
                  &nbsp;
                  ATR: ${heading_obj[2]}
                  &nbsp;
                  EPSDate: ${heading_obj[3]}
                  &nbsp;
                  Time:${heading_obj[4]}
                  &nbsp;&nbsp;

                </p>
            </p>
            `
    Candlestick_data_array = [];
    chartdata.forEach(ele => {
      Candlestick_data_array.push( 
        {
          x: `${ele[0]}`,
          y: [ele[1], ele[2], ele[3], ele[4]]
        }
      )
    })

    Candlestick_data_array1 = [];
    chartdata.forEach(ele => {
      Candlestick_data_array1.push( 
        [ele[0],ele[1], ele[2], ele[3], ele[4]]
      )
    })
    

    Short_EMA_data_array = [];
    chartdata.forEach(ele=>{
      Short_EMA_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[6]]
        }
      )
    })
      

    Medium_EMA_data_array = [];
    chartdata.forEach(ele=>{
      Medium_EMA_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[7]]
        }
      )
    })
      
      
    Long_EMA_data_array = [];
    chartdata.forEach(ele=>{
      Long_EMA_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[8]]
        }
      )
    })
      

    Support_data_array = [];
    chartdata.forEach(ele=>{
      Support_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[12]]
        }
      )
    })
      
    
    Resistance_data_array = [];
    chartdata.forEach(ele=>{
      Resistance_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[13]]
        }
      )
    })
      
    
    vamp_data_array = [];
    chartdata.forEach(ele=>{
      vamp_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[31]]
        }
      )
    })
      
      
    bottom_value_data_array = [];
    chartdata.forEach(ele=>{
      if(ele[32] != '0.0')
      bottom_value_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[32]]
        }
      )
    })
      
    
    top_value_data_array = [];
    chartdata.forEach(ele=>{
      if(ele[33] != '0.0')
      top_value_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[33]]
        }
      )
    })
      

    supplyline_high_data_array = [];
    chartdata.forEach(ele=>{
      if(ele[34] != '0.0')
      supplyline_high_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[34]]
        }
      );
    })
      

    supplyline_low_data_array = [];
    chartdata.forEach(ele=>{
      if(ele[35] != '0.0')
      supplyline_low_data_array.push(
          {
            x: `${ele[0]}`,
            y: [ele[35]]
          }
        )
    })
      

    demandline_high_data_array = [];
    chartdata.forEach(ele=>{
      if(ele[36] != '0.0')
      demandline_high_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[36]]
        }
      )
    })
      

    demandline_low_data_array = [];
    chartdata.forEach(ele=>{
      if(ele[37] != '0.0')
      demandline_low_data_array.push(
        {
          x: `${ele[0]}`,
          y: [ele[37]]
        }
      )
    })


  // line -:

  positive_directional_index_indicator_data_array = [];
  chartdata.forEach(ele=>{
    positive_directional_index_indicator_data_array.push(
       ele[9]
    )
  })
  negative_directional_index_indicator_data_array = [];
  chartdata.forEach(ele=>{
    negative_directional_index_indicator_data_array.push(
       ele[10]
    )
  })
  zero_line_data_array = [];
    chartdata.forEach(ele=>{
      zero_line_data_array.push(
        ele[23]
      )
    })

  twenty_five_line_data_array = [];
  chartdata.forEach(ele=>{
    twenty_five_line_data_array.push(
       ele[24]
    )
  })
  forty_line_data_array = [];
  chartdata.forEach(ele=>{
    forty_line_data_array.push(
       ele[25]
    )
  })
  neg_twenty_five_line_data_array = [];
  chartdata.forEach(ele=>{
    neg_twenty_five_line_data_array.push(
       ele[26]
    )
  })
  neg_forty_line_data_array = [];
  chartdata.forEach(ele=>{
    neg_forty_line_data_array.push(
       ele[27]
    )
  })
  max_avg_upper_data_array = [];
  chartdata.forEach(ele=>{
    max_avg_upper_data_array.push(
       ele[28]
    )
  })
  min_avg_low_data_array = [];
  chartdata.forEach(ele=>{
    min_avg_low_data_array.push(
       ele[29]
    )
  })
  adx_indicator_data_array = [];
  chartdata.forEach(ele=>{
    adx_indicator_data_array.push(
       ele[11]
    )
  }) 
  
  categories_data_array = [];
  chartdata.forEach(ele=>{
    categories_data_array.push(
      moment(moment(`${ele[0]}`,'YYYY-MM-DD')).toDate(),
    )
  }) 

  stack_data_array = [];
  chartdata.forEach(ele=>{
    stack_data_array.push(
      [`${ele[0]}`,1,`${ele[16]}`,1,`${ele[17]}`,1,`${ele[18]}`,1,`${ele[19]}`,1,`${ele[20]}`,1,`${ele[21]}`,1,`${ele[22]}`]
    )
  })
      

  // chart1.updateSeries([
  //       {
  //           name: 'Candlestick',
  //           type: 'candlestick',
  //           data: Candlestick_data_array
  //       },{
  //           name: 'Short EMA',
  //           type: 'line',
  //           data:Short_EMA_data_array
  //       },{
  //           name: 'Medium EMA',
  //           type: 'line',
  //           data:Medium_EMA_data_array
  //       }, 
  //       {
  //           name: 'Long EMA',
  //           type: 'line',
  //           data: Long_EMA_data_array
  //       },
  //       {
  //           name: 'Support',
  //           type: 'line',
  //           data: Support_data_array
  //       },
  //       {   
  //           name: 'Resistance',
  //           type: 'line',
  //           data: Resistance_data_array
  //       }, 
  //        {   
  //           name: 'vamp',
  //           type: 'line',
  //           data: vamp_data_array
  //       }, 
  //       {   
  //           name: 'bottom_value',
  //           type: 'line',
  //           data: bottom_value_data_array
  //       },
  //       {   
  //           name: 'top_value',
  //           type: 'line',
  //           data: top_value_data_array
  //       },
  //       {   
  //           name: 'supplyline_high',
  //           type: 'line',
  //           data: supplyline_high_data_array
  //       },
  //       {   
  //           name: 'supplyline_low',
  //           type: 'line',
  //           data: supplyline_low_data_array
  //       },
  //       {   
  //           name: 'demandline_high',
  //           type: 'line',
  //           data: demandline_high_data_array
  //       },
  //       {   
  //           name: 'demandline_low',
  //           type: 'line',
  //           data: demandline_low_data_array
  //       }
  // ])
  
  linechart.updateSeries([
    {
        name:"positive_directional_index_indicator",
        data: positive_directional_index_indicator_data_array
    },
    {
        name:"negative_directional_index_indicator",
        data: negative_directional_index_indicator_data_array
    },
    
    {
        name:"zero_line",
        data: zero_line_data_array
    },
    {
        name:"twenty_five_line",
        data:twenty_five_line_data_array
    },
    {
        name:"forty_line",
        data:forty_line_data_array
    },
    {
        name:"neg_twenty_five_line",
        data: neg_twenty_five_line_data_array
    },
    {
        name: 'neg_forty_line',
        data: neg_forty_line_data_array
    },
    {
        name:"max_avg_upper",
        data: max_avg_upper_data_array
    },
    {
        name:"min_avg_low",
        data: min_avg_low_data_array
    },
    {
        name:"adx_indicator",
        data: adx_indicator_data_array
    },
    // 4 - 7
    
  ])
  anychart.onDocumentReady(function () {
    table.addData(Candlestick_data_array1);
    Short_EMA_data_array_table.addData(Short_EMA_data_array.map((ele)=>{return [ele['x'],ele['y']]}));
    Medium_EMA_data_array_table.addData(Medium_EMA_data_array.map((ele)=>{return [ele['x'],ele['y']]}));
    Long_EMA_data_array_table.addData(Long_EMA_data_array.map((ele)=>{return [ele['x'],ele['y']]}));
    vamp_data_array_table.addData(vamp_data_array.map((ele)=>{return [ele['x'],ele['y']]}));
    Support_data_array_table.addData(Support_data_array.map((ele)=>{return [ele['x'],ele['y']]}));
    Resistance_data_array_table.addData(Resistance_data_array.map((ele)=>{return [ele['x'],ele['y']]}));

    var chart = anychart.stock();
                chart.plot().legend(false)
                var plot = chart.plot();

                var Short_EMA = plot.line(
                    Short_EMA_data_array_table.mapAs({ 
                        // x: 0, 
                        value: 1
                    })
                );

                Short_EMA.name('Short_EMA').stroke('1.5 rgb(128, 0, 255)');
                var Medium_EMA = plot.line(
                    Medium_EMA_data_array_table.mapAs({ 
                        // x: 0, 
                        value: 1
                    })
                );
                Medium_EMA.name('Medium_EMA').stroke('1.5 rgb(249, 124, 0)');

                var Long_EMA = plot.line(
                    Long_EMA_data_array_table.mapAs({ 
                        // x: 0, 
                        value: 1
                    })
                );
                Long_EMA.name('Long_EMA').stroke('1.5 rgb(255, 0, 255)');



                var vamp = plot.line(
                    vamp_data_array_table.mapAs({ 
                        // x: 0, 
                        value: 1
                    })
                );
                vamp.name('vamp').stroke('1.5 rgb(0, 255, 255)');

                var Support = plot.line(
                    Support_data_array_table.mapAs({ 
                        // x: 0, 
                        value: 1
                    })
                );
                Support.name('Support').stroke('1.5 rgb(192, 192, 192)');

                var Resistance = plot.line(
                    Resistance_data_array_table.mapAs({ 
                        // x: 0, 
                        value: 1
                    })
                );
                Resistance.name('Resistance').stroke('1.5 rgb(192, 192, 192)');

                var Candle = plot.candlestick(
                    table.mapAs({
                        open: 1,
                        high: 2,
                        low: 3,
                        close: 4
                    })
                );
                Candle.name('Candle');
                Candle.legendItem().iconType('rising-falling');

                Candle.fallingFill("rgb(255, 0, 0)");
                Candle.fallingStroke("rgb(255, 0, 0)");
                Candle.risingFill("rgb(77, 167, 75)");
                Candle.risingStroke("rgb(77, 167, 75)");

                var annotation = plot.annotations();
                // supplyline_high -:
                annotation.line({
                    // X - part of the first anchor
                    xAnchor: supplyline_high_data_array[0]['x'],
                    // Y - part of the first anchor
                    valueAnchor: supplyline_high_data_array[0]['y'],
                    // X - part of the second anchor
                    secondXAnchor: supplyline_high_data_array[supplyline_high_data_array.length-1]['x'],
                    // Y - part of the second anchor
                    secondValueAnchor: supplyline_high_data_array[supplyline_high_data_array.length-1]['y'],
                    // stroke: '4 rgb(255, 0, 0)'
                    // disable interaction with Annotation
                }).allowEdit(false).stroke({thickness:'4', color:'rgb(255, 0, 0)', opacity:0.6});

                // supplyline_low -:
                annotation.line({
                    // X - part of the first anchor
                    xAnchor: supplyline_low_data_array[0]['x'],
                    // Y - part of the first anchor
                    valueAnchor: supplyline_low_data_array[0]['y'],
                    // X - part of the second anchor
                    secondXAnchor: supplyline_low_data_array[supplyline_low_data_array.length-1]['x'],
                    // Y - part of the second anchor
                    secondValueAnchor: supplyline_low_data_array[supplyline_low_data_array.length-1]['y'],
                    // stroke: '4 rgb(255, 0, 0)'
                    // disable interaction with Annotation
                }).allowEdit(false).stroke({thickness:'4', color:'rgb(255, 0, 0)', opacity:0.6});

                // demandline_high -:
                annotation.line({
                    // X - part of the first anchor
                    xAnchor: demandline_high_data_array[0]['x'],
                    // Y - part of the first anchor
                    valueAnchor: demandline_high_data_array[0]['y'],
                    // X - part of the second anchor
                    secondXAnchor: demandline_high_data_array[demandline_high_data_array.length-1]['x'],
                    // Y - part of the second anchor
                    secondValueAnchor: demandline_high_data_array[demandline_high_data_array.length-1]['y'],
                    // stroke: '4 rgb(77, 167, 75)'
                    // disable interaction with Annotation
                }).allowEdit(false).stroke({thickness:'4', color:'rgb(77, 167, 75)', opacity:0.6});

                // demandline_low -:
                annotation.line({
                    // X - part of the first anchor
                    xAnchor: demandline_low_data_array[0]['x'],
                    // Y - part of the first anchor
                    valueAnchor: demandline_low_data_array[0]['y'],
                    // X - part of the second anchor
                    secondXAnchor: demandline_low_data_array[demandline_low_data_array.length-1]['x'],
                    // Y - part of the second anchor
                    secondValueAnchor: demandline_low_data_array[demandline_low_data_array.length-1]['y'],
                    // stroke: '4 rgb(77, 167, 75)'
                    // disable interaction with Annotation
                }).allowEdit(false).stroke({thickness:'4', color:'rgb(77, 167, 75)', opacity:0.6});

                // bottom_value -:
                annotation.line({
                    // X - part of the first anchor
                    xAnchor: bottom_value_data_array[0]['x'],
                    // Y - part of the first anchor
                    valueAnchor: bottom_value_data_array[0]['y'],
                    // X - part of the second anchor
                    secondXAnchor: bottom_value_data_array[bottom_value_data_array.length-1]['x'],
                    // Y - part of the second anchor
                    secondValueAnchor: bottom_value_data_array[bottom_value_data_array.length-1]['y'],
                    // stroke: '1.5 rgb(0, 0, 0)'
                    // disable interaction with Annotation
                }).allowEdit(false).stroke({thickness:'1.5', color:'rgb(0, 0, 0)', opacity:1});


                // top_value_data -:
                annotation.line({
                    // X - part of the first anchor
                    xAnchor: top_value_data_array[0]['x'],
                    // Y - part of the first anchor
                    valueAnchor: top_value_data_array[0]['y'],
                    // X - part of the second anchor
                    secondXAnchor: top_value_data_array[top_value_data_array.length-1]['x'],
                    // Y - part of the second anchor
                    secondValueAnchor: top_value_data_array[top_value_data_array.length-1]['y'],
                    // stroke: '1.5 rgb(0, 0, 0)'
                    // disable interaction with Annotation
                }).allowEdit(false).stroke({thickness:'1.5', color:'rgb(0, 0, 0)', opacity:1});

                document.getElementById('Candlestick1').innerHTML = ""
                chart.container('Candlestick1');
                // initiate chart drawing
                chart.draw();
  })
  
  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(){
        let stack = stack_data_array;
        stack.unshift(['date','trigger_4',{role:"style"},'trigger_3',{role:"style"},'trigger_1',{role:"style"},'trigger_2',{role:"style"},'trigger_5',{role:"style"},'trigger_6',{role:"style"},'trigger_7',{role:"style"}]);
        // stack.reverse();
        // console.log("stack => ",stack);
        var data = google.visualization.arrayToDataTable(stack, false);


        var options = {
           legend: 'none',
           isStacked:true,
        //    bar: { groupWidth: '80%' },
           chartArea:{left:40,top:0,width:"100%",height:"60%"},
           width:'100%', 
           height:'140',
           hAxis: {
               textPosition: 'none',
                slantedText: true,
				slantedTextAngle: 90,
                "textStyle" : {
                    "fontSize" : 12,
                    "bold" : true,
                },
           },
           vAxis: {
           		textPosition: 'none'
           }
        };


        // var chart = new google.visualization.ColumnChart(document.getElementById('StackedBarCharts'));

        // chart.draw(data, options);
        // const sidebarToggle = document.body.querySelector("#sidebarToggle");
        // sidebarToggle.addEventListener('click', ()=>{
        //     setTimeout(() => {
        //         var chart = new google.visualization.ColumnChart(document.getElementById('StackedBarCharts'));
        //         chart.draw(data, options);
        //     }, 1000);
        // })
      }
};



let rightHelper = (ele,id)=>{
  let a  = new Date(`${id}`);
  let b  = new Date(`${ele['x']}`);
  return b<=a;
}
let rightHelperForLineChart = (ele,id)=>{
  let a  = new Date(`${id}`);
  let b  = new Date(`${ele}`);
  return b<=a;
} 
let RightDateHandler = (element,id)=>{

  $(".right_date_success").removeAttr("class");
  $(element).addClass("right_date_success table-success"); 

  let leni = categories_data_array.filter((ele)=>{return rightHelperForLineChart(ele,id)}).length
  // categories_data_array =   categories_data_array.filter((ele)=>{return rightHelperForLineChart(ele,id)})
  linechart.updateSeries([
    {
        name:"positive_directional_index_indicator",
        data: positive_directional_index_indicator_data_array.slice(0,leni)
    },
    {
        name:"negative_directional_index_indicator",
        data: negative_directional_index_indicator_data_array.slice(0,leni)
    },
    
    {
        name:"zero_line",
        data: zero_line_data_array.slice(0,leni)
    },
    {
        name:"twenty_five_line",
        data:twenty_five_line_data_array.slice(0,leni)
    },
    {
        name:"forty_line",
        data:forty_line_data_array.slice(0,leni)
    },
    {
        name:"neg_twenty_five_line",
        data: neg_twenty_five_line_data_array.slice(0,leni)
    },
    {
        name: 'neg_forty_line',
        data: neg_forty_line_data_array.slice(0,leni)
    },
    {
        name:"max_avg_upper",
        data: max_avg_upper_data_array.slice(0,leni)
    },
    {
        name:"min_avg_low",
        data: min_avg_low_data_array.slice(0,leni)
    },
    {
        name:"adx_indicator",
        data: adx_indicator_data_array.slice(0,leni)
    },
    
  ])

}