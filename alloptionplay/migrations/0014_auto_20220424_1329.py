# Generated by Django 3.1.7 on 2022-04-24 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alloptionplay', '0013_auto_20220424_1311'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='data',
            index=models.Index(fields=['db'], name='alloptionpl_db_1ffff8_idx'),
        ),
        migrations.AddIndex(
            model_name='info',
            index=models.Index(fields=['db'], name='alloptionpl_db_033760_idx'),
        ),
    ]
