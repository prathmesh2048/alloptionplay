# Generated by Django 3.1.7 on 2022-04-24 07:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alloptionplay', '0011_auto_20220424_1257'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='data',
            name='alloptionpl_db_1ffff8_idx',
        ),
    ]