import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { DeleteProductButton } from '../../components/DeleteProductButton';
import { api } from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';

export const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function handleDeleteProduct(productId) {
    try {
      const { status } = await api.delete(`/products/${productId}`, {
        validateStatus: () => true,
      });

      if (status === 200) {
        const newProducts = products.filter((prd) => prd.id !== productId);
        setProducts(newProducts);
        toast.success('Produto excluído com sucesso');
      } else throw new Error();
    } catch (err) {
      console.log(err);
      toast.error('Erro ao deletar produto, por favor tente novamente');
    }
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        const { status, data } = await api.get('/products', {
          validateStatus: () => true,
        });

        if (status === 200) {
          setProducts(data);
        } else throw new Error();
      } catch (_err) {
        toast.error('Algo deu errado ao listar os produtos');
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="p-10 h-dvh flex flex-col">
      <div className="h-full overflow-clip overflow-y-auto border border-neutral/20 shadow rounded-lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Imagem</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 &&
                products.map((prd) => (
                  <TableRow
                    key={prd.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prd.id}
                    </TableCell>
                    <TableCell>{prd.name}</TableCell>
                    <TableCell>{formatCurrency(prd.price)}</TableCell>
                    <TableCell>{prd.category.name}</TableCell>
                    <TableCell>
                      <img className="w-14" src={prd.url} alt={prd.name} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            navigate('/admin/editar-produto', { state: prd })
                          }
                          type="button"
                          className="p-2 rounded-full hover:bg-dark/20 cursor-pointer active:scale-95 transition-all"
                        >
                          <SquarePen color="#0F172A" size={18} />
                        </button>

                        <DeleteProductButton
                          onConfirm={() => handleDeleteProduct(prd.id)}
                          productName={prd.name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
