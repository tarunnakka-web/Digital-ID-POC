const data = [
    {
      id: 1,
      name: "Whiskey Bottle",
      caption: "Premium aged malt whiskey",
      price: 1250,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589502/whisky_bottle_cxtmf7.webp",
      description: "This premium malt whiskey is aged for over 12 years in oak barrels, delivering a smooth and rich flavor profile with hints of caramel, vanilla, and smoke. Ideal for connoisseurs and special occasions."
    },
    {
      id: 2,
      name: "Pocket Knife",
      caption: "Compact stainless steel utility knife",
      price: 199,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589576/pocket_knife_ldmu7y.jpg",
      description: "A versatile, foldable stainless steel pocket knife with a locking blade, ideal for camping, survival kits, and daily utility. Lightweight and easy to carry with a textured grip for safety."
    },
    {
      id: 3,
      name: "Fireworks",
      caption: "Vibrant and colorful celebration fireworks",
      price: 599,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589664/fireworks_poxtcm.webp",
      description: "A set of multicolor aerial fireworks designed for festivals, weddings, and New Year's celebrations. Includes rockets, fountains, and sparklers for a spectacular show."
    },
    {
      id: 4,
      name: "Adult Toy",
      caption: "Discreet and personal wellness product",
      price: 799,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589779/adult_toys_as8s9q.jpg",
      description: "A personal massager crafted for relaxation and well-being. Features multiple vibration settings, waterproof design, and medical-grade silicone for a safe and hygienic experience."
    },
    {
      id: 5,
      name: "White Shoes",
      caption: "Stylish all-white sneakers for everyday use",
      price: 1099,
      criteria: "authorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745559766/cld-sample-5.jpg",
      description: "Modern white sneakers designed for comfort and daily wear. Breathable mesh upper with cushioned sole support, suitable for casual and semi-formal outfits."
    },
    {
      id: 6,
      name: "Analog watch",
      caption: "Classic timepiece with leather strap",
      price: 799,
      criteria: "authorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745559755/samples/ecommerce/analog-classic.jpg",
      description: "A timeless analog wristwatch featuring a stainless-steel case and a durable genuine leather strap. Water-resistant and perfect for both work and leisure."
    },
    {
      id: 7,
      name: "Leather Bag",
      caption: "Genuine leather office sling bag",
      price: 999,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589847/crocodile_leather_bags_mzpkvp.jpg",
      description: "A stylish crocodile-textured sling bag made from premium leather, perfect for office or travel. Includes padded laptop compartment, organizer sections, and magnetic closure."
    },
    {
      id: 8,
      name: "Cigarette Pack",
      caption: "Premium tobacco cigarette pack",
      price: 399,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589902/cigaratte_drpste.webp",
      description: "A pack of high-quality tobacco cigarettes offering a smooth and consistent smoking experience. Carefully packed for freshness and lasting aroma."
    },
    {
      id: 9,
      name: "Prescription",
      caption: "Bottle of regulated prescription pills",
      price: 499,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589973/priscription_pills_ba6eha.webp",
      description: "A sealed bottle of physician-prescribed medication intended for specific therapeutic use. Only available under medical supervision and regulation."
    },
    {
      id: 10,
      name: "Vaping Kit",
      caption: "Rechargeable vape kit with ....",
      price: 599,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590076/bongs_su1maz.webp",
      description: "A complete vaping kit with rechargeable battery, refillable tank, and USB charger. Delivers smooth vapor and includes safety protections against overcharging and overheating."
    },
    {
      id: 11,
      name: "Hazardous Chemical",
      caption: "Highly reactive laboratory chemical",
      price: 1599,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590322/Chemical_spill_z1nkai.webp",
      description: "Specialized chemical compound used in industrial and laboratory settings. Requires proper handling, PPE, and secure storage due to its volatile nature."
    },
    {
      id: 12,
      name: "Ivory Artifact",
      caption: "Traditional ornament made from ivory",
      price: 699,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590496/organic_capsules_wvk6zh.webp",
      description: "An antique-inspired decorative piece crafted from ivory, showcasing intricate hand-carved patterns. Cultural artifact with restricted trade due to conservation laws."
    },
    {
      id: 13,
      name: "Alcohol making kits",
      caption: "Home brewing equipment for alcohol",
      price: 2999,
      criteria: "unauthorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590647/alcohol_making_kits_v93jkt.webp",
      description: "Comprehensive home brewing kit including fermentation containers, airlocks, thermometer, and sanitizers. Ideal for hobbyists looking to craft their own beer, wine, or spirits."
    },
    {
      id: 14,
      name: "Books",
      caption: "Bestselling fiction and non-fiction books",
      price: 499,
      criteria: "authorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591231/book_qt6xtm.webp",
      description: "A collection of must-read books spanning various genres including thriller, romance, business, and self-help. Perfect for casual readers and avid bibliophiles."
    },
    {
      id: 15,
      name: "iPhone",
      caption: "Latest generation Apple smartphone",
      price: 87000,
      criteria: "authorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591309/iphone_yngytm.webp",
      description: "Experience cutting-edge technology with the latest iPhone featuring A16 Bionic chip, OLED display, multi-lens camera system, and robust privacy protections."
    },
    {
      id: 16,
      name: "sports t-shirt",
      caption: "Breathable activewear for workouts",
      price: 699,
      criteria: "authorized",
      url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591363/sports_tshirt_gf4qz6.jpg",
      description: "This lightweight and sweat-resistant sports t-shirt is designed for high-performance workouts. Includes mesh ventilation panels and stretchable fit for full range of motion."
    }
  ];
  

  export default data