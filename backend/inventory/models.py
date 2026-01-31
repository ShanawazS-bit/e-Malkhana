from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image

class Case(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('DISPOSED', 'Disposed'),
    ]

    police_station = models.CharField(max_length=255)
    investigating_officer_name = models.CharField(max_length=255)
    investigating_officer_id = models.CharField(max_length=100)
    crime_number = models.CharField(max_length=100)
    crime_year = models.IntegerField()
    date_of_fir = models.DateField()
    date_of_seizure = models.DateField()
    act_and_law = models.CharField(max_length=255)
    section_of_law = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.crime_number}/{self.crime_year} - {self.police_station}"

class Property(models.Model):
    BELONGING_CHOICES = [
        ('ACCUSED', 'Accused'),
        ('COMPLAINANT', 'Complainant'),
        ('UNKNOWN', 'Unknown'),
    ]

    case = models.ForeignKey(Case, related_name='properties', on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    belonging_to = models.CharField(max_length=20, choices=BELONGING_CHOICES)
    nature_of_property = models.CharField(max_length=255)
    quantity_units = models.CharField(max_length=100)
    location = models.CharField(max_length=255, help_text="Rack / Room / Locker ID")
    description = models.TextField()
    photo = models.ImageField(upload_to='property_photos/', blank=True, null=True)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)

    def save(self, *args, **kwargs):
        # 1. Save first to get the ID
        if not self.id:
            super().save(*args, **kwargs)

        # 2. Generate QR Code if missing
        if not self.qr_code:
            # Barebones content: Just the URL or ID
            qr_content = f"PROPERTY-ID:{self.id}"
            
            qr = qrcode.make(qr_content)
            buffer = BytesIO()
            qr.save(buffer, format="PNG")
            
            self.qr_code.save(f'qr_{self.id}.png', File(buffer), save=False)
            super().save(update_fields=['qr_code'])

    def __str__(self):
        return f"{self.category} - {self.quantity_units}"
