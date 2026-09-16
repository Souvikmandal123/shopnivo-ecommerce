from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, deal_of_the_day_list

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('deals/', deal_of_the_day_list, name='deals-list'),
]
