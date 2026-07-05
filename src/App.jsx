import React, { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [orderMessage, setOrderMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch menu on component mount
  useEffect(() => {
    fetch('http://localhost:8000/menu')
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error('Failed to fetch menu:', err));
  }, []);

  const toggleDrink = (drinkName) => {
    setSelectedDrinks((prev) => {
      if (prev.includes(drinkName)) {
        return prev.filter((d) => d !== drinkName);
      } else {
        return [...prev, drinkName];
      }
    });
  };

  const clearSelection = () => {
    setSelectedDrinks([]);
    setOrderMessage('');
    setOrderId('');
  };

  const placeOrder = async () => {
    if (selectedDrinks.length === 0) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drinks: selectedDrinks }),
      });
      const data = await response.json();
      setOrderId(data.order_id);
      setOrderMessage(`You ordered ${selectedDrinks.length} drinks.`);
    } catch (error) {
      console.error('Order failed:', error);
      setOrderMessage('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Centered Teal Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-teal-600 tracking-tight">Brew &amp; Co</h1>
        <p className="mt-2 text-lg text-gray-500">Welcome to your local neighborhood coffee shop.</p>
      </div>

      {/* Main Card Content */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
          <span className="bg-teal-50 text-teal-700 py-1 px-3 rounded-full text-sm font-medium">
            Selected: {selectedDrinks.length}
          </span>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 mb-8">
          {menu.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Loading menu...</p>
          ) : (
            menu.map((drink) => {
              const isSelected = selectedDrinks.includes(drink.name);
              return (
                <div
                  key={drink.name}
                  onClick={() => toggleDrink(drink.name)}
                  className={`cursor-pointer flex justify-between items-center p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={`font-medium ${isSelected ? 'text-teal-900' : 'text-gray-700'}`}>
                    {drink.name}
                  </span>
                  <span className={`${isSelected ? 'text-teal-700' : 'text-gray-500'}`}>
                    ฿{drink.price}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={clearSelection}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={placeOrder}
            disabled={selectedDrinks.length === 0 || loading}
            className={`flex-[2] py-3 px-4 rounded-xl font-medium text-white shadow-sm transition-colors ${
              selectedDrinks.length === 0 || loading
                ? 'bg-gray-800 opacity-50 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-black'
            }`}
          >
            {loading ? 'Ordering...' : 'Order now'}
          </button>
        </div>

        {/* Order Feedback */}
        {orderMessage && (
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-gray-800 font-medium">{orderMessage}</p>
            {orderId && (
              <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-mono font-semibold">{orderId}</span></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
