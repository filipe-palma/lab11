import React from 'react';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <h1>React e Next.js</h1>
      <p>Bem-vindo à minha app em React e Next.js,
      das tecnologias Web mais usadas nos dias de hoje.</p>
      <Image 
        src="/images/mainimage.jpg" 
        alt="Main Image" 
        width={1000} 
        height={600} 
        className="mt-4"
      />
    </div>
  );
}