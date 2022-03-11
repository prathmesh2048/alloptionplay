import time
import os
from os import walk, path
import csv
import pymysql

directory = 'files'
db = pymysql.connect(host='127.0.0.1',
                     user='root',
                     password='titan#12',
                     database='alloptionplays')
# db = pymysql.connect(host='127.0.0.1',
#                      user='alloptionplays',
#                      password='alloptionplays@123',
#                      database='alloptionplays')

# funtion to load the csv data into the prescribed databse
def load_csv_to_db(filename):
    cursor = db.cursor()
    cursor.execute("SET SESSION sql_mode = ''")
    csv_data = csv.reader(open(filename), delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    next(csv_data)
    print(filename.split('files')[1][1:])
    if filename.split('files')[1][1:] == 'Street_90_Internal_Web_page_USA.csv':
        cursor.execute("TRUNCATE TABLE alloptionplay_info")

    if filename.split('files')[1][1:] == 'Street_94_Lane_0_Strategies_List.csv':
        cursor.execute("TRUNCATE TABLE alloptionplay_data")    


    if filename.split('files')[1][1:] == 'Street_90_Internal_Web_page_USA.csv':
        # i = 0
        for row in csv_data:
            # if i==500:
            #     break
            # i+=1
            query1 = "INSERT INTO alloptionplay_info (db,country_ticker_pk,ticker,date,open,high,low,adj_close,rownumber,short_ema,medium_ema,long_ema,positive_directional_index_indicator,negative_directional_index_indicator,adx_indicator,suport_line,resistance_line,max_axis,min_axis,trigger_field1,trigger_field2,trigger_field3,trigger_field4,trigger_field5,trigger_field6,trigger_field7,zero_line,twenty_five_line,forty_line,neg_twenty_five_line,neg_forty_line,max_avg_upper,min_avg_low,mov_8day_adj_close,vwap,bottom_value,top_value,supplyline_high,supplyline_low,demandline_high,demandline_low,mov_100day_adj_close,mov_200day_adj_close) VALUES {}"
            cursor.execute(query1.format(tuple(row)))
            print(cursor._last_executed)
    if filename.split('files')[1][1:] == 'Street_94_Lane_0_Strategies_List.csv':
        for row in csv_data:
            query2 = "INSERT INTO alloptionplay_data (db,country_ticker_pk,strategy,ticker,expires_friday,list_date,beta,floatshort,earnings_date,call_time,atr,name,sector,industry) VALUES {}"
            cursor.execute(query2.format(tuple(row)))
            print(cursor._last_executed)


    db.commit()
    cursor.close()

        
        
def getFiles():
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)
        # checking if it is a file
        if os.path.isfile(f):
            filename, file_extension = os.path.splitext(f)

            if file_extension == '.csv':
                print('loading data for ' + f, '\n\n')
                
                load_csv_to_db(f)
    

start_time = time.time()
getFiles()
print("--- %s seconds ---" % (time.time() - start_time))


# INSERT INTO alloptionplay_data 
# (db,country_ticker_pk,strategy,ticker,expires_friday,list_date,beta,floatshort,earnings_date,call_time,atr,name,sector,industry)
#  VALUES ['020', '020ALLT', 'JD play 2', 'ALLT', '', '2021-10-12', '0.78', '0.63', '', '', '0.42', 'Allot Communications Ltd', 'Technology', 'Communication Equipment']

# INSERT INTO alloptionplay_data
# (db,country_ticker_pk,strategy,ticker,expires_friday,list_date,beta,floatshort,earnings_date,call_time,atr,name,sector,industry)
# VALUES ('020','020ALLT','JD play 2','ALLT','','2021-10-12','0.78','0.63','','','0.42','Allot Communications Ltd','Technology','Communication Equipment')