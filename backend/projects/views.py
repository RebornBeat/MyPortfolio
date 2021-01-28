from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Project
from django.core.mail import send_mail
from django.conf import settings
import json

@csrf_exempt
def fetch(request):
    project_dict = {}
    all_projects = Project.objects.all()
    print(all_projects)
    for i in all_projects:
        project_dict[i.pk] = { "Title": i.Title,  "Description": i.Description, "PhotoName": i.PhotoName, "Tags": i.Tags, "GithubLink": i.GithubLink, "DemoLink": i.DemoLink }
    return JsonResponse({'details': project_dict})

@csrf_exempt
def contact(request):
    if request.method =="POST":
        data = json.loads(request.body.decode('utf-8'))["data"]
        
        if "@" in data["fromEmail"]:
            if "." in data["fromEmail"]:
                print("valid")
            else:
                return JsonResponse({'details': "nonEmail"})
        else:
            return JsonResponse({'details': "nonEmail"})
        
        if data["fromEmail"] == "n/a":
            return JsonResponse({'details': "emptyEmail"})
        
        if data["subject"] == "n/a":
            return JsonResponse({'details': "emptySubject"})
        
        if data["content"] == "n/a":
            return JsonResponse({'details': "emptyContent"})
        
        subject = "".join((data["subject"], " (Possible Web Dev Hire) "))
        content = "".join((data["content"], " Emailed from - ", data["fromEmail"]))
        email_from = settings.EMAIL_HOST_USER 
        recipient_list = [email_from]
        send_mail( subject, content, email_from, recipient_list )
        subject = " Thank you for contacting me"
        content = " This is an automated message. I have received your contact request and will respond ASAP. "
        recipient_list = [data["fromEmail"]]
        send_mail( subject, content, email_from, recipient_list )
    return JsonResponse({'details': "accepted"})
