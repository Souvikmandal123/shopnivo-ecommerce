from django.core.management.base import BaseCommand
from products.models import Category, Product, ProductImage, Review

class Command(BaseCommand):
    help = 'Seeds database with realistic ShopNivo dummy categories and products'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Clearing existing data...'))
        Review.objects.all().delete()
        ProductImage.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating Categories...'))
        
        categories_data = [
            {
                'name': 'Fashion & Dresses',
                'slug': 'dresses-fashion',
                'icon_class': 'fa-shirt',
                'image_url': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
                'description': 'Trending designer dresses, ethnic wear, tops, denim, and formal apparel'
            },
            {
                'name': 'Electronics & Gadgets',
                'slug': 'electronics',
                'icon_class': 'fa-plug-zap',
                'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
                'description': 'Headphones, smartwatches, cameras, Bluetooth speakers & audio gear'
            },
            {
                'name': 'Smartphones & Mobiles',
                'slug': 'smartphones',
                'icon_class': 'fa-mobile-screen-button',
                'image_url': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
                'description': 'Latest 5G smartphones, flagships, budget phones and mobile accessories'
            },
            {
                'name': 'Laptops & Computers',
                'slug': 'laptops',
                'icon_class': 'fa-laptop',
                'image_url': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
                'description': 'Gaming laptops, ultrabooks, monitors, PC accessories and storage'
            },
            {
                'name': 'Footwear & Shoes',
                'slug': 'footwear',
                'icon_class': 'fa-shoe-prints',
                'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
                'description': 'Sneakers, running shoes, formal shoes, sandals, and boots'
            },
            {
                'name': 'Home & Kitchen',
                'slug': 'home-kitchen',
                'icon_class': 'fa-couch',
                'image_url': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
                'description': 'Home decor, bedsheets, cookware, coffee makers, and LED lamps'
            }
        ]

        cat_objs = {}
        for c in categories_data:
            cat = Category.objects.create(**c)
            cat_objs[c['slug']] = cat

        self.stdout.write(self.style.SUCCESS('Creating Products...'))

        products_data = [
            # DRESSES & FASHION
            {
                'category': cat_objs['dresses-fashion'],
                'title': 'Floral Silk Wrap Maxi Dress',
                'slug': 'floral-silk-wrap-maxi-dress',
                'brand': 'Zara Couture',
                'price': 2499.00,
                'original_price': 4999.00,
                'description': 'Elegant floral printed silk wrap dress featuring a v-neckline, cascading flare hem, and breathable lightweight fabric perfect for summer outings and evening parties.',
                'rating': 4.8,
                'reviews_count': 342,
                'stock': 45,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
                'sizes': 'S, M, L, XL',
                'colors': 'Emerald Floral, Crimson Rose, Midnight Navy',
                'specifications_json': {'Material': '100% Pure Mulberry Silk', 'Sleeve': 'Half Flared Sleeve', 'Occasion': 'Party & Evening Wear', 'Care': 'Dry Clean Only'}
            },
            {
                'category': cat_objs['dresses-fashion'],
                'title': 'Embroidered Anarkali Kurti Set',
                'slug': 'embroidered-anarkali-kurti-set',
                'brand': 'Biba Ethnic',
                'price': 3299.00,
                'original_price': 6599.00,
                'description': 'Traditional designer royal blue Anarkali suit set with intricate zari gold embroidery, matching dupatta, and comfortable churidar leggings.',
                'rating': 4.9,
                'reviews_count': 512,
                'stock': 30,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                'sizes': 'XS, S, M, L, XL, XXL',
                'colors': 'Royal Blue, Maroon Gold, Teal Green',
                'specifications_json': {'Fabric': 'Georgette Silk', 'Work': 'Zari Embroidery & Sequins', 'Set Includes': 'Kurta, Leggings & Dupatta'}
            },
            {
                'category': cat_objs['dresses-fashion'],
                'title': 'Classic Denim Trucker Jacket',
                'slug': 'classic-denim-trucker-jacket',
                'brand': 'Levi\'s',
                'price': 2899.00,
                'original_price': 4299.00,
                'description': 'Timeless blue denim jacket crafted from heavy-duty stretch cotton denim, chest flap pockets, button closure, and tailored sleek fit.',
                'rating': 4.6,
                'reviews_count': 189,
                'stock': 60,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'primary_image': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
                'sizes': 'S, M, L, XL',
                'colors': 'Vintage Blue, Washed Black',
                'specifications_json': {'Material': '98% Cotton, 2% Elastane', 'Fit': 'Regular Fit', 'Pattern': 'Solid Denim'}
            },
            {
                'category': cat_objs['dresses-fashion'],
                'title': 'Satin Evening A-Line Gown',
                'slug': 'satin-evening-a-line-gown',
                'brand': 'Mango Formal',
                'price': 3999.00,
                'original_price': 7999.00,
                'description': 'Stunning floor-length satin A-line dress with a sweetheart neckline, thigh-high slit, and comfortable built-in waist cinch.',
                'rating': 4.7,
                'reviews_count': 210,
                'stock': 25,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'primary_image': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
                'sizes': 'S, M, L',
                'colors': 'Champagne Gold, Ruby Red, Jet Black',
                'specifications_json': {'Fabric': 'Heavyweight Premium Satin', 'Length': 'Floor Length', 'Closure': 'Concealed Rear Zipper'}
            },

            # ELECTRONICS & GADGETS
            {
                'category': cat_objs['electronics'],
                'title': 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
                'slug': 'sony-wh1000xm5-wireless-headphones',
                'brand': 'Sony',
                'price': 26990.00,
                'original_price': 34990.00,
                'description': 'Industry-leading Active Noise Cancellation with 8 microphones, 30-hour battery life, ultra-comfortable lightweight design, and crystal-clear hands-free calling.',
                'rating': 4.9,
                'reviews_count': 1420,
                'stock': 85,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
                'sizes': '',
                'colors': 'Silver Platinum, Black, Midnight Blue',
                'specifications_json': {'Battery Life': '30 Hours', 'Bluetooth': 'v5.2', 'Driver Unit': '30mm', 'Noise Cancellation': 'Dual Processor V1'}
            },
            {
                'category': cat_objs['electronics'],
                'title': 'Apple Watch Series 9 GPS 45mm',
                'slug': 'apple-watch-series-9-gps',
                'brand': 'Apple',
                'price': 41900.00,
                'original_price': 44900.00,
                'description': 'S9 SiP chip with Double Tap magic gesture, brighter 2000-nits Always-On Retina display, precise ECG, SpO2 blood oxygen tracking, and advanced fitness workouts.',
                'rating': 4.8,
                'reviews_count': 950,
                'stock': 40,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
                'sizes': '41mm, 45mm',
                'colors': 'Midnight, Starlight, Silver, (PRODUCT)RED',
                'specifications_json': {'Display': 'Always-On Retina OLED', 'Water Resistance': '50 Meters', 'Chip': 'Apple S9 SiP'}
            },
            {
                'category': cat_objs['electronics'],
                'title': 'JBL Charge 5 Portable Waterproof Speaker',
                'slug': 'jbl-charge-5-portable-speaker',
                'brand': 'JBL',
                'price': 12999.00,
                'original_price': 17999.00,
                'description': 'Bold JBL Original Pro Sound with long excursion driver, separate tweeter and dual JBL bass radiators. IP67 waterproof/dustproof with built-in powerbank.',
                'rating': 4.7,
                'reviews_count': 640,
                'stock': 120,
                'is_featured': False,
                'is_deal_of_the_day': False,
                'primary_image': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
                'sizes': '',
                'colors': 'Squad Camo, Ocean Blue, Fiery Red, Black',
                'specifications_json': {'Battery Life': '20 Hours', 'Waterproof': 'IP67 Rated', 'Output Power': '40W RMS'}
            },

            # SMARTPHONES & MOBILES
            {
                'category': cat_objs['smartphones'],
                'title': 'Samsung Galaxy S24 Ultra 5G (512GB)',
                'slug': 'samsung-galaxy-s24-ultra-5g',
                'brand': 'Samsung',
                'price': 129999.00,
                'original_price': 139999.00,
                'description': 'Unleash Galaxy AI with Circle to Search, Live Translate, 200MP Quad Telephoto Camera with 100x Space Zoom, Titanium Armor frame and embedded S Pen.',
                'rating': 4.9,
                'reviews_count': 1850,
                'stock': 35,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
                'sizes': '256GB, 512GB, 1TB',
                'colors': 'Titanium Gray, Titanium Black, Titanium Violet',
                'specifications_json': {'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB LPDDR5X', 'Display': '6.8" QHD+ 120Hz AMOLED', 'Battery': '5000mAh'}
            },
            {
                'category': cat_objs['smartphones'],
                'title': 'Apple iPhone 15 Pro Max (256GB)',
                'slug': 'apple-iphone-15-pro-max',
                'brand': 'Apple',
                'price': 148900.00,
                'original_price': 159900.00,
                'description': 'Forged in Aerospace-grade Titanium, A17 Pro game-changing GPU chip, 48MP main camera with 5x Optical Telephoto zoom, and Action button.',
                'rating': 4.9,
                'reviews_count': 2400,
                'stock': 50,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'primary_image': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
                'sizes': '256GB, 512GB, 1TB',
                'colors': 'Natural Titanium, Blue Titanium, White Titanium',
                'specifications_json': {'Chip': 'A17 Pro Chip', 'Camera': '48MP + 12MP UltraWide + 12MP 5x Telephoto', 'Port': 'USB-C 3.0'}
            },
            {
                'category': cat_objs['smartphones'],
                'title': 'OnePlus 12 5G (16GB RAM / 512GB)',
                'slug': 'oneplus-12-5g',
                'brand': 'OnePlus',
                'price': 64999.00,
                'original_price': 69999.00,
                'description': '4th Gen Hasselblad Camera for Mobile, 2K 120Hz ProXDR display, Snapdragon 8 Gen 3, 100W SUPERVOOC charging, and massive 5400mAh battery.',
                'rating': 4.7,
                'reviews_count': 780,
                'stock': 65,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
                'sizes': '256GB, 512GB',
                'colors': 'Emerald Green, Silky Black',
                'specifications_json': {'RAM/Storage': '16GB / 512GB', 'Charging': '100W Wired / 50W Wireless', 'Main Camera': '50MP Sony LYT-808'}
            },

            # LAPTOPS & COMPUTERS
            {
                'category': cat_objs['laptops'],
                'title': 'Apple MacBook Air M3 15-inch',
                'slug': 'apple-macbook-air-m3-15-inch',
                'brand': 'Apple',
                'price': 134900.00,
                'original_price': 144900.00,
                'description': 'Supercharged by M3 chip, impossibly thin 11.5mm design, up to 18 hours of battery life, vibrant 15.3" Liquid Retina display, and fanless silent operation.',
                'rating': 4.9,
                'reviews_count': 1120,
                'stock': 28,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
                'sizes': '8GB/256GB, 16GB/512GB',
                'colors': 'Midnight, Starlight, Space Gray, Silver',
                'specifications_json': {'Processor': 'Apple M3 8-Core CPU', 'GPU': '10-Core GPU', 'Display': '15.3-inch Liquid Retina', 'Weight': '1.51 kg'}
            },
            {
                'category': cat_objs['laptops'],
                'title': 'ASUS ROG Zephyrus G16 Gaming Laptop',
                'slug': 'asus-rog-zephyrus-g16',
                'brand': 'ASUS',
                'price': 179990.00,
                'original_price': 219990.00,
                'description': 'Intel Core Ultra 9 processor, NVIDIA GeForce RTX 4070 GPU, 2.5K 240Hz ROG Nebula OLED display, ultra-sleek CNC aluminum body with AniMe Matrix lighting.',
                'rating': 4.8,
                'reviews_count': 410,
                'stock': 18,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'primary_image': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
                'sizes': '16GB/1TB, 32GB/2TB',
                'colors': 'Eclipse Gray, Platinum White',
                'specifications_json': {'Graphics': 'RTX 4070 8GB GDDR6', 'Display': '16" 240Hz OLED 0.2ms', 'RAM': '32GB LPDDR5X'}
            },

            # FOOTWEAR & SHOES
            {
                'category': cat_objs['footwear'],
                'title': 'Nike Air Jordan 1 Retro High OG',
                'slug': 'nike-air-jordan-1-retro-high-og',
                'brand': 'Nike',
                'price': 14995.00,
                'original_price': 18995.00,
                'description': 'Iconic high-top sneakers crafted from genuine premium leather, encapsulated Air-Sole unit for responsive cushioning, and classic Chicago color blocking.',
                'rating': 4.9,
                'reviews_count': 3100,
                'stock': 40,
                'is_featured': True,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
                'sizes': 'UK 7, UK 8, UK 9, UK 10, UK 11',
                'colors': 'Chicago Red White, Shadow Gray, Royal Blue',
                'specifications_json': {'Sole': 'Rubber Traction Sole', 'Closure': 'Lace-Up', 'Upper Material': '100% Full-Grain Leather'}
            },
            {
                'category': cat_objs['footwear'],
                'title': 'Adidas Ultraboost Light Running Shoes',
                'slug': 'adidas-ultraboost-light-running-shoes',
                'brand': 'Adidas',
                'price': 9999.00,
                'original_price': 16999.00,
                'description': '30% lighter Light BOOST material delivering maximum energy return per stride, PRIMEKNIT+ textile upper, Continental Rubber outsole for superior grip.',
                'rating': 4.7,
                'reviews_count': 890,
                'stock': 75,
                'is_featured': False,
                'is_deal_of_the_day': True,
                'primary_image': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
                'sizes': 'UK 6, UK 7, UK 8, UK 9, UK 10',
                'colors': 'Solar Red, Core Black, Cloud White',
                'specifications_json': {'Cushioning': 'Light BOOST', 'Outsole': 'Continental Rubber', 'Upper': 'PRIMEKNIT Textile'}
            },

            # HOME & KITCHEN
            {
                'category': cat_objs['home-kitchen'],
                'title': 'De\'Longhi Dedica Deluxe Espresso Machine',
                'slug': 'delonghi-dedica-deluxe-espresso-machine',
                'brand': 'De\'Longhi',
                'price': 19999.00,
                'original_price': 27999.00,
                'description': '15-bar professional pressure pump, ultra-compact 6-inch slim stainless steel body, adjustable milk frother for creamy cappuccinos and lattes.',
                'rating': 4.8,
                'reviews_count': 530,
                'stock': 22,
                'is_featured': True,
                'is_deal_of_the_day': False,
                'primary_image': 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=800&q=80',
                'sizes': '',
                'colors': 'Brushed Stainless, Matte Black, Red',
                'specifications_json': {'Pressure': '15 Bar Italian Pump', 'Water Tank': '1.1 Liters', 'Material': 'Stainless Steel'}
            }
        ]

        for p_data in products_data:
            p = Product.objects.create(**p_data)
            # Create extra product images
            ProductImage.objects.create(product=p, image_url=p.primary_image, alt_text=p.title)
            
            # Create sample reviews
            Review.objects.create(
                product=p,
                author='Rahul Sharma',
                rating=5,
                comment=f'Absolutely love this {p.title}! Premium quality, fast shipping, and exactly as pictured.'
            )
            Review.objects.create(
                product=p,
                author='Priya Verma',
                rating=4,
                comment='Great value for money! The build quality and finish exceed expectations.'
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(categories_data)} categories and {len(products_data)} products!'))
