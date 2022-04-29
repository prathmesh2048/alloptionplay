from django.http.response import JsonResponse
from django.shortcuts import render
from django.db import connection

# filter options -:
Ticker_list = []
Dates_list = []
Right = []
db_list = []
strategies_list = []
chart_data_list = []
d_chart_data_list = []
Fri_Exp_list = []

def defaults():
    global Ticker_list
    global Dates_list
    global Fri_Exp_list
    global Right
    global db_list
    global strategies_list
    global chart_data_list
    global d_chart_data_list

    cursor = connection.cursor()

    sql_command_Dates_list = "SELECT DISTINCT date FROM alloptionplay_info where db = '020' order by date desc"
    cursor.execute(sql_command_Dates_list)
    Dates_list = list(list(x)[0] for x in cursor.fetchall())
    Right = Dates_list
    
    sql_command_strategies_list = "SELECT DISTINCT strategy FROM alloptionplay_data where list_date='{}' and db = '020' ORDER BY strategy".format(Dates_list[0])
    cursor.execute(sql_command_strategies_list)
    strategies_list = list(list(x)[0] for x in cursor.fetchall())

    sql_command_Ticker_list = "SELECT DISTINCT ticker FROM alloptionplay_data where list_date='{}' and strategy='{}' and db= '020' ORDER BY ticker".format(Dates_list[0],strategies_list[0])
    cursor.execute(sql_command_Ticker_list)
    Ticker_list = list(list(x)[0] for x in cursor.fetchall())

    sql_command_db_list = "SELECT DISTINCT db FROM alloptionplay_data"
    cursor.execute(sql_command_db_list)
    db_list = list(list(x)[0] for x in cursor.fetchall())

    sql_command_chart_data_list = "SELECT date,open,high,low,adj_close,rownumber,short_ema,medium_ema,long_ema,positive_directional_index_indicator,negative_directional_index_indicator,adx_indicator,suport_line,resistance_line,max_axis,min_axis,trigger_field1,trigger_field2,trigger_field3,trigger_field4,trigger_field5,trigger_field6,trigger_field7,zero_line,twenty_five_line,forty_line,neg_twenty_five_line,neg_forty_line,max_avg_upper,min_avg_low,mov_8day_adj_close,vwap,bottom_value,top_value,supplyline_high,supplyline_low,demandline_high,demandline_low,mov_100day_adj_close,mov_200day_adj_close FROM alloptionplay_info where ticker='{}' and db='020' order by date asc".format(Ticker_list[0])
    
    # print(sql_command_chart_data_list)  
    cursor.execute(sql_command_chart_data_list)
    chart_data_list = list(list(x) for x in cursor.fetchall())
    
    sql_command_chart_topbar_list = "SELECT distinct industry,name,atr,earnings_date,call_time FROM alloptionplay_data where ticker='{}' and db='020' order by list_date asc".format(Ticker_list[0])
    cursor.execute(sql_command_chart_topbar_list)
    
    d_chart_data_list = list(list(x) for x in cursor.fetchall())[0]
    d_chart_data_list+= [chart_data_list[0][12]]
    d_chart_data_list+= [chart_data_list[0][13]]
    d_chart_data_list+= [Ticker_list[0]]
    
    print("d_chart_data_list => ",chart_data_list[0])

    sql_command_Fri_Exp_list = "select distinct expires_friday from alloptionplay_data where db='020' order by expires_friday"
    cursor.execute(sql_command_Fri_Exp_list)
    Fri_Exp_list = list(list(x)[0] for x in cursor.fetchall())[1:]
    print(Fri_Exp_list)



# defaults()
def home(request):
    global Ticker_list
    global Dates_list
    global Fri_Exp_list
    global Right
    global db_list
    global strategies_list
    global chart_data_list
    global d_chart_data_list
    cursor = connection.cursor()
    defaults()
    
    template = 'alloptionplay/home.html'

    if(request.is_ajax and request.method == 'POST'):
        print(request.POST)
        incomming_date = str(request.POST['Date'])
        incomming_stat = str(request.POST['Stat'])
        incomming_fri = str(request.POST['Fri'])
        incomming_ticker = str(request.POST['Ticker'])
        incomming_db = str(request.POST['DB'])

        query_stat_ = "SELECT DISTINCT strategy FROM alloptionplay_data where list_date='{}' and expires_friday='{}' and db='{}' ORDER BY strategy".format(incomming_date,incomming_fri,incomming_db)
        print("query_stat_",query_stat_)
        cursor.execute(query_stat_)
        strategies_list = list(list(x)[0] for x in cursor.fetchall())
        # print("query_stat_",query_stat_)

        query_ticker_ = "SELECT DISTINCT ticker FROM alloptionplay_data where list_date='{}' and db='{}' and expires_friday='{}' ORDER BY ticker".format(incomming_date,incomming_db,incomming_fri)
        if(incomming_stat != 'stat_none'):
            query_ticker2 = " and strategy='{}' ORDER BY ticker".format(incomming_stat)
            query_ticker_ = query_ticker_.replace("ORDER BY ticker","",1)
            query_ticker_ += query_ticker2
            print(" query_ticker_ => ",query_ticker_)

        print("query_ticker_",query_ticker_)
        cursor.execute(query_ticker_)
        Ticker_list = list(list(x)[0] for x in cursor.fetchall())
        print("ticker_list ",Ticker_list)
        
        query_chart_data_list = "SELECT date,open,high,low,adj_close,rownumber,short_ema,medium_ema,long_ema,positive_directional_index_indicator,negative_directional_index_indicator,adx_indicator,suport_line,resistance_line,max_axis,min_axis,trigger_field1,trigger_field2,trigger_field3,trigger_field4,trigger_field5,trigger_field6,trigger_field7,zero_line,twenty_five_line,forty_line,neg_twenty_five_line,neg_forty_line,max_avg_upper,min_avg_low,mov_8day_adj_close,vwap,bottom_value,top_value,supplyline_high,supplyline_low,demandline_high,demandline_low,mov_100day_adj_close,mov_200day_adj_close FROM alloptionplay_info where ticker='{}' order by date asc".format(incomming_ticker)
        # print("query_chart_data_list",query_chart_data_list)  
        cursor.execute(query_chart_data_list)
        chart_data_list = list(list(x) for x in cursor.fetchall())
        print("chart_data_list =>",chart_data_list)


        sql_command_chart_topbar_list = "SELECT distinct industry,name,atr,earnings_date,call_time FROM alloptionplay_data where ticker='{}' and db='{}' order by list_date asc".format(incomming_ticker,incomming_db)
        cursor.execute(sql_command_chart_topbar_list)
        if(cursor.rowcount == 0):
            d_chart_data_list = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']
        else:
            d_chart_data_list = list(list(x) for x in cursor.fetchall())[0]
            d_chart_data_list+= [chart_data_list[0][12]]
            d_chart_data_list+= [chart_data_list[0][13]]
            d_chart_data_list+= [incomming_ticker]
        
        print("d_chart_data_list => ",d_chart_data_list)
        
        return JsonResponse({
            'Ticker_list':Ticker_list,
            'Dates_list':Dates_list,
            'Right':Right,
            'db_list':db_list,
            'strategies_list':strategies_list,
            'chartdata_obj':chart_data_list,
            'd_chart_data_list':d_chart_data_list,
            'Fri_Exp_list':Fri_Exp_list

        })
    # print("chart_data_list = > ",chart_data_list)
    context = {
        'Ticker_list':Ticker_list,
        'Dates_list':Dates_list,
        'Right':Right,
        'db_list':db_list,
        'strategies_list':strategies_list,
        'chartdata_obj':chart_data_list,
        'd_chart_data_list':d_chart_data_list,
        'Fri_Exp_list':Fri_Exp_list
    }
    return render(request,template,context)



