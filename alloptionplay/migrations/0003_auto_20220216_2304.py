# Generated by Django 3.1.7 on 2022-02-16 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alloptionplay', '0002_auto_20220216_2251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='info',
            name='adx_indicator',
            field=models.DecimalField(decimal_places=3, default=0.0, max_digits=5),
        ),
    ]
