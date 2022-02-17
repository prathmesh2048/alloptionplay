import os
import csv
import pymysql

directory = 'files'
# db = pymysql.connect(host='127.0.0.1',
#                      user='root',
#                      password='titan#12',
#                      database='alloptionplays')
db = pymysql.connect(host='127.0.0.1',
                     user='alloptionplays',
                     password='alloptionplays@123',
                     database='alloptionplays')
def load_csv_to_db(filename):
    cursor = db.cursor()
    cursor.execute("SET SESSION sql_mode = ''")
    csv_data = csv.reader(open(filename), delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    next(csv_data)
    if filename.split('files')[1][1:] == 'data_file.csv':
        cursor.execute("TRUNCATE TABLE alloptionplay_info")
    i = 0
    for row in csv_data:
        i+=1
        if i == 22:
            break
        # print(filename)
        if filename.split('files')[1][1:] == 'data_file.csv':
            print(row[1:])
            query1 = 'INSERT INTO alloptionplay_info (db,ticker,date,open,high,low,adj_close,rownumber,short_ema,medium_ema,long_ema,positive_directional_index_indicator,negative_directional_index_indicator,adx_indicator,suport_line,resistance_line,max_axis,min_axis,trigger_field1,trigger_field2,trigger_field3,trigger_field4,trigger_field5,trigger_field6,atr,floatshort,company,earnings_date,call_time,estimate_eps,zero_line,twenty_five_line,forty_line,max_avg_upper,min_avg_low,name,industry,vol_spike_bar) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
            cursor.execute(query1,row[1:])
            # print(query)
            print(query1)
    db.commit()
    cursor.close()

        
        
def getFiles():
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)
        # checking if it is a file
        if os.path.isfile(f):
            filename, file_extension = os.path.splitext(f)

            if file_extension == '.csv':
                # print('loading data for ' + f)
                
                load_csv_to_db(f)

getFiles()



