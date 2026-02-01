import os
import django
import random
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from inventory.models import Case, Property

def populate_cases():
    print("Clearing existing cases (and properties)...")
    Case.objects.all().delete()
    
    stations = ['Central PS', 'North PS', 'Cyber Cell', 'Traffic HQ']
    officers = ['Insp. Rajesh Kumar', 'SI. Amit Singh', 'Insp. Priya Sharma', 'SI. John Doe']
    acts = ['IPC', 'NDPS Act', 'Arms Act']
    
    prop_categories = ['Mobile Phone', 'Laptop', 'Cash', 'Jewelry', 'Vehicle', 'Document']
    belonging_to_opts = ['ACCUSED', 'COMPLAINANT', 'UNKNOWN']
    natures = ['Electronic', 'Valuable', 'Vehicle', 'Documentary']
    
    print("Creating 11 sample cases with properties...")
    
    for i in range(1, 12):
        case = Case.objects.create(
            police_station=random.choice(stations),
            investigating_officer_name=random.choice(officers),
            investigating_officer_id=f"OFF-{100+i}",
            crime_number=f"{1000+i}",
            crime_year=2024,
            date_of_fir=date(2024, 1, 15),
            date_of_seizure=date(2024, 1, 16),
            act_and_law=random.choice(acts),
            section_of_law="379/411",
            status="PENDING" if i % 3 != 0 else "DISPOSED"
        )
        print(f"Created Case: {case}")
        
        num_props = random.randint(1, 2)
        for j in range(num_props):
            prop = Property.objects.create(
                case=case,
                category=random.choice(prop_categories),
                belonging_to=random.choice(belonging_to_opts),
                nature_of_property=random.choice(natures),
                quantity_units="1 Unit",
                location=f"Room {random.randint(1,5)} / Rack {random.randint(1,10)}",
                description=f"Seized item #{j+1} for case {case.crime_number}"
            )
            print(f"  - Added Property: {prop} (ID: {prop.id})")

    print("\nSuccessfully populated 11 cases and properties with QR codes.")

if __name__ == "__main__":
    populate_cases()
