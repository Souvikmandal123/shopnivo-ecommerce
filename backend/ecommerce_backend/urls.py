import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def serve_index(request):
    index_path = settings.BASE_DIR.parent / 'frontend' / 'index.html'
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse("ShopNivo Frontend Not Found", status=444)

urlpatterns = [
    path('', serve_index, name='home'),
    re_path(r'^(?P<path>(css|js)/.*)$', serve, {'document_root': settings.BASE_DIR.parent / 'frontend'}),
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
