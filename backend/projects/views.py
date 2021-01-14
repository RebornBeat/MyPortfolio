from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Project

@csrf_exempt
def fetch(request):
    project_dict = {}
    all_projects = Project.objects.all()
    print(all_projects)
    for i in all_projects:
        project_dict[i.pk] = { "Title": i.Title,  "Description": i.Description, "PhotoName": i.PhotoName, "Tags": i.Tags, "GithubLink": i.GithubLink}
    return JsonResponse({'details': project_dict})
