import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
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
    input: {
        fontSize: 12,
        marginBottom: 10,
        borderBottom: '1px solid #000',
    },
});

// PDFDocument component to render the PDF content
const PDFDocument = ({ prescriptionData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Prescription Information</Text>
                {prescriptionData.map((dose, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Medication Name:</Text>
                        <Text style={styles.input}>{dose.MedicationName}</Text>
                        <Text style={styles.label}>Dosage:</Text>
                        <Text style={styles.input}>{dose.Dosage}</Text>
                        <Text style={styles.label}>Frequency:</Text>
                        <Text style={styles.input}>{dose.Frequency}</Text>
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.input}>{dose.Duration}</Text>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={styles.input}>{dose.Status}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default PDFDocument;