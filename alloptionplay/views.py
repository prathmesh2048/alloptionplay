from django.shortcuts import render

def home(request):
    template = 'alloptionplay/home.html'
    context ={}
    return render(request,template,context)
    