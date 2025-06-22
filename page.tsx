'use client';

import { useState } from 'react';

export default function Home() {
  const pizzas = [
    { name: "Margherita", image: "https://tse3.mm.bing.net/th?id=OIP.ftzj2fjwEbsX0ukjcVz-ywHaDV&pid=Api&P=0&h=180", description: "Classic delight with 100% mozzarella cheese." },
    { name: "Farmhouse", image: "https://tse4.mm.bing.net/th?id=OIP.aeAQpNNRf6D4yDtAyAYTqwHaE8&pid=Api&P=0&h=180", description: "Onion, capsicum, tomato & mushroom in one pizza." },
    { name: "Pepper Barbecue Chicken", image: "https://tse1.mm.bing.net/th?id=OIP.763HA2IPIE-kzSAeldYYPwHaHa&pid=Api&P=0&h=180", description: "Pepper barbecue chicken with extra cheese." },
    { name: "Paneer Makhani", image: "https://tse3.mm.bing.net/th?id=OIP.lYoeGBF_Lbgpoyo_tzv_FQHaFc&pid=Api&P=0&h=180", description: "Soft paneer cubes in rich makhani sauce." },
    { name: "Mexican Green Wave", image: "https://tse4.mm.bing.net/th?id=OIP.XREz8rP6k8-K6IJ3ePDnsgHaE6&pid=Api&P=0&h=180", description: "Jalapeno, capsicum, onion & exotic spices." },
    { name: "Chicken Dominator", image: "https://tse1.mm.bing.net/th?id=OIP.77LhDSmAusg5rGrReQbpJQHaEK&pid=Api&P=0&h=180", description: "Loaded with grilled chicken and peri-peri." },
    { name: "Veg Extravaganza", image: "https://tse1.mm.bing.net/th?id=OIP.vlQBi_JenPGfK7FOVQl_ZwHaDV&pid=Api&P=0&h=180", description: "A burst of veggies with olives & sweet corn." },
    { name: "Cheese Burst", image: "https://tse3.mm.bing.net/th?id=OIP.95osilUQ1qY0TiNToH8jiwHaE8&pid=Api&P=0&h=180", description: "Pizza oozing with molten cheese in every bite." },
    { name: "Peppy Paneer", image: "https://tse2.mm.bing.net/th?id=OIP.AWUgEz8UDeMUNBTl34CAawHaHV&pid=Api&P=0&h=180", description: "Chunky paneer cubes with crispy capsicum." },
    { name: "Indi Tandoori Paneer", image: "https://tse1.mm.bing.net/th?id=OIP._r_ednvTVD5rjZCU8lMWZQHaC3&pid=Api&P=0&h=180", description: "Tandoori paneer with mint mayo drizzle." },
    { name: "Deluxe Veggie", image: "https://tse4.mm.bing.net/th?id=OIP.atF7B2-3tHOcja2zVAJ4nQHaE8&pid=Api&P=0&h=180", description: "Loaded with onion, capsicum, corn & mushroom." },
    { name: "Non-Veg Supreme", image: "https://tse2.mm.bing.net/th?id=OIP.reLA6hCDdYhADScnuVho7AHaDm&pid=Api&P=0&h=180", description: "Chicken tikka, meatballs, and more in one pizza." }
  ];

  const spiceLevels = ["🌶️ Mild", "🌶️🌶️ Medium", "🌶️🌶️🌶️ Hot"];
  const [spiceIndexes, setSpiceIndexes] = useState<number[]>(Array(pizzas.length).fill(0));
  const [cartQuantities, setCartQuantities] = useState<number[]>(Array(pizzas.length).fill(0));
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSpiceClick = (index: number) => {
    const newSpices = [...spiceIndexes];
    newSpices[index] = (newSpices[index] + 1) % spiceLevels.length;
    setSpiceIndexes(newSpices);
  };

  const handleAddToCart = (index: number) => {
    const newQuantities = [...cartQuantities];
    newQuantities[index] += 1;
    setCartQuantities(newQuantities);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim() && location.trim()) {
      setIsLoggedIn(true);
      alert("✅ Login successful! Start ordering.");
    } else {
      alert("❌ Please fill in both Phone Number and Location.");
    }
  };

  const totalItems = cartQuantities.reduce((acc, val) => acc + val, 0);
  const pizzaPrice = 200;
  const subtotal = totalItems * pizzaPrice;
  const discount = totalItems >= 3 ? subtotal * 0.1 : 0;
  const totalAfterDiscount = subtotal - discount;
  const freeSauce = totalItems >= 2;
  const freeDrink = totalItems >= 4;

  return (
    <>
      <nav className="bg-[#006491] text-white p-4 text-center font-semibold text-lg flex items-center justify-center gap-2">
        <img src="https://tse3.mm.bing.net/th?id=OIP.JsX8SJ2v3S_4vrwW8D47IgHaJI&pid=Api&P=0&h=180" alt="Dominos Logo" className="h-10 rounded" />

        Welcome to 🍕 DominosAI - Taste Meets Tech!
      </nav>

      <section className="bg-[#f2f2f2] py-8 text-center">
        <h1 className="text-5xl font-extrabold text-[#e31837] mb-2">DominosAI 🍕</h1>
        <p className="text-gray-700 text-lg">Order your AI-picked Domino's pizza favorites!</p>
      </section>

      {!isLoggedIn && (
        <section className="bg-white border border-gray-200 py-6 px-6 sm:px-12 max-w-xl mx-auto shadow-lg rounded-lg my-6">
          <h2 className="text-xl font-bold text-[#e31837] mb-4">🔐 Login to Order</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="tel" placeholder="📞 Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-2 rounded text-black" />
            <input type="text" placeholder="📍 Your Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border p-2 rounded text-black" />
            <button type="submit" className="w-full bg-[#e31837] text-white py-2 rounded hover:bg-[#c7162f]">
              Login & Continue 🍕
            </button>
          </form>
        </section>
      )}

      <main className="p-8 bg-[#f2f2f2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <img src={pizza.image} alt={pizza.name} className="rounded-lg w-full h-40 object-cover mb-4" />
            <h2 className="text-2xl font-bold text-[#006491]">{pizza.name}</h2>
            <span onClick={() => handleSpiceClick(index)} className="cursor-pointer inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mt-1 mb-2 hover:bg-blue-200" title="Click to change spice level">
              {spiceLevels[spiceIndexes[index]]}
            </span>
            <p className="text-gray-600">{pizza.description}</p>
            <button onClick={() => handleAddToCart(index)} className="mt-4 bg-[#e31837] hover:bg-[#c7162f] text-white px-4 py-2 rounded-full w-full" disabled={!isLoggedIn}>
              Add to Cart 🛒
            </button>
            <p className="text-center text-sm text-gray-800 mt-2">Quantity in Cart: <b>{cartQuantities[index]}</b></p>
          </div>
        ))}
      </main>

      {isLoggedIn && totalItems > 0 && (
        <div className="fixed bottom-24 right-6 bg-white p-4 shadow-lg rounded-xl border border-gray-200 max-w-xs w-full">
          <h3 className="font-bold text-lg mb-2 text-[#e31837]">🧾 Order Summary</h3>
          <p className="text-black font-semibold">Total Items: {totalItems}</p>
          <p className="text-black font-semibold">Subtotal: ₹{subtotal}</p>
          {discount > 0 && <p className="text-green-600 font-semibold">Discount: -₹{discount}</p>}
          <p className="text-black font-bold">Total: ₹{totalAfterDiscount}</p>
          {freeSauce && <p className="text-sm text-blue-600 font-semibold">🎁 Free Sauce Pack included!</p>}
          {freeDrink && <p className="text-sm text-blue-600 font-semibold">🥤 Free Cooldrink included!</p>}
        </div>
      )}

      <button
        disabled={!isLoggedIn || totalItems === 0}
        className={`fixed bottom-6 right-6 px-6 py-3 rounded-full text-white shadow-lg text-sm sm:text-base ${isLoggedIn && totalItems > 0 ? 'bg-[#e31837] hover:bg-[#c7162f]' : 'bg-gray-400 cursor-not-allowed'}`}
        onClick={() => alert(`🎉 Order placed for ${totalItems} pizza(s) from ${location}!

You got:
${freeSauce ? '🎁 Free Sauce Pack\n' : ''}${freeDrink ? '🥤 Free Cooldrink\n' : ''}Total Paid: ₹${totalAfterDiscount}`)}
      >
        🍕 Order Pizza Now
      </button>

      <footer className="bg-[#006491] text-white text-center p-4 mt-6">
        &copy; {new Date().getFullYear()} <span className="font-bold">DominosAI</span> — Taste Curated by Code.
      </footer>
    </>
  );
}
