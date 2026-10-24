import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { api } from '../../../services/api';
import { orderStatusOptions } from './orderStatusOptions';
import { Row } from './row';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [orderStatusActive, setOrderStatusActive] = useState(0);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('/orders');

        if (data) {
          setOrders(data);
        } else {
          throw new Error('Erro ao buscar pedidos.');
        }
      } catch (err) {
        toast.error(err.message);
      }
    }

    loadOrders();
  }, []);

  useEffect(() => {
    function createData(order) {
      return {
        name: order.user.name,
        orderId: order._id,
        date: order.createdAt,
        status: order.status,
        products: order.products,
      };
    }

    const newRows = filteredOrders.map((order) => createData(order));

    setRows(newRows);
  }, [filteredOrders]);

  useEffect(() => {
    if (orderStatusActive === 0) setFilteredOrders(orders);
    else {
      const index = orderStatusOptions.findIndex(
        (item) => item.id === orderStatusActive,
      );

      const newFilteredOrders = orders.filter(
        (ord) => ord.status === orderStatusOptions[index].value,
      );

      setFilteredOrders(newFilteredOrders);
    }
  }, [orderStatusActive, orders]);

  return (
    <div className="p-10 h-dvh flex flex-col">
      <div className="py-3 flex justify-evenly">
        {orderStatusOptions.length > 0 &&
          orderStatusOptions.map((option) => (
            <button
              onClick={() => setOrderStatusActive(option.id)}
              disabled={orderStatusActive === option.id}
              className={twMerge(
                'font-medium text-neutral cursor-pointer hover:opacity-80 active:scale-95 transition-all border-b-2 border-transparent',
                orderStatusActive === option.id &&
                  'text-tertiary border-tertiary hover:opacity-100 active:scale-100 cursor-default',
              )}
              key={option.id}
              type="button"
            >
              {option.label}
            </button>
          ))}
      </div>
      <div className="h-full overflow-clip overflow-y-auto border border-neutral/20 shadow rounded-lg">
        <TableContainer className="min-h-full" component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Pedido</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Data do pedido</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row.orderId}
                  row={row}
                  orders={orders}
                  setOrders={setOrders}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
