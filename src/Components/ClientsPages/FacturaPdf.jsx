import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  table: { width: "100%", borderWidth: 1, marginTop: 10 },
  row: { flexDirection: "row", borderBottomWidth: 1, padding: 5 },
  column: { flex: 1, textAlign: "center" },
  total: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
  image: { width: 50, height: 50, marginRight: 5 }
});

const FacturaPDF = ({ factura ,detailInfo }) => (
    
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Factura #{factura?.encabezado?.id}</Text>
        <Text>Cliente: {factura?.cliente?.nombre}</Text>
        <Text>Dirección: {factura?.cliente?.direccion}</Text>
        <Text>Teléfono: {factura?.cliente?.telefono}</Text>
        <Text>Correo: {factura?.cliente?.correo}</Text>
        <Text>NIT: {factura?.cliente?.nit}</Text>
        <Text>Fecha: {factura?.encabezado?.fecha}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.row, { fontWeight: "bold" }]}> 
          <Text style={styles.column}>Producto</Text>
          <Text style={styles.column}>Cantidad</Text>
          <Text style={styles.column}>Precio</Text>
          <Text style={styles.column}>Subtotal</Text>
        </View>
        {detailInfo?.detalles?.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.column}>{item.producto.nombre}</Text>
            <Text style={styles.column}>{item.detalle.cantidad}</Text>
            <Text style={styles.column}>Q{item.detalle.precio_venta}</Text>
            <Text style={styles.column}>Q{item.detalle.cantidad * item.detalle.precio_venta}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: Q{detailInfo?.total.toLocaleString()}</Text>
    </Page>
  </Document>
);

const FacturaDownload = ({ factura, detailInfo }) => {
  console.log("factura",factura);
  console.log("detailinfo",detailInfo)
  return (
    <PDFDownloadLink document={<FacturaPDF factura={factura} detailInfo={detailInfo} />} fileName="facturaCliente.pdf">
      {({ loading }) => (loading ? "Generando PDF..." : "Descargar Factura")}
    </PDFDownloadLink>
  );
};

export default FacturaDownload;
