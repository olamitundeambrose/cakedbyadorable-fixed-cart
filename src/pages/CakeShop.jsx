import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ShoppingCart, Plus, Filter, X } from 'lucide-react';
import CakeBuilder from '@/components/CakeBuilder';

const categories = [
  { id: 'all', label: 'All Cakes' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'novelty', label: 'Novelty' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'buttercream', label: 'Buttercream' },
  { id: 'birthday', label: 'Birthday' },
];

// Demo cakes data
const demoCakes = [
  {
    id: 1,
    name: "Elegant Wedding Cake",
    category: "wedding",
    price: 450,
    image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    description: "Three-tier wedding cake with delicate sugar flowers and pearl details"
  },
  {
    id: 2,
    name: "Chocolate Birthday Delight",
    category: "birthday",
    price: 85,
    image_url: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&q=80",
    description: "Rich chocolate cake with buttercream frosting and colorful decorations"
  },
  {
    id: 3,
    name: "Unicorn Fantasy Cake",
    category: "novelty",
    price: 120,
    image_url: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80",
    description: "Magical unicorn-themed cake perfect for children's parties"
  },
  {
    id: 4,
    name: "Corporate Logo Cake",
    category: "corporate",
    price: 200,
    image_url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80",
    description: "Professional cake with custom logo design for corporate events"
  },
  {
    id: 5,
    name: "Rose Buttercream Cake",
    category: "buttercream",
    price: 95,
    image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
    description: "Beautiful buttercream roses on vanilla sponge cake"
  },
  {
    id: 6,
    name: "Vintage Wedding Tower",
    category: "wedding",
    price: 650,
    image_url: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80",
    description: "Five-tier vintage-style wedding cake with intricate piping"
  },
  {
    id: 7,
    name: "Superhero Birthday Cake",
    category: "birthday",
    price: 110,
    image_url: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&q=80",
    description: "Action-packed superhero themed birthday cake"
  },
  {
    id: 8,
    name: "Floral Buttercream Garden",
    category: "buttercream",
    price: 140,
    image_url: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80",
    description: "Garden-inspired cake with buttercream flowers and greenery"
  }
];

export default function CakeShop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const queryClient = useQueryClient();

  // Get category from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && categories.find(c => c.id === category)) {
      setSelectedCategory(category);
    }
  }, []);

  const { data: cakes = [], isLoading } = useQuery({
    queryKey: ['cakes'],
    queryFn: () => Promise.resolve(demoCakes), // Use demo data instead of API
    initialData: demoCakes,
  });

  const addToCartMutation = useMutation({
    mutationFn: (cake) => base44.entities.CartItem.create({
      cake_id: cake.id,
      cake_name: cake.name,
      quantity: 1,
      price: cake.price,
      image_url: cake.image_url,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      toast.success('Added to cart!');
    },
  });

  const filteredCakes = selectedCategory === 'all' 
    ? cakes 
    : cakes.filter(cake => cake.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Cake Builder Section */}
      <CakeBuilder />
      
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Our Collection</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mt-4 mb-4">
              Cake Shop
            </h1>
            <p className="text-stone-600 text-lg">
              Discover our exquisite collection of handcrafted cakes, each made with love 
              and the finest ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters - Desktop */}
          <div className="hidden md:flex justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-stone-800 hover:bg-stone-900 text-white' 
                    : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between rounded-full"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {categories.find(c => c.id === selectedCategory)?.label}
              </span>
              {showFilters ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </Button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setShowFilters(false);
                        }}
                        className={`rounded-full ${
                          selectedCategory === category.id 
                            ? 'bg-stone-800 text-white' 
                            : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cake Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-3xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredCakes.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredCakes.map((cake, index) => (
                  <motion.div
                    key={cake.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={cake.image_url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80'}
                          alt={cake.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {cake.featured && (
                          <Badge className="absolute top-4 left-4 bg-rose-400 text-white">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Quick Add Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Button
                            onClick={() => addToCartMutation.mutate(cake)}
                            disabled={addToCartMutation.isPending}
                            className="w-full bg-white hover:bg-stone-100 text-stone-800 rounded-full shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <Badge variant="secondary" className="mb-2 text-xs bg-stone-100 text-stone-600 capitalize">
                          {cake.category}
                        </Badge>
                        <h3 className="font-serif text-lg font-medium text-stone-800 mb-1">
                          {cake.name}
                        </h3>
                        {cake.serves && (
                          <p className="text-sm text-stone-500 mb-3">Serves {cake.serves}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-serif font-medium text-stone-800">
                            €{cake.price?.toFixed(2)}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => addToCartMutation.mutate(cake)}
                            className="md:hidden w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200"
                          >
                            <Plus className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🎂</span>
              </div>
              <h3 className="text-xl font-serif text-stone-800 mb-2">No cakes found</h3>
              <p className="text-stone-500">Try selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}