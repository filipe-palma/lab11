import tecnologias from '@/app/data/tecnologias.json';
import Card from '@/components/Card/Card';

const Tecnologias = () => (
  <div className="flex flex-wrap justify-center">
    {tecnologias.map((tecnologia, index) => (
      <Card
        key={index}
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />
    ))}
  </div>
);

export default Tecnologias;
