import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import { Row } from './row';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [rows, setRows] = useState([]);

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

    const newRows = orders.map((order) => createData(order));

    setRows(newRows);
  }, [orders]);

  return (
    <div className="p-10 h-dvh">
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
