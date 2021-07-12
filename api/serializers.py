from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from users.models import User, Plant, Record, Species


class RecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Record
        fields = ('pk','photo','health','date_recorded')

class SpeciesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Species
        fields = ('pk','name')
    
class PlantSerializer(serializers.ModelSerializer):

    record_set = RecordSerializer(many=True,read_only=True)
    species = SpeciesSerializer(read_only=True)

    class Meta:
        model = Plant
        fields = ('pk','species','nickname','record_set')

class UserSerializer(serializers.ModelSerializer):

    plants = PlantSerializer(many=True,read_only=True)

    class Meta:
        model = User
        fields = ('pk','username','photo','plants')
