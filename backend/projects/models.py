from django.db import models

# Create your models here.
class Project(models.Model):
    Title = models.CharField(max_length=120)
    Description = models.CharField(max_length=120)
    PhotoName = models.CharField(max_length=120)
    Tags = models.JSONField()
    GithubLink = models.CharField(max_length=120)