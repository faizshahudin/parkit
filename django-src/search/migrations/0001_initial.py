# Generated by Django 2.0.4 on 2018-04-23 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rent', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_model', models.CharField(default='None', max_length=100)),
                ('car_registery', models.CharField(default='ABC1234', max_length=100)),
                ('parked_bay', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bay_vehicle', to='rent.ParkingForRent', to_field='bay')),
                ('parked_condo', models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='rent_id', to='rent.ParkingForRent')),
            ],
        ),
    ]