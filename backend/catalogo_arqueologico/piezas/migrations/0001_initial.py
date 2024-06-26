# Generated by Django 4.2.13 on 2024-06-03 01:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artifact',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Culture',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CultureIds',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('culture', models.IntegerField(default=0)),
                ('artifactid', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('path', models.ImageField(unique=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Model',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('texture', models.ImageField(unique=True, upload_to='materials/')),
                ('object', models.FileField(unique=True, upload_to='objects/')),
                ('material', models.FileField(unique=True, upload_to='materials/')),
            ],
        ),
        migrations.CreateModel(
            name='Shape',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ShapeIds',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('shape', models.IntegerField(default=0)),
                ('artifactid', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TagsIds',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('tag', models.IntegerField(default=0)),
                ('artifactid', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Thumbnail',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('path', models.ImageField(unique=True, upload_to='thumbnails/')),
            ],
        ),
        migrations.AddConstraint(
            model_name='tagsids',
            constraint=models.UniqueConstraint(fields=('tag', 'artifactid'), name='unique_tag_artifact'),
        ),
        migrations.AddConstraint(
            model_name='shapeids',
            constraint=models.UniqueConstraint(fields=('shape', 'artifactid'), name='unique_shape_artifact'),
        ),
        migrations.AddField(
            model_name='image',
            name='id_artifact',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='artifact', to='piezas.artifact'),
        ),
        migrations.AddConstraint(
            model_name='cultureids',
            constraint=models.UniqueConstraint(fields=('culture', 'artifactid'), name='unique_culture_artifact'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='id_culture',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='culture', to='piezas.culture'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='id_model',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='model3d', to='piezas.model'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='id_shape',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='shape', to='piezas.shape'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='id_tags',
            field=models.ManyToManyField(to='piezas.tag'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='id_thumbnail',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='thumbnail', to='piezas.thumbnail'),
        ),
    ]
