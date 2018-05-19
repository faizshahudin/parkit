from django.contrib import admin

# Register your models here.
from .models import ParkingForRent

class ParkingForRentAdmin(admin.ModelAdmin):
	list_display = ["user","db_property","db_address","db_longitude","db_latitude","db_area", "db_bay","db_type","db_reserved","db_period","db_price","db_status","timestamp"]
#	list_display_links = ["updated"]
#	list_editable = ["title"]
#	list_filter = ["updated", "timestamp"]

#	search_fields = ["title", "content"]

	class Meta:
		model = ParkingForRent

admin.site.register(ParkingForRent, ParkingForRentAdmin)