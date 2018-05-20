from django.contrib import admin
from vehicle.models import CarDatabase

# Register your models here.

class CarDatabaseAdmin(admin.ModelAdmin):
	list_display = ["user","car_model","car_registery","occupied_by","start_date"]
#	list_display_links = ["updated"]
#	list_editable = ["title"]
#	list_filter = ["updated", "timestamp"]

#	search_fields = ["title", "content"]

	class Meta:
		model = CarDatabase

admin.site.register(CarDatabase, CarDatabaseAdmin)