# Generated by Django 3.2.5 on 2021-07-11 17:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20210711_1628'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='record',
            options={'ordering': ['-date_recorded']},
        ),
    ]
