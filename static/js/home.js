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
  console.log("chart data => ",data);
}