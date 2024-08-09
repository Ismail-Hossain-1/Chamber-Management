import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    table: {
        width: '100%',
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableHeaderCell: {
        textAlign: 'center',
        padding: 8,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        textAlign: 'center',
        padding: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        flex: 1,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
    },
});

// PDFDocument component to render the PDF content
const PDFDocument = ({ prescriptionData, instructions, prescriptionNotes }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Prescription Information Table */}
            <View style={styles.section}>
                <Text style={styles.title}>Prescription Table:</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>Prescription ID</Text>
                        <Text style={styles.tableHeaderCell}>Patient ID</Text>
                        <Text style={styles.tableHeaderCell}>Doctor ID</Text>
                        <Text style={styles.tableHeaderCell}>Date Issued</Text>
                    </View>
                    {/* {prescriptionData.map((dose, index) => ( */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}> 1</Text>
                            <Text style={styles.tableCell}>123</Text> {/* Replace with actual patient ID */}
                            <Text style={styles.tableCell}>456</Text> {/* Replace with actual doctor ID */}
                            <Text style={styles.tableCell}>2024-07-02</Text> {/* Replace with actual date issued */}
                        </View>
                    {/* // ))} */}
                </View>
            </View>

            {/* Medication Information Table */}
            <View style={styles.section}>
                <Text style={styles.title}>Medication Information:</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>Medication Name</Text>
                        <Text style={styles.tableHeaderCell}>Dosage</Text>
                        <Text style={styles.tableHeaderCell}>Frequency</Text>
                        <Text style={styles.tableHeaderCell}>Duration</Text>
                        <Text style={styles.tableHeaderCell}>Status</Text>
                    </View>
                    {prescriptionData.map((dose, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{dose.MedicationName}</Text>
                            <Text style={styles.tableCell}>{dose.Dosage}</Text>
                            <Text style={styles.tableCell}>{dose.Frequency}</Text>
                            <Text style={styles.tableCell}>{dose.Duration}</Text>
                            <Text style={styles.tableCell}>{dose.Status}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Instructions Section */}
            <View style={styles.section}>
                <Text style={styles.title}>Instructions:</Text>
                <View style={styles.text}>
                    <Text>{instructions}</Text>
                </View>
            </View>

            {/* Prescription Notes Section */}
            <View style={styles.section}>
                <Text style={styles.title}>Prescription Notes:</Text>
                <View style={styles.text}>
                    <Text>{prescriptionNotes}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFDocument;
