# Generated by Django 3.1.7 on 2022-02-18 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alloptionplay', '0006_auto_20220218_1725'),
    ]

    operations = [
        migrations.CreateModel(
            name='data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('db', models.CharField(max_length=250, null=True)),
                ('country_ticker_pk', models.CharField(max_length=250, null=True)),
                ('strategy', models.CharField(max_length=250, null=True)),
                ('ticker', models.CharField(max_length=250, null=True)),
                ('expires_friday', models.CharField(max_length=250, null=True)),
                ('list_date', models.CharField(max_length=250, null=True)),
                ('beta', models.CharField(max_length=250, null=True)),
                ('floatshort', models.CharField(max_length=250, null=True)),
                ('earnings_date', models.CharField(max_length=250, null=True)),
                ('call_time', models.CharField(max_length=250, null=True)),
                ('atr', models.CharField(max_length=250, null=True)),
                ('name', models.CharField(max_length=250, null=True)),
                ('sector', models.CharField(max_length=250, null=True)),
                ('industry', models.CharField(max_length=250, null=True)),
            ],
        ),
    ]
