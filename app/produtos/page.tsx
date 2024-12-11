'use client';
import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import Card from '@/components/Card/Card';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Produtos = () => {
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  if (error) return <div>Erro ao carregar dados</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((produto) => (
        <Card
          key={produto.id}
          title={produto.title}
          image={produto.image}
          description={produto.description}
          rating={produto.rating.rate}
        />
      ))}
    </div>
  );
};

export default Produtos;
