from rest_framework import serializers 
from .model import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title","body", "category", "created", "updated"]