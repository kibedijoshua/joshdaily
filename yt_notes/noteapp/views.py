from django.shortcuts import render
from noteapp.models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status   

# Create your views here.
@api_view(["GET", "POST"])
def notes(request):
    if request.method == "GET":
        notes_qs = Note.objects.all()
        serializer = NoteSerializer(notes_qs, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 201)
        return Response(serializer.errors, status = 400)

@api_view(["GET", "PUT", "DELETE"])    
def note_detail(request, slug):
    try:
        note = Note.objects.get(slug=slug)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) 
    if request.method == "GET":   
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = NoteSerializer(note, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status = 400)
    elif request.method == "DELETE":
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)