from rest_framework import serializers
from .models import Category, Product, ProductImage, Review

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'author', 'rating', 'comment', 'created_at']


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon_class', 'image_url', 'description', 'is_featured', 'product_count']

    def get_product_count(self, obj):
        return obj.products.count()


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    sizes_list = serializers.SerializerMethodField()
    colors_list = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'brand', 'category', 'category_name', 'category_slug',
            'price', 'original_price', 'discount_percentage', 'description', 'rating',
            'reviews_count', 'stock', 'is_featured', 'is_deal_of_the_day', 'primary_image',
            'sizes', 'sizes_list', 'colors', 'colors_list', 'specifications_json',
            'images', 'reviews', 'created_at'
        ]

    def get_sizes_list(self, obj):
        return [s.strip() for s in obj.sizes.split(',')] if obj.sizes else []

    def get_colors_list(self, obj):
        return [c.strip() for c in obj.colors.split(',')] if obj.colors else []
