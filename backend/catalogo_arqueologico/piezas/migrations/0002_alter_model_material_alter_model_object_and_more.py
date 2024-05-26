# Generated by Django 4.2.13 on 2024-05-26 22:43

from django.db import migrations, models
import piezas.models


class Migration(migrations.Migration):

    dependencies = [
        ('piezas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='model',
            name='material',
            field=models.FileField(storage=piezas.models.CustomStorage(), unique=True, upload_to='materials/'),
        ),
        migrations.AlterField(
            model_name='model',
            name='object',
            field=models.FileField(storage=piezas.models.CustomStorage(), unique=True, upload_to='objects/'),
        ),
        migrations.AlterField(
            model_name='model',
            name='texture',
            field=models.ImageField(storage=piezas.models.CustomStorage(), unique=True, upload_to='materials/'),
        ),
    ]
