from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all().select_related('category').prefetch_related('images', 'reviews')
        
        # Filtering parameters
        category_slug = self.request.query_params.get('category')
        search_query = self.request.query_params.get('search')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        min_rating = self.request.query_params.get('min_rating')
        brand = self.request.query_params.get('brand')
        is_featured = self.request.query_params.get('featured')
        is_deal = self.request.query_params.get('deal')
        ordering = self.request.query_params.get('ordering')

        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)

        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(brand__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )

        if min_price:
            try:
                queryset = queryset.filter(price__gte=float(min_price))
            except ValueError:
                pass

        if max_price:
            try:
                queryset = queryset.filter(price__lte=float(max_price))
            except ValueError:
                pass

        if min_rating:
            try:
                queryset = queryset.filter(rating__gte=float(min_rating))
            except ValueError:
                pass

        if brand:
            queryset = queryset.filter(brand__iexact=brand)

        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)

        if is_deal == 'true':
            queryset = queryset.filter(is_deal_of_the_day=True)

        # Ordering
        if ordering == 'price_low':
            queryset = queryset.order_by('price')
        elif ordering == 'price_high':
            queryset = queryset.order_by('-price')
        elif ordering == 'rating':
            queryset = queryset.order_by('-rating')
        elif ordering == 'newest':
            queryset = queryset.order_by('-created_at')
        elif ordering == 'discount':
            queryset = queryset.order_by('-discount_percentage')

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all().select_related('category').prefetch_related('images', 'reviews')
    serializer_class = ProductSerializer


@api_view(['GET'])
def deal_of_the_day_list(request):
    deals = Product.objects.filter(is_deal_of_the_day=True)[:8]
    serializer = ProductSerializer(deals, many=True)
    return Response({
        'title': 'Deal of the Day',
        'ends_in_seconds': 43200, # 12 hours countdown
        'products': serializer.data
    })
