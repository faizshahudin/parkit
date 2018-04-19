from django.contrib import admin

# Register your models here.
from .models import ParkingForRent

class ParkingForRentAdmin(admin.ModelAdmin):
	list_display = ["user","condo", "new_area", "bay","type_select","dedicated","new_time","new_price","status","timestamp"]
#	list_display_links = ["updated"]
#	list_editable = ["title"]
#	list_filter = ["updated", "timestamp"]

#	search_fields = ["title", "content"]

	class Meta:
		model = ParkingForRent

admin.site.register(ParkingForRent, ParkingForRentAdmin)