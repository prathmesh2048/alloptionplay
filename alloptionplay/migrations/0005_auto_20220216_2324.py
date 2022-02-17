# Generated by Django 3.1.7 on 2022-02-16 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alloptionplay', '0004_auto_20220216_2304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='info',
            name='adj_close',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='adx_indicator',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='atr',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='call_time',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='company',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='date',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='db',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='earnings_date',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='estimate_eps',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='floatshort',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='forty_line',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='high',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='industry',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='long_ema',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='low',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='max_avg_upper',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='max_axis',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='medium_ema',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='min_avg_low',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='min_axis',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='name',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='negative_directional_index_indicator',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='open',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='positive_directional_index_indicator',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='resistance_line',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='rownumber',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='short_ema',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='suport_line',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='ticker',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='trigger_field1',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='trigger_field2',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='trigger_field3',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='trigger_field4',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='trigger_field5',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='trigger_field6',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='twenty_five_line',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='vol_spike_bar',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='zero_line',
            field=models.CharField(max_length=250, null=True),
        ),
    ]