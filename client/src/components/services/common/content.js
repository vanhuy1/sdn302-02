import React, { useState } from 'react';
import ServiceItem from './serviceItem';

const Content = () => {
    const [activeTab, setActiveTab] = useState('choose'); // 'choose' or 'chosen'

    const services = Array.from({ length: 20 }, (_, index) => ({
        imageUrl: `https://via.placeholder.com/150?text=Item+${index + 1}`,
        mainText: `Service ${index + 1}`,
        secondaryText: `Description for Service ${index + 1}`,
    }));

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                {/* Tabs for Choose Services / Chosen List */}
                <div style={styles.tabs}>
                    <div 
                        style={{ 
                            ...styles.tab, 
                            backgroundColor: activeTab === 'choose' ? 'lightgray' : 'transparent' 
                        }} 
                        onClick={() => setActiveTab('choose')}
                    >
                        Choose Services
                    </div>
                    <div 
                        style={{ 
                            ...styles.tab, 
                            backgroundColor: activeTab === 'chosen' ? 'lightgray' : 'transparent' 
                        }} 
                        onClick={() => setActiveTab('chosen')}
                    >
                        Chosen List
                    </div>
                </div>

                {/* Content based on active tab */}
                <div style={styles.row}>
                    <div style={styles.column}>
                        <div style={styles.option}>Foods</div>
                        <div style={styles.option}>Drinks</div>
                        <div style={styles.option}>Vehicle</div>
                        <div style={styles.option}>Entertain</div>
                    </div>
                    <div style={styles.listContainer}>
                        <div style={styles.grid}>
                            {services.map((service, index) => (
                                <ServiceItem 
                                    key={index} 
                                    imageUrl={service.imageUrl} 
                                    mainText={service.mainText} 
                                    secondaryText={service.secondaryText} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'lightblue',
        padding: '20px',
        flex: 1,
        display: 'flex', // Make the container a flex container
        flexDirection: 'column', // Stack children vertically
    },
    innerContainer: {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        flex: 1, // Allow the inner container to expand to fill available space
    },
    tabs: {
        display: 'flex',
        marginBottom: '20px',
    },
    tab: {
        flex: 1,
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1, // Ensure the row fills available space
    },
    column: {
        flex: '1',
        marginRight: '20px',
    },
    option: {
        padding: '10px', 
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    },
    listContainer: {
        flex: 3, // Allow the list container to fill available space
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflowY: 'auto', // Enable vertical scrolling
        maxHeight: '400px', // Set a maximum height for the container
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
    },
};

export default Content;
