# Generated by Django 4.0.3 on 2022-08-02 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_alter_technician_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
