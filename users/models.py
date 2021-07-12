from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image

class Species(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=150)

class Plant(models.Model):
    def __str__(self):
        return self.nickname

    species = models.ForeignKey(Species, on_delete=models.PROTECT, blank=True, null=True, default=None)
    nickname = models.CharField(max_length=40)

def plant_directory_path(instance, filename): 
    return 'media/plants/{0}/{1}'.format(instance.plant.pk, f"{filename}") 

class Record(models.Model):

    class Meta:
        ordering = ['-date_recorded']

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to = plant_directory_path, blank=True)
    health = models.IntegerField(default=0)
    date_recorded = models.DateTimeField(auto_now_add=True)

def user_directory_path(instance, filename): 
    return 'media/users/{0}/{1}'.format(instance.username, f"{filename}") 

class User(AbstractUser):
    email = models.EmailField('email', unique=True)
    photo = models.ImageField(upload_to=user_directory_path,blank=True)
    plants = models.ManyToManyField(Plant)

    def save(self, *args, **kawrgs):
        super().save(*args, **kawrgs)
        if (self.photo):
            image = Image.open(self.photo.path)

            if image.width > 512 or image.height > 512:
                new_img = (512, 512)
                image.thumbnail(new_img)
                image = image.convert() #convert transparency to new image!
                image.save(self.photo.path)  # saving image at the same path


