from django.contrib import admin
from .models import Note

# Register your models here.
@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created', 'updated']
    list_filter = ['category', 'created', 'updated']
    search_fields = ['title', 'body']
    readonly_fields = ['created', 'updated']
    ordering = ['-created']
