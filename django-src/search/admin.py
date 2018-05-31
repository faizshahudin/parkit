from django.contrib import admin

# Register your models here.
from .models import ParkingEnquiry

class ParkingEnquiryAdmin(admin.ModelAdmin):
	list_display = ["db_location","db_office","db_period", "db_price","db_status","timestamp"]
#	list_display_links = ["updated"]
#	list_editable = ["title"]
#	list_filter = ["updated", "timestamp"]

#	search_fields = ["title", "content"]

	class Meta:
		model = ParkingEnquiry

admin.site.register(ParkingEnquiry, ParkingEnquiryAdmin)