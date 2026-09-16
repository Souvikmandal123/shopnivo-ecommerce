from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon_class = models.CharField(max_length=50, default='fa-boxes-stacked')
    image_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True)
    is_featured = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    brand = models.CharField(max_length=100, default='Generic')
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percentage = models.IntegerField(default=0)
    description = models.TextField()
    rating = models.FloatField(default=4.5)
    reviews_count = models.IntegerField(default=128)
    stock = models.IntegerField(default=50)
    is_featured = models.BooleanField(default=False)
    is_deal_of_the_day = models.BooleanField(default=False)
    primary_image = models.URLField()
    sizes = models.CharField(max_length=100, blank=True, help_text="Comma-separated e.g. S,M,L,XL")
    colors = models.CharField(max_length=100, blank=True, help_text="Comma-separated e.g. Red,Blue,Black")
    specifications_json = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.original_price and self.price and self.original_price > self.price:
            self.discount_percentage = int(((self.original_price - self.price) / self.original_price) * 100)
        super().save(*args, **kwargs)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField()
    alt_text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Image for {self.product.title}"


class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.author} for {self.product.title}"
