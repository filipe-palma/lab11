import Image from 'next/image';

interface CardProps {
  title: string;
  image: string;
  description: string;
  rating?: number;
}

const Card = ({ title, image, description, rating }: CardProps) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs m-4">
    <Image src={image} alt={title} width={400} height={300} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      {rating && (
        <p className="mt-2 font-bold">
          Avaliação: {rating} <span className="text-yellow-500">⭐</span>
        </p>
      )}
    </div>
  </div>
);

export default Card;