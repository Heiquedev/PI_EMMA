import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from './MainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className={styles.layout}>
            <Sidebar open={sidebarOpen} onClose={closeSidebar} />
            <div className={styles.main}>
                <Header toggleSidebar={toggleSidebar} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
