import { ArrowUpRight, Headset, Shield, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import homeBanner from '../../assets/centro-esportivo-desktop-1536.webp';
import { Button } from '../../components/button';
import { api } from '../../services/api';

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const token = localStorage.getItem('token');

      try {
        const { data } = await api.get('/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    loadCategories();
  }, []);

  return (
    <main>
      <div
        className="min-h-[70vh] bg-top bg-cover bg-no-repeat flex relative"
        style={{ backgroundImage: `url('${homeBanner}')` }}
      >
        <div className="absolute inset-0 bg-dark/60"></div>
        <div className="p-10 w-full max-w-5xl mx-auto flex flex-col gap-6 justify-end z-10">
          <h1 className="text-pace-white font-extrabold text-5xl max-w-100">
            Domine seu ritmo na Pace Sports
          </h1>
          <p className="text-pace-white font-medium max-w-lg">
            Performance e estilo para cada movimento. Equipamentos de alta
            tecnologia projetados para impulsionar seus limites.
          </p>
          <div className="w-40">
            <Button onClick={() => navigate('/produtos')}>Ver produtos</Button>
          </div>
        </div>
      </div>

      <div className="shadow-sm">
        <div className="flex items-center w-full max-w-5xl justify-between mx-auto px-4 py-2">
          <p className="flex items-center text-secondary gap-2">
            <Truck /> Frete grátis em compras acima de R$ 199
          </p>
          <p className="flex items-center text-secondary gap-2">
            <Shield /> Compra 100% segura
          </p>
          <p className="flex items-center text-secondary gap-2">
            <Headset /> Suporte especializado 24/7
          </p>
        </div>
      </div>

      <div className="my-20 w-full max-w-5xl mx-auto">
        <h2 className="text-dark text-4xl font-bold mb-10">
          Explore categorias
        </h2>

        <div className="grid grid-cols-3 gap-6 auto-rows-50">
          {categories.length > 0 &&
            categories.map((category) => (
              <div
                key={category.id}
                style={{ backgroundImage: `url('${category.url}')` }}
                className="relative bg-cover bg-no-repeat bg-center rounded-2xl cursor-pointer"
              >
                <div className="bg-dark/50 absolute inset-0 rounded-2xl" />

                <p className="text-pace-white font-bold text-2xl absolute p-3">
                  {category.name}
                </p>
                <div className="absolute bottom-3 right-3 bg-pace-white/20 rounded-xl py-2 px-1">
                  <ArrowUpRight />
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};
