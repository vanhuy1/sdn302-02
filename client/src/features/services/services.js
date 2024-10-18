import React from 'react';
import TaskBar from '../../components/taskbar/taskbar';
import Content from '../../components/services/common/content';
import FooterComponent from '../../components/landing-page/footer';
import Header from '../../components/landing-page/header';

const Services = () => {
    return (
        <div style={styles.wrapper}>
            <Header />
            <div style={styles.container}>
                <TaskBar />
                <Content />
            </div>
            <FooterComponent />
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Make the wrapper full height
    },
    container: {
        display: 'flex',
        flex: 1, // Allow this div to fill the available space
    },
};

export default Services;
