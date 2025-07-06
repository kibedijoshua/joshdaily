from django.apps import AppConfig
from django.contrib import admin
from . models import Note


class NoteappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'noteapp'
    
    
class NoteAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "created", "updated"]
admin.site.register(Note) 