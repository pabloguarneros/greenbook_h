# Generated by Django 3.2.5 on 2021-07-12 20:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_plant_species'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='species',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.PROTECT, to='users.species'),
        ),
    ]
