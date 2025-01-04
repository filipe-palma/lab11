'use client';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Product } from '@/app/models/interfaces';
import Card from '@/components/Card/Card';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Produtos = () => {
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);
  const [cart, setCart] = useState<Product[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [reference, setReference] = useState<string | null>(null);
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setTotal(cart.reduce((acc, product) => acc + product.price, 0));
  }, [cart]);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [search, data]);

  const addItemToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeItemFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== product.id));
  };

  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: isStudent,
        coupon: coupon
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json(); 
    }).then((response) => {
      setCart([]);
      setCoupon("");
      setIsStudent(false);
      setReference(response.reference);
      setDiscountedTotal(parseFloat(response.totalCost));
    }).catch(() => {
      console.log("error ao comprar")
    })
  }

  if (error) return <div>Erro ao carregar dados</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col items-center">
      <input 
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex flex-wrap justify-center">
        {filteredData.map((produto) => (
          <Card
            key={produto.id}
            title={produto.title}
            image={produto.image}
            description={produto.description}
            rating={produto.rating.rate}
            price={produto.price}
            addItemToCart={addItemToCart}
            product={produto}
          />
        ))}
      </div>
      <div className="cart-container">
        <h2 className="text-2xl font-bold mt-8">Carrinho</h2>
        <div className="flex flex-wrap justify-center">
          {cart.map((produto, index) => (
            <Card
              key={index}
              title={produto.title}
              image={produto.image}
              description={produto.description}
              rating={produto.rating?.rate}
              price={produto.price}
              removeItemFromCart={removeItemFromCart}
              product={produto}
            />
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xl font-bold">Total: {total.toFixed(2)}€</p>
          <label className="block mt-2">
            <input 
              type="checkbox" 
              checked={isStudent} 
              onChange={(e) => setIsStudent(e.target.checked)} 
            />
            Sou estudante
          </label>
          <label className="block mt-2">
            Cupão de desconto:
            <input 
              type="text" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)} 
              className="ml-2 p-1 border rounded"
            />
          </label>
          <button onClick={buy} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
            Comprar
          </button>
        </div>
        {reference && discountedTotal !== null && (
          <div className="mt-4">
            <p className="text-xl font-bold">Referência: {reference}</p>
            <p className="text-xl font-bold">Total com desconto: {typeof discountedTotal === 'number' ? discountedTotal.toFixed(2) : '0.00'}€</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produtos;