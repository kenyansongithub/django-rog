
=================
Regions on Github
=================

Region on Github is a simple Django app to track github events/activities
of people from a given set of regions.

Detailed documentation is in the "docs" directory.

Quick start
-----------

1. Add "rog" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'rog',
    ]

2. Include the rog URLconf in your project urls.py like this::

    url(r'^rog/', include('rog.urls')),

3. Run `python manage.py migrate` to create the polls models.

4. Start the development server and visit http://127.0.0.1:8000/admin/
   to create a location (you'll need the Admin app enabled).

5. Visit http://127.0.0.1:8000/rog/ to view the users' (from the location) activities
