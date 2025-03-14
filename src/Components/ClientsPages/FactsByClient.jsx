import React, { useState, use} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, CircularProgress } from '@mui/material';
import useFetchData from "../../hooks/useSWR";
import {getHeaderFact, gertDetailsFact} from '../../services/ventas-enc-service'
import { ClientContext } from '../../providers/context-auth';
import { useNavigate } from 'react-router-dom';

const FactsByClient = () => {
    const {setInfoEnca, setInfoDetail, userClientInfo} = use(ClientContext);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const { data, isloading } = useFetchData(userClientInfo.id_cliente != undefined ? `/ventasEnc/encsByClient/${userClientInfo.id_cliente}` : `/ventasEnc/encsByClient/0`);

    if(userClientInfo === undefined){
        return (
            <div className="flex justify-center items-center h-full">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Por favor, inicie sesión para ver su historial de compras.</h2>
                <Button variant="contained" color="primary" onClick={() => navigate('/loginClient')}>
                Iniciar Sesión
                </Button>
            </div>
            </div>
        );
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleVerDetalles = async(id) => {
         const encabezado = await getHeaderFact(id)
         setInfoEnca(encabezado)
         const detalle = await gertDetailsFact(id);
         setInfoDetail(detalle)
         navigate("/detailFact");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Ventas</h1>
            {isloading ? (
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((venta) => (
                                    <TableRow key={venta.id}>
                                        <TableCell>{venta.id}</TableCell>
                                        <TableCell>{venta.Fecha}</TableCell>
                                        <TableCell>{venta.idCliente}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleVerDetalles(venta.id)}>
                                                Ver Detalles
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No hay datos disponibles
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {data && data.length > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </TableContainer>
            )}
        </div>
    );
};

export default FactsByClient;