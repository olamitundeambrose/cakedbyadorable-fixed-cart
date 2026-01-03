import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChefHat, Cake, Palette, Star, Plus, Minus, ShoppingCart } from 'lucide-react';

const CakeBuilder = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    size: null,
    flavor: null,
    filling: null,
    frosting: null,
    decoration: null,
    message: '',
    extras: []
  });

  const [basePrice] = useState(120);

  const options = {
    size: [
      { id: 'small', name: '6" Round', serves: '6-8 people', price: 0 },
      { id: 'medium', name: '8" Round', serves: '10-12 people', price: 25 },
      { id: 'large', name: '10" Round', serves: '15-18 people', price: 50 },
      { id: 'sheet', name: '9x13" Sheet', serves: '20-25 people', price: 60 }
    ],
    flavor: [
      { id: 'vanilla', name: 'Classic Vanilla', price: 0 },
      { id: 'chocolate', name: 'Rich Chocolate', price: 0 },
      { id: 'strawberry', name: 'Fresh Strawberry', price: 5 },
      { id: 'lemon', name: 'Zesty Lemon', price: 5 },
      { id: 'red-velvet', name: 'Red Velvet', price: 10 },
      { id: 'carrot', name: 'Spiced Carrot', price: 10 }
    ],
    filling: [
      { id: 'none', name: 'No Filling', price: 0 },
      { id: 'jam', name: 'Strawberry Jam', price: 8 },
      { id: 'cream', name: 'Fresh Cream', price: 10 },
      { id: 'chocolate', name: 'Chocolate Ganache', price: 12 },
      { id: 'caramel', name: 'Salted Caramel', price: 15 }
    ],
    frosting: [
      { id: 'buttercream', name: 'Classic Buttercream', price: 0 },
      { id: 'cream-cheese', name: 'Cream Cheese', price: 8 },
      { id: 'fondant', name: 'Smooth Fondant', price: 20 },
      { id: 'naked', name: 'Naked Style', price: -5 }
    ],
    decoration: [
      { id: 'simple', name: 'Simple Piping', price: 0 },
      { id: 'flowers', name: 'Buttercream Flowers', price: 25 },
      { id: 'character', name: 'Character Design', price: 40 },
      { id: 'theme', name: 'Custom Theme', price: 60 },
      { id: 'luxury', name: 'Luxury Decoration', price: 80 }
    ],
    extras: [
      { id: 'candles', name: 'Number Candles', price: 5 },
      { id: 'sparklers', name: 'Sparkler Candles', price: 8 },
      { id: 'topper', name: 'Custom Cake Topper', price: 15 },
      { id: 'box', name: 'Premium Gift Box', price: 12 },
      { id: 'delivery', name: 'Local Delivery', price: 20 }
    ]
  };

  const calculateTotal = () => {
    let total = basePrice;
    
    Object.keys(selectedOptions).forEach(category => {
      if (category === 'extras') {
        selectedOptions.extras.forEach(extraId => {
          const extra = options.extras.find(e => e.id === extraId);
          if (extra) total += extra.price;
        });
      } else if (selectedOptions[category]) {
        const option = options[category]?.find(opt => opt.id === selectedOptions[category]);
        if (option) total += option.price;
      }
    });
    
    return total;
  };

  const handleOptionSelect = (category, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: optionId
    }));
  };

  const handleExtraToggle = (extraId) => {
    setSelectedOptions(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const isComplete = () => {
    return selectedOptions.size && selectedOptions.flavor && 
           selectedOptions.filling && selectedOptions.frosting && 
           selectedOptions.decoration;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
            <ChefHat className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-black">Custom Cake Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-black mb-6">
            Create Your Perfect Cake
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Design your dream cake with our interactive builder. Choose from premium ingredients 
            and decorations to create something truly special for your celebration.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Cake Builder Options */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Size Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Cake className="w-5 h-5 text-pink-500" />
                  Choose Your Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.size.map((size) => (
                    <div
                      key={size.id}
                      onClick={() => handleOptionSelect('size', size.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.size === size.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-black">{size.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {size.price === 0 ? 'Included' : `+€${size.price}`}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{size.serves}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flavor Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Star className="w-5 h-5 text-pink-500" />
                  Select Your Flavor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.flavor.map((flavor) => (
                    <div
                      key={flavor.id}
                      onClick={() => handleOptionSelect('flavor', flavor.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.flavor === flavor.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{flavor.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {flavor.price === 0 ? 'Included' : `+€${flavor.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filling Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Choose Your Filling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.filling.map((filling) => (
                    <div
                      key={filling.id}
                      onClick={() => handleOptionSelect('filling', filling.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.filling === filling.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{filling.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {filling.price === 0 ? 'Included' : `+€${filling.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Frosting Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Select Your Frosting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.frosting.map((frosting) => (
                    <div
                      key={frosting.id}
                      onClick={() => handleOptionSelect('frosting', frosting.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.frosting === frosting.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{frosting.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {frosting.price === 0 ? 'Included' : 
                           frosting.price < 0 ? `€${frosting.price}` : `+€${frosting.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Decoration Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Palette className="w-5 h-5 text-pink-500" />
                  Choose Your Decoration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.decoration.map((decoration) => (
                    <div
                      key={decoration.id}
                      onClick={() => handleOptionSelect('decoration', decoration.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.decoration === decoration.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{decoration.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {decoration.price === 0 ? 'Included' : `+€${decoration.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extras */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Add Extras (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.extras.map((extra) => (
                    <div
                      key={extra.id}
                      onClick={() => handleExtraToggle(extra.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.extras.includes(extra.id)
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{extra.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-pink-600">
                            +€{extra.price}
                          </Badge>
                          {selectedOptions.extras.includes(extra.id) ? (
                            <Minus className="w-4 h-4 text-pink-500" />
                          ) : (
                            <Plus className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-semibold">€{basePrice}</span>
                  </div>
                  
                  {selectedOptions.size && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.size.find(s => s.id === selectedOptions.size)?.name}
                      </span>
                      <span className="font-semibold">
                        +€{options.size.find(s => s.id === selectedOptions.size)?.price || 0}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.flavor && options.flavor.find(f => f.id === selectedOptions.flavor)?.price > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.flavor.find(f => f.id === selectedOptions.flavor)?.name}
                      </span>
                      <span className="font-semibold">
                        +€{options.flavor.find(f => f.id === selectedOptions.flavor)?.price}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.filling && options.filling.find(f => f.id === selectedOptions.filling)?.price > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.filling.find(f => f.id === selectedOptions.filling)?.name}
                      </span>
                      <span className="font-semibold">
                        +€{options.filling.find(f => f.id === selectedOptions.filling)?.price}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.frosting && options.frosting.find(f => f.id === selectedOptions.frosting)?.price !== 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.frosting.find(f => f.id === selectedOptions.frosting)?.name}
                      </span>
                      <span className="font-semibold">
                        {options.frosting.find(f => f.id === selectedOptions.frosting)?.price > 0 ? '+' : ''}€{options.frosting.find(f => f.id === selectedOptions.frosting)?.price}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.decoration && options.decoration.find(d => d.id === selectedOptions.decoration)?.price > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.decoration.find(d => d.id === selectedOptions.decoration)?.name}
                      </span>
                      <span className="font-semibold">
                        +€{options.decoration.find(d => d.id === selectedOptions.decoration)?.price}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.extras.map(extraId => {
                    const extra = options.extras.find(e => e.id === extraId);
                    return (
                      <div key={extraId} className="flex justify-between">
                        <span className="text-gray-600">{extra?.name}</span>
                        <span className="font-semibold">+€{extra?.price}</span>
                      </div>
                    );
                  })}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-black">Total</span>
                  <span className="text-pink-600">€{calculateTotal()}</span>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button 
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                    disabled={!isComplete()}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  {!isComplete() && (
                    <p className="text-sm text-gray-500 text-center">
                      Please complete all selections to continue
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeBuilder;
