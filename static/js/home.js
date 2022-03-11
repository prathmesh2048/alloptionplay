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

console.log("positive_directional_index_indicator_data_array => ",positive_directional_index_indicator_data_array)

$(".friexp").change(() => {
  fri = $(".friexp").is(":checked") === false ? "" : "Y";
  getTickers("NA");
  getStrategies("NA");
});

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
    url: "http://127.0.0.1:8000/",
    data: {
      Date: date,
      Ticker: ticker,
      Stat: stat,
      Fri: fri,
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
    $(ele).addClass("ticker_success table-success");
  }
  $(".visibticker").css("display", "none");
  $(".invisibticker").css("display", "contents");
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/",
    data: {
      Date: date,
      Ticker: ticker,
      Stat: stat,
      Fri: fri,
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

let getChartData = (ele) => {

  if(ele != "NA"){
    ticker = ele.id
    $(".ticker_success").removeAttr("class");
    $(ele).addClass("ticker_success table-success");
  }

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/",
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

  console.log("Short_EMA_data_array => ",Short_EMA_data_array);

    Candlestick_data_array = [];
    chartdata.forEach(ele => {
      Candlestick_data_array.push( 
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[1]), parseInt(ele[2]), parseInt(ele[3]), parseInt(ele[4])]
        }
      )
    })

    Short_EMA_data_array = [];
    chartdata.forEach(ele=>{
      Short_EMA_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[6])]
        }
      )
    })
      

    Medium_EMA_data_array = [];
    chartdata.forEach(ele=>{
      Medium_EMA_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[7])]
        }
      )
    })
      
      
    Long_EMA_data_array = [];
    chartdata.forEach(ele=>{
      Long_EMA_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[8])]
        }
      )
    })
      

    Support_data_array = [];
    chartdata.forEach(ele=>{
      Support_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[12])]
        }
      )
    })
      
    
    Resistance_data_array = [];
    chartdata.forEach(ele=>{
      Resistance_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[13])]
        }
      )
    })
      
    
    vamp_data_array = [];
    chartdata.forEach(ele=>{
      vamp_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[31])]
        }
      )
    })
      
      
    bottom_value_data_array = [];
    chartdata.forEach(ele=>{
      bottom_value_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[32])]
        }
      )
    })
      
    
    top_value_data_array = [];
    chartdata.forEach(ele=>{
      top_value_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[33])]
        }
      )
    })
      

    supplyline_high_data_array = [];
    chartdata.forEach(ele=>{
      supplyline_high_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[34])]
        }
      )
    })
      

    supplyline_low_data_array = [];
    chartdata.forEach(ele=>{
      supplyline_low_data_array.push(
          {
            x: `${ele[0]}`,
            y: [parseInt(ele[35])]
          }
        )
    })
      

    demandline_high_data_array = [];
    chartdata.forEach(ele=>{
      demandline_high_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[36])]
        }
      )
    })
      

    demandline_low_data_array = [];
    chartdata.forEach(ele=>{
      demandline_low_data_array.push(
        {
          x: `${ele[0]}`,
          y: [parseInt(ele[37])]
        }
      )
    })


  // line -:

  positive_directional_index_indicator_data_array = [];
  chartdata.forEach(ele=>{
    positive_directional_index_indicator_data_array.push(
       parseInt(ele[9])
    )
  })
  negative_directional_index_indicator_data_array = [];
  chartdata.forEach(ele=>{
    negative_directional_index_indicator_data_array.push(
       parseInt(ele[10])
    )
  })
  zero_line_data_array = [];
    chartdata.forEach(ele=>{
      zero_line_data_array.push(
        parseInt(ele[23])
      )
    })

  twenty_five_line_data_array = [];
  chartdata.forEach(ele=>{
    twenty_five_line_data_array.push(
       parseInt(ele[24])
    )
  })
  forty_line_data_array = [];
  chartdata.forEach(ele=>{
    forty_line_data_array.push(
       parseInt(ele[25])
    )
  })
  neg_twenty_five_line_data_array = [];
  chartdata.forEach(ele=>{
    neg_twenty_five_line_data_array.push(
       parseInt(ele[26])
    )
  })
  neg_forty_line_data_array = [];
  chartdata.forEach(ele=>{
    neg_forty_line_data_array.push(
       parseInt(ele[27])
    )
  })
  max_avg_upper_data_array = [];
  chartdata.forEach(ele=>{
    max_avg_upper_data_array.push(
       parseInt(ele[28])
    )
  })
  min_avg_low_data_array = [];
  chartdata.forEach(ele=>{
    min_avg_low_data_array.push(
       parseInt(ele[29])
    )
  })
  adx_indicator_data_array = [];
  chartdata.forEach(ele=>{
    adx_indicator_data_array.push(
       parseInt(ele[11])
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
      

  chart1.updateSeries([
        {
            name: 'Candlestick',
            type: 'candlestick',
            data: Candlestick_data_array
        },{
            name: 'Short EMA',
            type: 'line',
            data:Short_EMA_data_array
        },{
            name: 'Medium EMA',
            type: 'line',
            data:Medium_EMA_data_array
        }, 
        {
            name: 'Long EMA',
            type: 'line',
            data: Long_EMA_data_array
        },
        {
            name: 'Support',
            type: 'line',
            data: Support_data_array
        },
        {   
            name: 'Resistance',
            type: 'line',
            data: Resistance_data_array
        }, 
         {   
            name: 'vamp',
            type: 'line',
            data: vamp_data_array
        }, 
        {   
            name: 'bottom_value',
            type: 'line',
            data: bottom_value_data_array
        },
        {   
            name: 'top_value',
            type: 'line',
            data: top_value_data_array
        },
        {   
            name: 'supplyline_high',
            type: 'line',
            data: supplyline_high_data_array
        },
        {   
            name: 'supplyline_low',
            type: 'line',
            data: supplyline_low_data_array
        },
        {   
            name: 'demandline_high',
            type: 'line',
            data: demandline_high_data_array
        },
        {   
            name: 'demandline_low',
            type: 'line',
            data: demandline_low_data_array
        }
  ])
  
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

  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(){
        let stack = stack_data_array;
        stack.unshift(['date','trigger_4',{role:"style"},'trigger_3',{role:"style"},'trigger_1',{role:"style"},'trigger_2',{role:"style"},'trigger_5',{role:"style"},'trigger_6',{role:"style"},'trigger_7',{role:"style"}]);
        // stack.reverse();
        console.log("stack => ",stack);
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


        var chart = new google.visualization.ColumnChart(document.getElementById('StackedBarCharts'));

        chart.draw(data, options);
        const sidebarToggle = document.body.querySelector("#sidebarToggle");
        sidebarToggle.addEventListener('click', ()=>{
            setTimeout(() => {
                var chart = new google.visualization.ColumnChart(document.getElementById('StackedBarCharts'));
                chart.draw(data, options);
            }, 1000);
        })
      }

  console.log("Short_EMA_data_array after => ",Short_EMA_data_array);

};
  
