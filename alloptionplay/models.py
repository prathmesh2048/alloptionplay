from django.db import models
from sqlalchemy import null



class info(models.Model):
    db = models.CharField(max_length=250,null=True)
    country_ticker_pk = models.CharField(max_length=250,null=True)
    ticker = models.CharField(max_length=250,null=True)
    date = models.CharField(max_length=250,null=True)
    open = models.CharField(max_length=250,null=True)
    high = models.CharField(max_length=250,null=True)
    low = models.CharField(max_length=250,null=True)
    adj_close = models.CharField(max_length=250,null=True)
    rownumber = models.CharField(max_length=250,null=True)
    short_ema = models.CharField(max_length=250,null=True)
    medium_ema = models.CharField(max_length=250,null=True)
    long_ema = models.CharField(max_length=250,null=True)
    positive_directional_index_indicator = models.CharField(max_length=250,null=True)
    negative_directional_index_indicator = models.CharField(max_length=250,null=True)
    adx_indicator = models.CharField(max_length=250,null=True)
    suport_line = models.CharField(max_length=250,null=True)
    resistance_line = models.CharField(max_length=250,null=True)
    max_axis = models.CharField(max_length=250,null=True)
    min_axis = models.CharField(max_length=250,null=True)
    trigger_field1 = models.CharField(max_length=250,null=True)
    trigger_field2 = models.CharField(max_length=250,null=True)
    trigger_field3 = models.CharField(max_length=250,null=True)
    trigger_field4 = models.CharField(max_length=250,null=True)
    trigger_field5 = models.CharField(max_length=250,null=True)
    trigger_field6 = models.CharField(max_length=250,null=True)
    trigger_field7 = models.CharField(max_length=250,null=True)
    zero_line = models.CharField(max_length=250,null=True)
    twenty_five_line = models.CharField(max_length=250,null=True)
    forty_line = models.CharField(max_length=250,null=True)
    neg_twenty_five_line = models.CharField(max_length=250,null=True)
    neg_forty_line = models.CharField(max_length=250,null=True)
    max_avg_upper = models.CharField(max_length=250,null=True)
    min_avg_low = models.CharField(max_length=250,null=True)
    mov_8day_adj_close = models.CharField(max_length=250,null=True)
    vwap = models.CharField(max_length=250,null=True)
    bottom_value = models.CharField(max_length=250,null=True)
    top_value = models.CharField(max_length=250,null=True)
    supplyline_high = models.CharField(max_length=250,null=True)
    supplyline_low = models.CharField(max_length=250,null=True)
    demandline_high = models.CharField(max_length=250,null=True)
    demandline_low = models.CharField(max_length=250,null=True)
    mov_100day_adj_close = models.CharField(max_length=250,null=True)
    mov_200day_adj_close = models.CharField(max_length=250,null=True)

    def __str__(self):
        return self.ticker

class data(models.Model):
    db = models.CharField(max_length=250,null=True)
    country_ticker_pk = models.CharField(max_length=250,null=True)
    strategy = models.CharField(max_length=250,null=True)
    ticker = models.CharField(max_length=250,null=True)
    expires_friday = models.CharField(max_length=250,null=True)
    list_date = models.CharField(max_length=250,null=True)
    beta = models.CharField(max_length=250,null=True)
    floatshort = models.CharField(max_length=250,null=True)
    earnings_date = models.CharField(max_length=250,null=True)
    call_time = models.CharField(max_length=250,null=True)
    atr = models.CharField(max_length=250,null=True)
    name = models.CharField(max_length=250,null=True)
    sector = models.CharField(max_length=250,null=True)
    industry = models.CharField(max_length=250,null=True)

    def __str__(self):
        return self.industry
