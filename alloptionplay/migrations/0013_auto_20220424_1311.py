# Generated by Django 3.1.7 on 2022-04-24 07:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alloptionplay', '0012_auto_20220424_1309'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='info',
            name='alloptionpl_db_033760_idx',
        ),
    ]