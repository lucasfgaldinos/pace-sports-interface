import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';

export const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get('categoria');

    if (categoryId) return categoryId;

    return 0;
  });

  useEffect(() => {
    async function getProductsAndCategories() {
      try {
        const token = localStorage.getItem('token');

        const allProducts = await api.get('/products', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(allProducts.data);

        const allCategories = await api.get('/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories([{ id: 0, name: 'Todos' }, ...allCategories.data]);
      } catch (_err) {
        toast.error('Erro ao listar produtos e/ou categorias!');
      }
    }

    getProductsAndCategories();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter(
        (product) => product.category_id === activeCategory,
      );

      setFilteredProducts(newFilteredProducts);
    }
  }, [products, activeCategory]);

  return (
    <div>
      <div className="w-full max-w-5xl mx-auto px-10 pt-30 ">
        <span className="text-neutral flex items-center gap-2 text-sm">
          Home
          <ChevronRight className="ml-3" color="#6B7280" size={14} />
          <b className="text-dark">Produtos</b>
        </span>
        <h1 className="text-dark font-extrabold text-5xl mt-6">
          Todos os produtos
        </h1>
        <hr className="text-neutral/20 my-7" />
      </div>

      <div className="flex flex-col w-full max-w-5xl mx-auto px-10 pb-20 overflow-hidden">
        <nav className="flex items-center gap-4 overflow-auto mb-7 pb-2">
          {categories.length > 0 &&
            categories.map((category) => (
              <button
                onClick={() => {
                  setActiveCategory(category.id);
                  navigate(`/produtos/?categoria=${category.id}`);
                }}
                className={twMerge(
                  'bg-pace-white rounded-full border border-tertiary hover:bg-tertiary/10 px-4 py-1 text-nowrap cursor-pointer transition-colors',
                  activeCategory === category.id &&
                    'bg-tertiary hover:bg-tertiary text-pace-white',
                )}
                key={category.id}
                type="button"
              >
                {category.name}
              </button>
            ))}
        </nav>

        <section className="grid grid-cols-4 gap-6">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product}>
                {product.name}
              </ProductCard>
            ))}
        </section>
      </div>
    </div>
  );
};
