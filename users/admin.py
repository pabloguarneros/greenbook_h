from django.contrib import admin
from .models import Plant, Record, Species, User

class SpeciesAdmin(admin.ModelAdmin):
    list_display=('name',)

class RecordAdmin(admin.ModelAdmin):
    list_display=('plant','health','date_recorded')

admin.site.register(Plant)
admin.site.register(Record, RecordAdmin)
admin.site.register(Species, SpeciesAdmin)
admin.site.register(User)
