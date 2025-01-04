import Image from 'next/image';
import { Product } from '@/app/models/interfaces';

interface CardProps {
  title: string;
  image: string;
  description: string;
  rating?: number;
  ratingCount?: number;
  price?: number;
  addItemToCart?: (product: Product) => void;
  removeItemFromCart?: (product: Product) => void;
  product?: Product;
}

const Card = ({ title, image, description, rating, ratingCount, price, addItemToCart, removeItemFromCart, product }: CardProps) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs m-4 flex flex-col items-center">
    <Image src={image} alt={title} width={400} height={300} className="w-full h-48 object-contain" />
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
      <p className="text-gray-600">{description}</p>
      {price !== undefined && (
        <p className="text-gray-800 font-bold">Preço: {price.toFixed(2)}€</p>
      )}
      {rating && (
        <p className="mt-2 font-bold">
          Avaliação: {rating} <span className="text-yellow-500">⭐</span> {ratingCount && `(${ratingCount} avaliações)`}
        </p>
      )}
      {addItemToCart && product && (
        <button onClick={() => addItemToCart(product)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar ao Carrinho
        </button>
      )}
      {removeItemFromCart && product && (
        <button onClick={() => removeItemFromCart(product)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
          Remover
        </button>
      )}
    </div>
  </div>
);

export default Card;