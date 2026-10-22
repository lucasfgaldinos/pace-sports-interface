import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { useId, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { orderStatusOptions } from './orderStatusOptions';

export const Row = ({ row, orders, setOrders }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const detailsId = useId();

  async function handleChangeSelect(orderId, newOrderStatus) {
    try {
      setIsLoading(true);
      const { status } = await api.patch(
        `/orders/${orderId}`,
        { status: newOrderStatus },
        { validateStatus: () => true },
      );

      if (status === 200) {
        toast.success('Status do pedido atualizado');
        const newOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newOrderStatus } : order,
        );
        console.log(newOrders);
        setOrders(newOrders);
      } else {
        throw new Error('Algo deu errado ao atualizar status do pedido');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label={open ? 'collapse row' : 'expand row'}
            aria-expanded={open}
            aria-controls={detailsId}
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>
        <TableCell>
          <Select
            isLoading={isLoading}
            className="w-62"
            placeholder="Status"
            defaultValue={orderStatusOptions.find(
              (item) => item.value === row.status,
            )}
            options={orderStatusOptions.filter((option) => option.id !== 0)}
            onChange={(status) => handleChangeSelect(row.orderId, status.value)}
          />
        </TableCell>
      </TableRow>
      <TableRow id={detailsId} aria-hidden={!open ? true : undefined}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Produtos
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Imagem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <img
                          className="max-w-16"
                          src={product.url}
                          alt={`Imagem do ${product.name}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
