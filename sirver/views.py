from django.shortcuts import render
    
def serve_react_app(request):
    return render(request, "index.html")
