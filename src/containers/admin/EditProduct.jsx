import { useLocation } from 'react-router';

export const EditProduct = () => {
  const location = useLocation();

  console.log(location);
  return (
    <div>
      <h1>Editar produto</h1>
    </div>
  );
};
