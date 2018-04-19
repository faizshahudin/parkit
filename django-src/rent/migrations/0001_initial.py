# Generated by Django 2.0.4 on 2018-04-19 09:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ParkingForRent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condo', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=100)),
                ('new_area', models.CharField(default=models.CharField(max_length=100), max_length=200, null=True)),
                ('bay', models.CharField(default='Insert Bay Info', max_length=100)),
                ('type_select', models.CharField(choices=[('Landed', 'Landed'), ('Apartment', 'Apartment')], default='Apartment', max_length=100)),
                ('dedicated', models.CharField(choices=[('yes', 'yes'), ('no', 'no')], default='yes', max_length=100)),
                ('time', models.CharField(choices=[('12', '12 Months'), ('6', '6 Months'), ('3', '4 Months'), ('Any', 'Any')], default=12, max_length=100)),
                ('new_time', models.CharField(default='12 Months', max_length=100)),
                ('price', models.CharField(choices=[('300', 'RM300'), ('250', 'RM250'), ('150', 'RM150'), ('Any', 'Any')], default=300, max_length=100)),
                ('new_price', models.CharField(default='RM300', max_length=100)),
                ('status', models.CharField(choices=[('Approved', 'Approved'), ('Occupied', 'Occupied'), ('Pending', 'Pending')], default='Pending', max_length=100)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
