# Generated by Django 3.2.20 on 2023-08-02 12:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('story', '0002_story_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='story',
            name='response',
        ),
    ]
