import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from inventory.models import Case, Property
from django.core.files.base import ContentFile

def test_qr():
    # Create Dummy Case
    case = Case.objects.create(
        police_station="TEST-STATION",
        crime_number="999",
        crime_year=2026,
        date_of_fir="2026-01-01",
        date_of_seizure="2026-01-01",
        investigating_officer_name="Tester",
        investigating_officer_id="T1",
        act_and_law="Test Act",
        section_of_law="101"
    )
    print(f"Created Case ID: {case.id}")

    # Create Property (Should generate QR)
    prop = Property.objects.create(
        case=case,
        category="Test Item",
        nature_of_property="Seized",
        quantity_units="1",
        location="Lab",
        description="Simplest Test"
    )
    
    print(f"Created Property ID: {prop.id}")
    print(f"QR Code Path: {prop.qr_code.name}")
    
    if prop.qr_code and "qr_" in prop.qr_code.name:
        print("SUCCESS: QR Code generated with simple name.")
    else:
        print("FAILURE: QR Code missing or named incorrectly.")

if __name__ == "__main__":
    test_qr()
