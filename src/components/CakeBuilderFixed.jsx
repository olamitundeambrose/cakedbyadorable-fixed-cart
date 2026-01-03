import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ChefHat, Cake, Palette, Star, Plus, Minus, ShoppingCart } from 'lucide-react';

const CakeBuilderFixed = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    size: null,
    cakeType: null,
    finishColor: null,
    flavor: null,
    filling: null,
    designAccessories: [],
    description: '',
    cupcakes: 'none',
    deliveryOption: null
  });

  const basePrice = 160;

  const options = {
    size: [
      { id: '6inch', name: '6" Round', serves: '6-8 people', price: 0 },
      { id: '8inch', name: '8" Round', serves: '10-12 people', price: 25 },
      { id: '10inch', name: '10" Round', serves: '15-18 people', price: 50 }
    ],
    cakeType: [
      { id: 'round', name: 'Round Cake', price: 0 },
      { id: 'square', name: 'Square Cake', price: 5 },
      { id: 'heart', name: 'Heart Shaped', price: 15 },
      { id: 'number', name: 'Number Cake', price: 20 }
    ],
    finishColor: [
      { id: 'white', name: 'Classic White', price: 0 },
      { id: 'pink', name: 'Pink', price: 0 },
      { id: 'blue', name: 'Blue', price: 0 },
      { id: 'gold', name: 'Gold Metallic', price: 10 },
      { id: 'silver', name: 'Silver Metallic', price: 10 }
    ],
    flavor: [
      { id: 'vanilla', name: 'Classic Vanilla', price: 0 },
      { id: 'chocolate', name: 'Rich Chocolate', price: 0 },
      { id: 'strawberry', name: 'Fresh Strawberry', price: 5 },
      { id: 'red-velvet', name: 'Red Velvet', price: 10 }
    ],
    filling: [
      { id: 'none', name: 'No Filling', price: 0 },
      { id: 'jam', name: 'Strawberry Jam', price: 8 },
      { id: 'cream', name: 'Fresh Cream', price: 10 },
      { id: 'chocolate', name: 'Chocolate Ganache', price: 12 }
    ],
    designAccessories: [
      { id: 'theme', name: 'Add a Theme (e.g SpiderMan, Frozen, Liverpool, etc)', price: 20 },
      { id: 'fans-balls', name: 'Decorative Fans & Balls', price: 10 },
      { id: 'balls', name: 'Decorative Balls', price: 5 },
      { id: 'topper', name: 'Personalised Topper/Name-Age Tags', price: 10 },
      { id: 'flowers', name: 'Flower/Floral Toppers', price: 5 }
    ],
    cupcakes: [
      { id: 'none', name: 'None', price: 0 },
      { id: '12', name: '12 Matching Cupcakes', price: 55 },
      { id: '24', name: '24 Matching Cupcakes', price: 105 }
    ],
    deliveryOption: [
      { id: 'pickup', name: 'Pick Up', price: 0 },
      { id: 'delivery', name: 'Delivery (Dublin City Only)', price: 28 }
    ]
  };

  const calculateTotal = () => {
    let total = basePrice;
    
    // Add selected option prices
    ['size', 'cakeType', 'finishColor', 'flavor', 'filling', 'cupcakes', 'deliveryOption'].forEach(category => {
      if (selectedOptions[category] && options[category]) {
        const option = options[category].find(opt => opt.id === selectedOptions[category]);
        if (option) total += option.price;
      }
    });
    
    // Add design accessories
    selectedOptions.designAccessories.forEach(accessoryId => {
      const accessory = options.designAccessories.find(a => a.id === accessoryId);
      if (accessory) total += accessory.price;
    });
    
    return total;
  };

  const handleOptionSelect = (category, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: optionId
    }));
  };

  const handleAccessoryToggle = (accessoryId) => {
    setSelectedOptions(prev => ({
      ...prev,
      designAccessories: prev.designAccessories.includes(accessoryId)
        ? prev.designAccessories.filter(id => id !== accessoryId)
        : [...prev.designAccessories, accessoryId]
    }));
  };

  const isComplete = () => {
    return selectedOptions.size && selectedOptions.cakeType && 
           selectedOptions.flavor && selectedOptions.filling && 
           selectedOptions.deliveryOption;
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
            Create Your Kid's Cake
          </h2>
          <div className="text-2xl font-bold text-pink-600 mb-4">
            Regular price €{basePrice}.00 EUR
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Design your little one's dream cake! Explore endless possibilities—choose flavors, themes, 
            colors, and personalize with custom details. From superheroes to unicorns, make their 
            celebration truly magical.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Cake Builder Options */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Size Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Select Your Size</CardTitle>
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

            {/* Cake Type */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Cake Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.cakeType.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleOptionSelect('cakeType', type.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.cakeType === type.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{type.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {type.price === 0 ? 'Included' : `+€${type.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Finish Color */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Finish Color</CardTitle>
                <p className="text-sm text-gray-600">Select the metallic finish you want.</p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.finishColor.map((color) => (
                    <div
                      key={color.id}
                      onClick={() => handleOptionSelect('finishColor', color.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.finishColor === color.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{color.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {color.price === 0 ? 'Included' : `+€${color.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flavor Selection */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Select Your Flavor</CardTitle>
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
                <CardTitle className="text-black">Select Your Filling</CardTitle>
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

            {/* Design Accessories */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Design Accessories</CardTitle>
                <p className="text-sm text-gray-600">Select the accessories for your cake</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {options.designAccessories.map((accessory) => (
                    <div
                      key={accessory.id}
                      onClick={() => handleAccessoryToggle(accessory.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.designAccessories.includes(accessory.id)
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-black">{accessory.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-pink-600">
                            +€{accessory.price}
                          </Badge>
                          {selectedOptions.designAccessories.includes(accessory.id) ? (
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

            {/* Description */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Description</CardTitle>
                <p className="text-sm text-gray-600">
                  Describe your dream cake and the theme, add special message, name, age, color and whatever you think we should know 😊
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Tell us about your dream cake..."
                  value={selectedOptions.description}
                  onChange={(e) => setSelectedOptions(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Matching Cupcakes */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Add Matching Cupcakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  {options.cupcakes.map((cupcake) => (
                    <div
                      key={cupcake.id}
                      onClick={() => handleOptionSelect('cupcakes', cupcake.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.cupcakes === cupcake.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-black mb-2">{cupcake.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {cupcake.price === 0 ? 'Included' : `+€${cupcake.price}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-black">Delivery Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.deliveryOption.map((delivery) => (
                    <div
                      key={delivery.id}
                      onClick={() => handleOptionSelect('deliveryOption', delivery.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOptions.deliveryOption === delivery.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-black mb-2">{delivery.name}</h4>
                        <Badge variant="outline" className="text-pink-600">
                          {delivery.price === 0 ? 'Free' : `+€${delivery.price}`}
                        </Badge>
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
                  
                  {selectedOptions.designAccessories.map(accessoryId => {
                    const accessory = options.designAccessories.find(a => a.id === accessoryId);
                    return accessory ? (
                      <div key={accessoryId} className="flex justify-between">
                        <span className="text-gray-600 text-sm">{accessory.name}</span>
                        <span className="font-semibold">+€{accessory.price}</span>
                      </div>
                    ) : null;
                  })}
                  
                  {selectedOptions.cupcakes && selectedOptions.cupcakes !== 'none' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.cupcakes.find(c => c.id === selectedOptions.cupcakes)?.name}
                      </span>
                      <span className="font-semibold">
                        +€{options.cupcakes.find(c => c.id === selectedOptions.cupcakes)?.price || 0}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.deliveryOption && selectedOptions.deliveryOption !== 'pickup' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {options.deliveryOption.find(d => d.id === selectedOptions.deliveryOption)?.name}
                      </span>
                      <span className="font-semibold">
                        +€{options.deliveryOption.find(d => d.id === selectedOptions.deliveryOption)?.price || 0}
                      </span>
                    </div>
                  )}
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
                      Please complete all required selections
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

export default CakeBuilderFixed;
