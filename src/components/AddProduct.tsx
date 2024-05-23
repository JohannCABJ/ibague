import React, { useState } from 'react';
import { IonInput, IonButton, IonItem } from '@ionic/react';

export const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [products, setProducts] = useState([]);


  const handleAddProduct = () => {
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: productName,
        precio: productPrice,
        cantidad: Number(productQuantity)
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Producto creado con éxito');
        window.location.reload(); // Recarga
        setProductName('');
        setProductPrice('');
        setProductQuantity('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <IonItem>
      <IonInput value={productName} onIonChange={(e) => setProductName(e.detail.value!)} placeholder="Nombre del producto" />
      <IonInput value={productPrice}type="number" onIonChange={(e) => setProductPrice(e.detail.value!)} placeholder="Precio del producto" />
      <IonInput value={productQuantity} type="number" onIonChange={(e) => setProductQuantity(e.detail.value!)} placeholder="Cantidad del producto" />
      <IonButton onClick={handleAddProduct}>Agregar producto</IonButton>
    </IonItem>
  );
};