# Generated by Django 3.1.5 on 2021-01-13 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_project_githublink'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='Description',
            field=models.JSONField(),
        ),
    ]
