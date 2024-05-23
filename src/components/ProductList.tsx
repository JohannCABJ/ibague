// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { IonInput, IonButton, IonItem } from '@ionic/react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.toString());
      });
  }, []);

  const handleDeleteProduct = (id: string) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Update your state here to remove the product from your list
      setProducts(products.filter(product => product._id !== id));
      alert('Producto eliminado con éxito');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Nombre del producto</h2>
        <h2>Valor del producto</h2>
        <h2>Cantidad</h2>
        <h2>Acciones</h2> 
      </div>
      {products.map(product => (
        <div key={product._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{product.nombre}</h2>
          <h2>${product.precio}</h2> {/* Agrega el signo de pesos antes del precio */}
          <h2>{product.cantidad}</h2>
          <IonButton onClick={() => handleDeleteProduct(product._id)}>Eliminar</IonButton> 
        </div>
      ))}
    </div>
  );
};

export default ProductList;