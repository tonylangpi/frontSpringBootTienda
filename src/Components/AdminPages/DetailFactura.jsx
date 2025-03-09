import React, { useContext } from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { ClientContext } from "../../providers/context-auth";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    section: { marginBottom: 10 },
    header: { fontSize: 18, marginBottom: 10, textAlign: "center" },
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, marginBottom: 10 },
    row: { flexDirection: "row" },
    cell: { borderWidth: 1, padding: 5, flexGrow: 1 },
    bold: { fontWeight: "bold" },
});

const FacturaPDF = ({ factura, detailInfo }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Factura #{factura.encabezado.id}</Text>
                <Text>Fecha: {factura.encabezado.fecha}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.bold}>Cliente:</Text>
                <Text>{factura.cliente.nombre}</Text>
                <Text>{factura.cliente.direccion}</Text>
                <Text>Tel: {factura.cliente.telefono}</Text>
                <Text>Correo: {factura.cliente.correo}</Text>
                <Text>NIT: {factura.cliente.nit}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.bold}>Detalles de la compra:</Text>
                <View style={styles.table}>
                    <View style={[styles.row, styles.bold]}>
                        <Text style={styles.cell}>Producto</Text>
                        <Text style={styles.cell}>Cantidad</Text>
                        <Text style={styles.cell}>Precio</Text>
                        <Text style={styles.cell}>Subtotal</Text>
                    </View>
                    {detailInfo.detalles.map((item, index) => (
                        <View style={styles.row} key={index}>
                            <Text style={styles.cell}>{item.producto.nombre}</Text>
                            <Text style={styles.cell}>{item.detalle.cantidad}</Text>
                            <Text style={styles.cell}>Q{item.detalle.precio_venta}</Text>
                            <Text style={styles.cell}>Q{item.detalle.cantidad * item.detalle.precio_venta}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.bold}>Total: Q{detailInfo.total}</Text>
            </View>
        </Page>
    </Document>
);

const FacturaViewer = () => {
    const { infoEnca, infoDetail } = useContext(ClientContext);

    return (
        <PDFViewer width="100%" height="600px">
            <FacturaPDF factura={infoEnca} detailInfo={infoDetail} />
        </PDFViewer>
    );
};

export default FacturaViewer;
