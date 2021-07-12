# Generated by Django 3.2.5 on 2021-07-11 16:28

from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_plant_nickname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plant',
            name='records',
        ),
        migrations.AddField(
            model_name='record',
            name='plant',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.plant'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='record',
            name='photo',
            field=models.ImageField(blank=True, upload_to=users.models.plant_directory_path),
        ),
    ]
