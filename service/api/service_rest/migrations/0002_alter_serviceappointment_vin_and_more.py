# Generated by Django 4.0.3 on 2022-08-01 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceappointment',
            name='VIN',
            field=models.PositiveBigIntegerField(),
        ),
        migrations.AlterField(
            model_name='technician',
            name='employee_number',
            field=models.PositiveBigIntegerField(),
        ),
    ]
